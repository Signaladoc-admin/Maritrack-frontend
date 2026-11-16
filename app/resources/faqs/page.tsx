import type { Metadata } from "next";
import ResourcesFaqsV2 from "@/views/ResourcesFaqsV2";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about Flentra: pricing, devices, pilots, data protection and support.",
  alternates: { canonical: "/resources/faqs" },
};

export default function ResourcesFaqsPage() {
  return <ResourcesFaqsV2 />;
}
