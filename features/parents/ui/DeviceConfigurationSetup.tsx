"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import {
  useParentalControlByParentId,
  useCreateParentalControl,
  useUpdateParentalControl,
  useParentalControlMe,
} from "@/entities/parental-controls/model/useParentalControls";
import { ParentalControlDto } from "@/entities/parental-controls/model/parental-controls.schema";

import { LoaderModal } from "@/shared/ui/Modal/Modals/LoaderModal";
import MonitoringPermissionsSetup from "../../onboarding/personal/ui/devices-control-setup/MonitoringPermissionsSetup";
import ScreenTimeRules from "../../onboarding/personal/ui/devices-control-setup/ScreenTimeRules";
import AppManagement from "../../onboarding/personal/ui/devices-control-setup/AppManagement";
import AlertsAndNotifications from "../../onboarding/personal/ui/devices-control-setup/AlertsNotification";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import { useAuth } from "@/shared/auth/AuthProvider";
import DeviceConfirmation from "../../onboarding/personal/ui/devices-control-setup/DeviceConfirmation";
import ChildTransparency from "@/features/onboarding/personal/ui/devices-control-setup/ChildTransparency";

export type AppRole = "PARENT" | "BUSINESS";

const getFormSchema = (appRole: AppRole) =>
  z
    .object({
      // Monitoring Permissions
      monitorScreenTime: z.boolean(),
      monitorAppUsage: z.boolean(),
      monitorAppInstalls: z.boolean(),
      monitorWebBrowsing: z.boolean(),
      monitorLocation: z.boolean(),
      monitorDeviceUsageHours: z.boolean(),

      // Screen Time Rules
      dailyScreenTimeLimit: z.string().min(1, "Daily screen time limit is required"),
      downtimeStart: z.string().optional(),
      downtimeEnd: z.string().optional(),
      schoolHoursRestriction: z.boolean(),

      // App Management
      appInstallationApproval: z.string().min(1, "App installation approval is required"),
      games: z.boolean(),
      social_media: z.boolean(),
      browsers: z.boolean(),
      streaming: z.boolean(),
      in_app_purchases: z.boolean(),
      adult_restricted_content: z.boolean(),

      // Alerts & Notifications
      notify_at_daily_time_limit_exceeded: z.boolean(),
      notify_at_new_app_installation: z.boolean(),
      notify_at_restricted_content_access: z.boolean(),
      notify_at_device_inactivity: z.boolean(),
      notify_at_location_boundary_crossing: z.boolean(),

      // Notification Methods
      is_push_notification_enabled: z.boolean(),
      is_email_notification_enabled: z.boolean(),
      is_in_app_notification_enabled: z.boolean(),

      // Child Transparency & Requests
      inform_child_of_monitoring: z.boolean(),
      allow_child_to_request_extra_screen_time: z.boolean(),

      // Parental Confirmation
      parentalConsent: z.boolean(),

      // Agent Transparency & Requests (for business devices setup)
      inform_agents_of_monitoring: z.boolean(),
      allow_agents_to_request_extra_screen_time: z.boolean(),
    })
    .superRefine((data, ctx) => {
      // 1. Monitoring Permissions group validation
      const hasAtLeastOneMonitor =
        data.monitorScreenTime ||
        data.monitorAppUsage ||
        data.monitorAppInstalls ||
        data.monitorWebBrowsing ||
        data.monitorLocation ||
        data.monitorDeviceUsageHours;

      if (!hasAtLeastOneMonitor) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select at least one activity to monitor",
          path: ["monitorScreenTime"],
        });
      }

      // 2. App Management Categories group validation
      const hasAtLeastOneCategory =
        data.games ||
        data.social_media ||
        data.browsers ||
        data.streaming ||
        data.in_app_purchases ||
        data.adult_restricted_content;

      if (!hasAtLeastOneCategory) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select at least one category to restrict",
          path: ["games"],
        });
      }

      // 3. Screen Time Rules group validation
      const hasAnyScreenRule = data.dailyScreenTimeLimit !== "NONE" || data.schoolHoursRestriction;

      if (!hasAnyScreenRule) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enable at least one screen time rule (Limits or Restrictions)",
          path: ["schoolHoursRestriction"],
        });
      }

      // 4. Alerts & Notifications group validation
      const hasAtLeastOneAlert =
        data.notify_at_daily_time_limit_exceeded ||
        data.notify_at_new_app_installation ||
        data.notify_at_restricted_content_access ||
        data.notify_at_device_inactivity ||
        data.notify_at_location_boundary_crossing;

      if (!hasAtLeastOneAlert) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select at least one event to be notified about",
          path: ["notify_at_daily_time_limit_exceeded"],
        });
      }

      // 4. Notification Methods group validation
      const hasAtLeastOneNotifyMethod =
        data.is_push_notification_enabled ||
        data.is_email_notification_enabled ||
        data.is_in_app_notification_enabled;

      if (!hasAtLeastOneNotifyMethod) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select at least one notification method",
          path: ["is_push_notification_enabled"],
        });
      }

      // 5. Parental Confirmation validation (only required for parent accounts)
      if (appRole === "PARENT" && !data.parentalConsent) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "You must confirm to proceed",
          path: ["parentalConsent"],
        });
      }
    });

