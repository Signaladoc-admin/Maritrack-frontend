import type { Metadata } from "next";
import Children from "@/features/child-profile/ui/Children";
import Back from "@/shared/ui/go-back";

export const metadata: Metadata = {
  title: "Children's Profiles — Flentra",
  description:
    "View and manage all your children's profiles on Flentra. Each profile represents a monitored child account linked to one or more enrolled devices. From this overview you can see all registered children at a glance, navigate to individual child detail pages to review their device activity, screen time, and app usage, add new children to your account, and pair their devices using the QR-based onboarding flow. Keeping profiles up to date ensures accurate monitoring and personalised parental controls for each child.",
};

const ChildrenPage = () => {
  return (
    <>
      <Back label="Dashboard" />
      <Children />
    </>
  );
};

export default ChildrenPage;
