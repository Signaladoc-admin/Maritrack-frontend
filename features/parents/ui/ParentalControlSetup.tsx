"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { Loader } from "@/shared/ui/loader";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import {
  useParentalControlByParentId,
  useCreateParentalControl,
  useUpdateParentalControl,
  useParentalControlMe,
} from "@/entities/parental-controls/model/useParentalControls";
import { ParentalControlDto } from "@/entities/parental-controls/model/parental-controls.schema";

import { LoaderModal } from "@/shared/ui/Modal/Modals/LoaderModal";
import MonitoringPermissionsSetup from "../../onboarding/ui/parental-control-setup/MonitoringPermissionsSetup";
import ScreenTimeRules from "../../onboarding/ui/parental-control-setup/ScreenTimeRules";
import AppManagement from "../../onboarding/ui/parental-control-setup/AppManagement";
import AlertsAndNotifications from "../../onboarding/ui/parental-control-setup/AlertsNotification";
import ParentalConfirmation from "../../onboarding/ui/parental-control-setup/ParentalConfirmation";
import { CardWrapper } from "@/shared/ui/card-wrapper";

const formSchema = z
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

    // Parental Confirmation
    parentalConsent: z.boolean().refine((val) => val === true, {
      message: "You must confirm to proceed",
    }),
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
  });

type FormValues = z.infer<typeof formSchema>;

export default function ParentalControlSetup({
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
  const { data: meSettings, isLoading: isLoadingMe } = useParentalControlMe();

  const pathname = usePathname();

  const isOnboardingPath = pathname.includes("onboarding");

  const { mutateAsync: createSettings, isPending: isCreating } = useCreateParentalControl();
  const { mutateAsync: updateSettings, isPending: isUpdating } = useUpdateParentalControl();

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
      parentalConsent: false,
    },
  });

  // Populate existing data when loaded
  useEffect(() => {
    const settings = meSettings || existingSettings;
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

        parentalConsent: settings.parentalConsent,
      });
    }
  }, [meSettings, existingSettings, methods]);

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

      informChildMonitoring: true, // implicit or set your own rule
      allowExtraScreenTime: false,
      parentalConsent: data.parentalConsent,
    };

    try {
      const currentSettingsId = existingSettings?.id || meSettings?.id;
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

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="mb-6 h-10 w-full rounded bg-gray-300"></div>
        <div className="space-y-3">
          <div className="h-3 w-full rounded bg-gray-300"></div>
          <div className="h-3 w-full rounded bg-gray-300"></div>
          <div className="h-3 w-full rounded bg-gray-300"></div>
        </div>

        <div className="mt-10 space-y-6">
          <CardWrapper variant="outline">
            <div className="space-y-14">
              {/* Card heading */}
              <div>
                <div className="mb-4 h-10 w-full rounded bg-gray-300"></div>
                <div className="h-5 w-full rounded bg-gray-300"></div>
              </div>
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
        </div>
      </div>
    );
  }

  const isPending = isCreating || isUpdating;

  return (
    <div className="space-y-6">
      <Header
        title="Parental Control & Consent Setup"
        subtitle="Set boundaries, permissions, and alerts for your child's device. These rules apply by default to all children and can be adjusted individually later."
      />

      {isOnboardingPath && <LoaderModal open={isPending} text="Setting up your account" />}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <MonitoringPermissionsSetup />
          <ScreenTimeRules />
          <AppManagement />
          <AlertsAndNotifications />
          <ParentalConfirmation />

          <div className="flex gap-4">
            {goToPrevStep && (
              <Button
                variant="secondary"
                type="button"
                className="flex-1"
                onClick={goToPrevStep}
                disabled={isPending}
              >
                Previous
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isOnboardingPath ? "Submit" : "Save changes"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
