import { useAuth } from "@/shared/auth/AuthProvider";
import ParentalConfirmation from "./ParentalConfirmation";
import AgentsConfirmation from "./AgentsConfirmation";

export default function DeviceConfirmation() {
  const { user } = useAuth();

  return user?.appRole === "PARENT" ? <ParentalConfirmation /> : <AgentsConfirmation />;
}
