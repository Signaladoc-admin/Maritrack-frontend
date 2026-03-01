import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import SubHeading from "./SubHeading";
import { SettingsToggle } from "@/shared/ui/settings-toggle";
import { useFormContext, Controller } from "react-hook-form";

export default function MonitoringPermissionsSetup() {
  const { control } = useFormContext();

  return (
    <CardWrapper variant="outline">
      <div className="space-y-10!">
        <CardHeader
          title="Monitoring Permissions"
          description="Choose what activities you want visibility into."
        />
        <div className="space-y-3">
          <SubHeading title="What do you want to monitor?" />
          <div className="divide-y divide-neutral-100">
            <Controller
              name="monitorScreenTime"
              control={control}
              render={({ field }) => (
                <SettingsToggle
                  className="py-4"
                  label="Screen time duration"
                  id="monitorScreenTime"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Controller
              name="monitorAppUsage"
              control={control}
              render={({ field }) => (
                <SettingsToggle
                  className="py-4"
                  label="App usage"
                  id="monitorAppUsage"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Controller
              name="monitorAppInstalls"
              control={control}
              render={({ field }) => (
                <SettingsToggle
                  className="py-4"
                  label="App installs & deletions"
                  id="monitorAppInstalls"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Controller
              name="monitorWebBrowsing"
              control={control}
              render={({ field }) => (
                <SettingsToggle
                  className="py-4"
                  label="Web browsing activity"
                  id="monitorWebBrowsing"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Controller
              name="monitorLocation"
              control={control}
              render={({ field }) => (
                <SettingsToggle
                  className="py-4"
                  label="Location tracking"
                  id="monitorLocation"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Controller
              name="monitorDeviceUsageHours"
              control={control}
              render={({ field }) => (
                <SettingsToggle
                  className="py-4"
                  label="Device usage hours"
                  id="monitorDeviceUsageHours"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
