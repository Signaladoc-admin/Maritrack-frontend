import type { Metadata } from "next";
import TermsOfService from "@/views/TermsOfService";

export const metadata: Metadata = {
  title: "Terms of Service | Flentra",
  description:
    "Terms of Service for Flentra for Business and Flentra for Family.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
