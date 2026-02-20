import { InputGroup } from "@/shared/ui/input-group";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import SubHeading from "./SubHeading";

const schema = z.object({
  notify_at_daily_time_limit_exceeded: z.boolean(),
  notify_at_new_app_installation: z.boolean(),
  notify_at_restricted_content_access: z.boolean(),
  notify_at_device_inactivity: z.boolean(),
  notify_at_location_boundary_crossing: z.boolean(),
  is_push_notification_enabled: z.boolean(),
  is_email_notification_enabled: z.boolean(),
  is_in_app_notification_enabled: z.boolean(),
});

export default function AlertsAndNotifications() {
  const { control, formState } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      notify_at_daily_time_limit_exceeded: false,
      notify_at_new_app_installation: false,
      notify_at_restricted_content_access: false,
      notify_at_device_inactivity: false,
      notify_at_location_boundary_crossing: false,
      is_push_notification_enabled: false,
      is_email_notification_enabled: false,
      is_in_app_notification_enabled: false,
    },
  });

  return (
    <CardWrapper variant="outline">
      <div className="space-y-10!">
        <CardHeader
          title="Alerts & Notifications"
          description="Choose what events you want to be notified about."
        />

        <div className="space-y-3">
          <SubHeading title="Notify me when:" />
          <div className="divide-y divide-neutral-100 border-b border-neutral-100">
            <div className="py-4">
              <Controller
                control={control}
                name="notify_at_daily_time_limit_exceeded"
                render={({ field }) => (
                  <InputGroup
                    label="Daily screen time limit is exceeded"
                    type="checkbox"
                    id="notify_at_daily_time_limit_exceeded"
                    error={formState.errors.notify_at_daily_time_limit_exceeded?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="notify_at_new_app_installation"
                render={({ field }) => (
                  <InputGroup
                    label="A new app is installed"
                    type="checkbox"
                    id="notify_at_new_app_installation"
                    error={formState.errors.notify_at_new_app_installation?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="notify_at_restricted_content_access"
                render={({ field }) => (
                  <InputGroup
                    label="Restricted content is accessed"
                    type="checkbox"
                    id="notify_at_restricted_content_access"
                    error={formState.errors.notify_at_restricted_content_access?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="notify_at_device_inactivity"
                render={({ field }) => (
                  <InputGroup
                    label="The device is inactive for a long time"
                    type="checkbox"
                    id="notify_at_device_inactivity"
                    error={formState.errors.notify_at_device_inactivity?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="notify_at_location_boundary_crossing"
                render={({ field }) => (
                  <InputGroup
                    label="Location leaves a safe area (if enabled)"
                    type="checkbox"
                    id="notify_at_location_boundary_crossing"
                    error={formState.errors.notify_at_location_boundary_crossing?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <SubHeading title="Notification methods" />
          <div className="divide-y divide-neutral-100 border-neutral-100">
            <div className="py-4">
              <Controller
                control={control}
                name="is_push_notification_enabled"
                render={({ field }) => (
                  <InputGroup
                    label="Push notifications"
                    type="checkbox"
                    id="is_push_notification_enabled"
                    error={formState.errors.is_push_notification_enabled?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="is_email_notification_enabled"
                render={({ field }) => (
                  <InputGroup
                    label="Email"
                    type="checkbox"
                    id="is_email_notification_enabled"
                    error={formState.errors.is_email_notification_enabled?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4 pb-2">
              <Controller
                control={control}
                name="is_in_app_notification_enabled"
                render={({ field }) => (
                  <InputGroup
                    label="Both"
                    type="checkbox"
                    id="is_in_app_notification_enabled"
                    error={formState.errors.notify_at_restricted_content_access?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
