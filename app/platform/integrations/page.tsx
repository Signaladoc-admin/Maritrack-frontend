import type { Metadata } from "next";
import IntegrationsV2 from "@/views/IntegrationsV2";

export const metadata: Metadata = {
  title: "Integrations | Flentra",
  description:
    "Connect Flentra to your loan, payment, HR and finance systems through APIs.",
};

export default function IntegrationsPage() {
  return <IntegrationsV2 />;
}