type FormValues = z.infer<ReturnType<typeof getFormSchema>>;

export const devicesControlHeadings = {
  header: {
    PARENT: {
      title: "Parental Control & Consent Setup",
      description:
        "Set boundaries, permissions, and alerts for your child's device. These rules apply by default to all children and can be adjusted individually later.",
    },
    BUSINESS: {
      title: "Device Control & Consent Setup",
      description: "Set boundaries, permissions, and alerts for your agent’s device.",
    },
  },

  monitoringPermissions: {
    title: "Monitoring Permissions",
    description: "Choose what activities you want visibility into.",
  },
  screenTimeRules: {
    title: "Screen Time Rules",
    description: "Set healthy limits for daily phone use.",
  },
  appManagementPreferences: {
    title: "App Management Preferences",
    description: "Control which apps your child can install and use",
  },
  alertsAndNotifications: {
    title: "Alerts & Notifications",
    description: "Choose what events you want to be notified about.",
  },
  childTransparencyAndRequests: {
    title: "Child Transparency & Requests",
    description: "Build trust and encourage healthy digital habits.",
    footerDescription:
      "We recommend transparency to help children understand boundaries rather than feel monitored",
  },
  confirmationAndConsent: {
    PARENT: {
      title: "Parental Confirmation & Consent",
      description: "Confirm your authority and approve monitoring.",
    },
    BUSINESS: {
      title: "Agent Transparency & Requests",
      description: "Build trust and encourage healthy digital habits.",
      footerDescription:
        "We recommend transparency to help agents understand boundaries rather than feel monitored.",
    },
  },
};

