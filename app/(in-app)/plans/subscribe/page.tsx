import PlanSubscription from "@/views/PlanSubscription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Subscription",
  description: "Subscribe to a plan",
};

export default function PlanSubscriptionPage() {
  return <PlanSubscription />;
}
