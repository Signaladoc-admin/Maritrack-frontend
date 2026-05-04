import { InputGroup } from "@/shared/ui/input-group";
import { Controller, useFormContext } from "react-hook-form";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import SubHeading from "./SubHeading";
import { parentalControlHeadings } from "@/features/parents/ui/ParentalControlSetup";

export default function AlertsAndNotifications() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <CardWrapper variant="outline">
      <div className="space-y-10!">
        <CardHeader
          title={parentalControlHeadings.alertsAndNotifications.title}
          description={parentalControlHeadings.alertsAndNotifications.description}
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
                    {...field}
                    disabled={true}
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
                    {...field}
                    disabled={true}
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
                    {...field}
                    disabled={true}
                  />
                )}
              />
            </div>
          </div>
          {errors.notify_at_daily_time_limit_exceeded && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.notify_at_daily_time_limit_exceeded.message as string}
            </p>
          )}
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
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e);
                      if (e.target.checked) {
                        setValue("is_in_app_notification_enabled", false);
                      }
                    }}
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
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e);
                      if (e.target.checked) {
                        setValue("is_in_app_notification_enabled", false);
                      }
                    }}
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
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e);
                      if (e.target.checked) {
                        setValue("is_push_notification_enabled", false);
                        setValue("is_email_notification_enabled", false);
                      }
                    }}
                  />
                )}
              />
            </div>
          </div>
          {errors.is_push_notification_enabled && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.is_push_notification_enabled.message as string}
            </p>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}
