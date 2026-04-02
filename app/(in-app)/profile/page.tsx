import BusinessProfileForm from "@/entities/business/ui/BusinessProfileForm";
import ParentProfileForm from "@/entities/parents/ui/ParentProfileForm";

export default function ProfilePage() {
  const userRole = "ADMIN";

  if (userRole === "ADMIN") return <BusinessProfileForm />;
  else return <ParentProfileForm />;
}
