import type { Metadata } from "next";
import SolutionDeviceFinancingV2 from "@/views/SolutionDeviceFinancingV2";

export const metadata: Metadata = {
  title: "Device financing | Flentra",
  description:
    "Protect every financed device, from activation to final payment.",
};

export default function SolutionDeviceFinancingPage() {
  return <SolutionDeviceFinancingV2 />;
}
