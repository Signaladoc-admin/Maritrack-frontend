import type { Metadata } from "next";
import AddChildView from "@/features/child-profile/ui/AddChildView";

export const metadata: Metadata = {
  title: "Add Child Profile — Flentra",
  description:
    "Create a new child profile on Flentra to begin monitoring and protecting your child's digital activity. Enter your child's name, age, and gender to set up their account. Once the profile is created, proceed to pair their device using the unique QR onboarding code so that Flentra can begin tracking screen time, app usage, and content access. You can create multiple profiles to manage each child in your family independently with tailored parental control settings.",
};

export default function AddChildPage() {
  return (
    <div className="container mx-auto py-10">
      <AddChildView />
    </div>
  );
}
