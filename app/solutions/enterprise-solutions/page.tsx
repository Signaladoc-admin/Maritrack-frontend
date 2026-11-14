import type { Metadata } from "next";
import SolutionEnterpriseV2 from "@/views/SolutionEnterpriseV2";

export const metadata: Metadata = {
  title: "Enterprise solutions | Flentra",
  description:
    "Every company device accounted for, from purchase to return.",
};

export default function SolutionEnterprisePage() {
  return <SolutionEnterpriseV2 />;
}
