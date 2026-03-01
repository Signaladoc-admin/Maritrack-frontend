import { InputGroup } from "@/shared/ui/input-group";
import { Controller, useFormContext } from "react-hook-form";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import SubHeading from "./SubHeading";

export default function AlertsAndNotifications() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
                    error={errors.notify_at_daily_time_limit_exceeded?.message as string}
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
                    error={errors.notify_at_new_app_installation?.message as string}
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
                    error={errors.notify_at_restricted_content_access?.message as string}
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
                    error={errors.notify_at_device_inactivity?.message as string}
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
                    error={errors.notify_at_location_boundary_crossing?.message as string}
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
                    error={errors.is_push_notification_enabled?.message as string}
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
                    error={errors.is_email_notification_enabled?.message as string}
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
                    error={errors.is_in_app_notification_enabled?.message as string}
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