export default function DevicesConfigurationSetup({
  goToPrevStep,
  handleSubmit,
}: {
  goToPrevStep?: () => void;
  handleSubmit?: () => void;
}) {
  const { data: userProfile, isLoading: isLoadingUser } = useUserProfile();
  const parentId = userProfile?.parentId || "";

  const { data: existingSettings, isLoading: isLoadingSettings } =
    useParentalControlByParentId(parentId);
  const { data: mySettingsRes, isLoading: isLoadingMe } = useParentalControlMe();
  const mySettings = mySettingsRes?.data;

  const pathname = usePathname();

  const isOnboardingPath = pathname.includes("onboarding");

  const { mutateAsync: createSettings, isPending: isCreating } = useCreateParentalControl();
  const { mutateAsync: updateSettings, isPending: isUpdating } = useUpdateParentalControl();

  const { user } = useAuth();
  const appRole = (user?.appRole?.toUpperCase() as AppRole) || "PARENT";
  const isParent = appRole === "PARENT";

  const methods = useForm<FormValues>({
    resolver: zodResolver(getFormSchema(appRole)),
    defaultValues: {
      monitorScreenTime: false,
      monitorAppUsage: false,
      monitorAppInstalls: false,
      monitorWebBrowsing: false,
      monitorLocation: false,
      monitorDeviceUsageHours: false,
      dailyScreenTimeLimit: "NO_LIMIT",
      downtimeStart: "22:30",
      downtimeEnd: "05:00",
      schoolHoursRestriction: false,
      appInstallationApproval: "ALLOW_WITHOUT_APPROVAL",
      games: false,
      social_media: false,
      browsers: false,
      streaming: false,
      in_app_purchases: false,
      adult_restricted_content: false,
      notify_at_daily_time_limit_exceeded: false,
      notify_at_new_app_installation: false,
      notify_at_restricted_content_access: false,
      notify_at_device_inactivity: false,
      notify_at_location_boundary_crossing: false,
      is_push_notification_enabled: false,
      is_email_notification_enabled: false,
      is_in_app_notification_enabled: false,
      inform_child_of_monitoring: false,
      allow_child_to_request_extra_screen_time: false,
      parentalConsent: false,
      inform_agents_of_monitoring: false,
      allow_agents_to_request_extra_screen_time: false,
    },
  });

  // Populate existing data when loaded
  useEffect(() => {
    const settings = mySettings || existingSettings;
    if (settings) {
      const cats = settings.restrictedCategories || [];
      const alerts = settings.alertEvents || [];
      const methodsConfig = settings.notificationMethod || "";

      methods.reset({
        monitorScreenTime: settings.monitorScreenTime,
        monitorAppUsage: settings.monitorAppUsage,
        monitorAppInstalls: settings.monitorAppInstalls,
        monitorWebBrowsing: settings.monitorWebBrowsing,
        monitorLocation: settings.monitorLocation,
        monitorDeviceUsageHours: settings.monitorDeviceUsageHours,

        dailyScreenTimeLimit:
          settings.screenTimeLimit === "NO_LIMIT"
            ? "NONE"
            : settings.customScreenTimeHours
              ? `${settings.customScreenTimeHours}H`
              : settings.screenTimeLimit || "NONE",
        downtimeStart: settings.downtimeStart || "22:30",
        downtimeEnd: settings.downtimeEnd || "05:00",
        schoolHoursRestriction: settings.schoolHoursRestriction,

        appInstallationApproval: settings.appInstallApproval,
        games: cats.includes("GAMES"),
        social_media: cats.includes("SOCIAL_MEDIA"),
        browsers: cats.includes("BROWSERS"),
        streaming: cats.includes("STREAMING"),
        in_app_purchases: cats.includes("IN_APP_PURCHASES"),
        adult_restricted_content: cats.includes("ADULT_CONTENT"),

        notify_at_daily_time_limit_exceeded: alerts.includes("SCREEN_TIME_EXCEEDED"),
        notify_at_new_app_installation: alerts.includes("NEW_APP_INSTALLED"),
        notify_at_restricted_content_access: alerts.includes("RESTRICTED_CONTENT_ACCESSED"),
        notify_at_device_inactivity: alerts.includes("DEVICE_INACTIVE"),
        notify_at_location_boundary_crossing: alerts.includes("LOCATION_BOUNDARY_CROSSING"),

        is_push_notification_enabled: methodsConfig === "PUSH" || methodsConfig === "BOTH",
        is_email_notification_enabled: methodsConfig === "EMAIL" || methodsConfig === "BOTH",
        is_in_app_notification_enabled: methodsConfig === "IN_APP" || methodsConfig === "BOTH",

        inform_child_of_monitoring: isParent ? settings.informChildMonitoring : false,
        allow_child_to_request_extra_screen_time: isParent ? settings.allowExtraScreenTime : false,

        parentalConsent: settings.parentalConsent,

        inform_agents_of_monitoring: isParent ? false : settings.informChildMonitoring,
        allow_agents_to_request_extra_screen_time: isParent ? false : settings.allowExtraScreenTime,
      });
    }
  }, [mySettings, existingSettings, methods, isParent]);

  const onSubmit = async (data: FormValues) => {
    const restrictedCategories: string[] = [];
    if (data.games) restrictedCategories.push("GAMES");
    if (data.social_media) restrictedCategories.push("SOCIAL_MEDIA");
    if (data.browsers) restrictedCategories.push("BROWSERS");
    if (data.streaming) restrictedCategories.push("STREAMING");
    if (data.in_app_purchases) restrictedCategories.push("IN_APP_PURCHASES");
    if (data.adult_restricted_content) restrictedCategories.push("ADULT_CONTENT");

    const alertEvents: string[] = [];
    if (data.notify_at_daily_time_limit_exceeded) alertEvents.push("SCREEN_TIME_EXCEEDED");
    if (data.notify_at_new_app_installation) alertEvents.push("NEW_APP_INSTALLED");
    if (data.notify_at_restricted_content_access) alertEvents.push("RESTRICTED_CONTENT_ACCESSED");
    if (data.notify_at_device_inactivity) alertEvents.push("DEVICE_INACTIVE");
    if (data.notify_at_location_boundary_crossing) alertEvents.push("LOCATION_BOUNDARY_CROSSING");

    let notificationMethod = "NONE";
    if (data.is_in_app_notification_enabled) {
      notificationMethod = "BOTH";
    } else if (data.is_push_notification_enabled && data.is_email_notification_enabled) {
      notificationMethod = "BOTH";
    } else if (data.is_push_notification_enabled) {
      notificationMethod = "PUSH";
    } else if (data.is_email_notification_enabled) {
      notificationMethod = "EMAIL";
    }

    let screenTimeLimit = data.dailyScreenTimeLimit;
    let customScreenTimeHours = 0;

    if (screenTimeLimit.endsWith("H") && screenTimeLimit !== "NO_LIMIT") {
      customScreenTimeHours = parseInt(screenTimeLimit.replace("H", ""), 10);
      screenTimeLimit = "CUSTOM";
    }

    const payload: ParentalControlDto = {
      monitorScreenTime: data.monitorScreenTime,
      monitorAppUsage: data.monitorAppUsage,
      monitorAppInstalls: data.monitorAppInstalls,
      monitorWebBrowsing: data.monitorWebBrowsing,
      monitorLocation: data.monitorLocation,
      monitorDeviceUsageHours: data.monitorDeviceUsageHours,

      screenTimeLimit,
      customScreenTimeHours,
      downtimeStart: data.downtimeStart || "22:30",
      downtimeEnd: data.downtimeEnd || "05:00",
      schoolHoursRestriction: data.schoolHoursRestriction,

      appInstallApproval: data.appInstallationApproval,
      restrictedCategories,
      alertEvents,
      notificationMethod,

      informChildMonitoring: isParent
        ? data.inform_child_of_monitoring
        : data.inform_agents_of_monitoring,
      allowExtraScreenTime: isParent
        ? data.allow_child_to_request_extra_screen_time
        : data.allow_agents_to_request_extra_screen_time,
      parentalConsent: isParent ? data.parentalConsent : true,
    };

    try {
      const currentSettingsId = existingSettings?.id || mySettings?.id;
      if (currentSettingsId) {
        await updateSettings(payload);
      } else {
        await createSettings(payload);
      }

      if (handleSubmit) {
        handleSubmit();
      }
    } catch (err) {
      console.error("Failed to save parental controls", err);
    }
  };

  const isLoading = isLoadingUser || (parentId && isLoadingSettings) || isLoadingMe;

  const isSubmitting = isCreating || isUpdating;

  if (isLoading && !isSubmitting) {
    return (
      <div className="animate-pulse">
        <Header
          title={devicesControlHeadings.header[user?.appRole?.toUpperCase() as AppRole]?.title}
          subtitle={
            devicesControlHeadings.header[user?.appRole?.toUpperCase() as AppRole]?.description
          }
        />

        <div className="mt-10 space-y-6">
          <SectionSkeleton
            title={devicesControlHeadings.monitoringPermissions.title}
            subtitle={devicesControlHeadings.monitoringPermissions.description}
          />
          <SectionSkeleton
            title={devicesControlHeadings.screenTimeRules.title}
            subtitle={devicesControlHeadings.screenTimeRules.description}
          />
          <SectionSkeleton
            title={devicesControlHeadings.appManagementPreferences.title}
            subtitle={devicesControlHeadings.appManagementPreferences.description}
          />
          <SectionSkeleton
            title={devicesControlHeadings.alertsAndNotifications.title}
            subtitle={devicesControlHeadings.alertsAndNotifications.description}
          />
          <SectionSkeleton
            title={devicesControlHeadings.childTransparencyAndRequests.title}
            subtitle={devicesControlHeadings.childTransparencyAndRequests.description}
          />
          <SectionSkeleton
            title={
              devicesControlHeadings.confirmationAndConsent[user?.appRole?.toUpperCase() as AppRole]
                ?.title
            }
            subtitle={
              devicesControlHeadings.confirmationAndConsent[user?.appRole?.toUpperCase() as AppRole]
                ?.description
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title={devicesControlHeadings.header[user?.appRole?.toUpperCase() as AppRole]?.title}
        subtitle={
          devicesControlHeadings.header[user?.appRole?.toUpperCase() as AppRole]?.description
        }
      />

      {isOnboardingPath && <LoaderModal open={isSubmitting} text="Setting up your account" />}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <MonitoringPermissionsSetup />
          <ScreenTimeRules />
          <AppManagement />
          <AlertsAndNotifications />
          {user?.appRole === "PARENT" && <ChildTransparency />}
          <DeviceConfirmation />

          <div className="flex gap-4">
            {goToPrevStep && (
              <Button
                variant="secondary"
                type="button"
                className="flex-1"
                onClick={goToPrevStep}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isOnboardingPath ? "Submit" : "Save changes"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function SectionSkeleton({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <CardWrapper variant="outline">
      <div className="space-y-14">
        {/* Card heading */}
        <CardHeader title={title} description={subtitle} />
        {/* Card content */}
        <div className="space-y-6">
          {/* Card subheading */}
          <div className="h-8 w-full rounded bg-gray-300"></div>

          <div className="space-y-3">
            <div className="h-5 w-full rounded bg-gray-300"></div>
            <div className="h-5 w-full rounded bg-gray-300"></div>
            <div className="h-5 w-full rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
