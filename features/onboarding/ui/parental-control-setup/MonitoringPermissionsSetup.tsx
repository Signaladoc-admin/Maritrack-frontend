import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import SubHeading from "./SubHeading";
import { SettingsToggle } from "@/shared/ui/settings-toggle";

export default function MonitoringPermissionsSetup() {
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
            <SettingsToggle className="py-4" label="Screen time duration" id="demo-st" />
            <SettingsToggle className="py-4" label="App usage" id="demo-st" />
            <SettingsToggle className="py-4" label="App installs & deletions" id="demo-st" />
            <SettingsToggle className="py-4" label="Web browsing activity" id="demo-st" />
            <SettingsToggle className="py-4" label="Location tracking" id="demo-st" />
            <SettingsToggle className="py-4" label="Device usage hours" id="demo-st" />
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
