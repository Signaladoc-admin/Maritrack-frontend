import type { Metadata } from "next";
import SolutionTelecomsRetailersV2 from "@/views/SolutionTelecomsRetailersV2";

export const metadata: Metadata = {
  title: "Telecoms and retailers | Flentra",
  description:
    "Sell more devices on instalments across every store and dealer network.",
};

export default function SolutionTelecomsRetailersPage() {
  return <SolutionTelecomsRetailersV2 />;
}
