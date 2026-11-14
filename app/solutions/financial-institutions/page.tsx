import type { Metadata } from "next";
import SolutionFinancialInstitutionsV2 from "@/views/SolutionFinancialInstitutionsV2";

export const metadata: Metadata = {
  title: "Financial institutions | Flentra",
  description:
    "Device loans for banks and microfinance lenders, with the control your risk team expects.",
};

export default function SolutionFinancialInstitutionsPage() {
  return <SolutionFinancialInstitutionsV2 />;
}
