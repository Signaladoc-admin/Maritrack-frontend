"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { Loader } from "@/shared/ui/loader";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import {
  useParentalControlByParentId,
  useCreateParentalControl,
  useUpdateParentalControl,
  ParentalControlDto,
} from "@/entities/parental-controls/model/useParentalControls";

import MonitoringPermissionsSetup from "./parental-control-setup/MonitoringPermissionsSetup";
import ScreenTimeRules from "./parental-control-setup/ScreenTimeRules";
import AppManagement from "./parental-control-setup/AppManagement";
import AlertsAndNotifications from "./parental-control-setup/AlertsNotification";
import ParentalConfirmation from "./parental-control-setup/ParentalConfirmation";

const formSchema = z.object({
  // Monitoring Permissions
  monitorScreenTime: z.boolean().default(false),
  monitorAppUsage: z.boolean().default(false),
  monitorAppInstalls: z.boolean().default(false),
  monitorWebBrowsing: z.boolean().default(false),
  monitorLocation: z.boolean().default(false),
  monitorDeviceUsageHours: z.boolean().default(false),

  // Screen Time Rules
  dailyScreenTimeLimit: z.string().default("NO_LIMIT"),
  downtimeStart: z.string().optional().default("22:30"),
  downtimeEnd: z.string().optional().default("05:00"),
  schoolHoursRestriction: z.boolean().default(false),

  // App Management
  appInstallationApproval: z.string().default("ALLOW_WITHOUT_APPROVAL"),
  games: z.boolean().default(false),
  social_media: z.boolean().default(false),
  browsers: z.boolean().default(false),
  streaming: z.boolean().default(false),
  in_app_purchases: z.boolean().default(false),
  adult_restricted_content: z.boolean().default(false),

  // Alerts & Notifications
  notify_at_daily_time_limit_exceeded: z.boolean().default(false),
  notify_at_new_app_installation: z.boolean().default(false),
  notify_at_restricted_content_access: z.boolean().default(false),
  notify_at_device_inactivity: z.boolean().default(false),
  notify_at_location_boundary_crossing: z.boolean().default(false),

  // Notification Methods
  is_push_notification_enabled: z.boolean().default(false),
  is_email_notification_enabled: z.boolean().default(false),
  is_in_app_notification_enabled: z.boolean().default(false),

  // Parental Confirmation
  parentalConsent: z.boolean().refine((val) => val === true, {
    message: "You must confirm to proceed",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ParentalControlSetup({ goToPrevStep }: { goToPrevStep: () => void }) {
  const router = useRouter();
  const { data: userProfile, isLoading: isLoadingUser } = useUserProfile();
  const parentId = userProfile?.parentId || "";

  const { data: existingSettings, isLoading: isLoadingSettings } =
    useParentalControlByParentId(parentId);
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
    if (existingSettings) {
      const cats = existingSettings.restrictedCategories || [];
      const alerts = existingSettings.alertEvents || [];
      const methodsConfig = existingSettings.notificationMethod || "";

      methods.reset({
        monitorScreenTime: existingSettings.monitorScreenTime,
        monitorAppUsage: existingSettings.monitorAppUsage,
        monitorAppInstalls: existingSettings.monitorAppInstalls,
        monitorWebBrowsing: existingSettings.monitorWebBrowsing,
        monitorLocation: existingSettings.monitorLocation,
        monitorDeviceUsageHours: existingSettings.monitorDeviceUsageHours,

        dailyScreenTimeLimit: existingSettings.customScreenTimeHours
          ? `${existingSettings.customScreenTimeHours}H`
          : existingSettings.screenTimeLimit,
        downtimeStart: existingSettings.downtimeStart || "22:30",
        downtimeEnd: existingSettings.downtimeEnd || "05:00",
        schoolHoursRestriction: existingSettings.schoolHoursRestriction,

        appInstallationApproval: existingSettings.appInstallApproval,
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

        parentalConsent: existingSettings.parentalConsent,
      });
    }
  }, [existingSettings, methods]);

  const onSubmit = async (data: FormValues) => {
    // Transform flat inputs into array fields
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
    const pushOrInApp = data.is_push_notification_enabled || data.is_in_app_notification_enabled;
    if (pushOrInApp && data.is_email_notification_enabled) {
      notificationMethod = "BOTH";
    } else if (pushOrInApp) {
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
      downtimeStart: data.downtimeStart,
      downtimeEnd: data.downtimeEnd,
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
      if (existingSettings && existingSettings.id) {
        await updateSettings({ id: existingSettings.id, data: payload });
      } else {
        await createSettings(payload);
      }
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err) {
      console.error("Failed to save parental controls", err);
    }
  };

  if (isLoadingUser || (parentId && isLoadingSettings)) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <Loader size="lg" />
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

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <MonitoringPermissionsSetup />
          <ScreenTimeRules />
          <AppManagement />
          <AlertsAndNotifications />
          <ParentalConfirmation />

          <div className="flex gap-4">
            <Button
              variant="secondary"
              type="button"
              className="flex-1"
              onClick={goToPrevStep}
              disabled={isPending}
            >
              Previous
            </Button>
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? "Saving..." : "Submit"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
