import type { Metadata } from "next";
import Profile from "@/views/Profile";
import { getAppRole } from "@/shared/lib/get-app-role";

export async function generateMetadata(): Promise<Metadata> {
  const appRole = await getAppRole();

  if (appRole === "BUSINESS") {
    return {
      title: "Business Account Profile — Flentra",
      description:
        "Manage your Flentra business account profile and organisation details. Update your display name, profile picture, contact email address, and phone number. Review your account security settings, change your password, and configure notification preferences. This page also provides access to your organisation details and billing contact information. Keep your profile up to date to ensure smooth communication and account recovery.",
    };
  }

  return {
    title: "Parent Account Profile — Flentra",
    description:
      "Manage your Flentra parent account profile and personal information. Update your display name, profile picture, contact email address, and phone number. Review your account security settings, change your password, and configure notification preferences. Keep your profile up to date to ensure accurate monitoring and smooth account recovery.",
  };
}

export default function ProfilePage() {
  return <Profile />;
}
