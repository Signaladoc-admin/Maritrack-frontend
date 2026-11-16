import type { Metadata } from "next";
import CompanyV2 from "@/views/CompanyV2";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Flentra is built and run by Marimax Global Concepts Limited.",
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return <CompanyV2 />;
}
