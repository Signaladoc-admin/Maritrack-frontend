import { Button } from "@/shared/ui/button";
import CardHeader from "@/shared/ui/card-header";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Header } from "@/shared/ui/layout/header";
import { SettingsToggle } from "@/shared/ui/settings-toggle";

export default function ParentalControlSetup({
  goToPrevStep,
  goToNextStep,
}: {
  goToPrevStep: () => void;
  goToNextStep: () => void;
}) {
  // Validation here
  return (
    <div className="space-y-4">
      <Header title="" subtitle="Set up permissions" />

      <CardWrapper variant="outline">
        <CardWrapper.Header title="Set up permissions" description="Set up permissions" />
      </CardWrapper>

      <SettingsToggle label="Screen time duration" checked id="demo-st" />
      <SettingsToggle label="App usage" id="demo-app" />
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={goToPrevStep}>
          Back
        </Button>
        <Button className="flex-1" onClick={goToNextStep}>
          Finish
        </Button>
      </div>
    </div>
  );
}
