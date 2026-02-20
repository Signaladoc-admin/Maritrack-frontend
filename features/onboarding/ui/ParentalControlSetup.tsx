import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import MonitoringPermissionsSetup from "./parental-control-setup/MonitoringPermissionsSetup";
import ScreenTimeRules from "./parental-control-setup/ScreenTimeRules";
import AppManagement from "./parental-control-setup/AppManagement";
import AlertsAndNotifications from "./parental-control-setup/AlertsNotification";
import ParentalConfirmation from "./parental-control-setup/ParentalConfirmation";
import { useRouter } from "next/navigation";

export default function ParentalControlSetup({ goToPrevStep }: { goToPrevStep: () => void }) {
  const router = useRouter();
  // Validation here
  const handleSubmit = () => {
    // Handle form submission
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6">
      <Header
        title="Parental Control & Consent Setup"
        subtitle="Set up Set boundaries, permissions, and alerts for your child's device. These rules apply by default to all children and can be adjusted individually later."
      />
      <MonitoringPermissionsSetup />
      <ScreenTimeRules />
      <AppManagement />
      <AlertsAndNotifications />
      <ParentalConfirmation />

      <div className="flex gap-4">
        <Button variant="secondary" className="flex-1" onClick={goToPrevStep}>
          Previous
        </Button>
        <Button className="flex-1" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
