import type { Metadata } from "next";
import SolutionBnplV2 from "@/views/SolutionBnplV2";

export const metadata: Metadata = {
  title: "BNPL | Flentra",
  description:
    "Buy now, pay later for phones and laptops, with activation at checkout and instant unlock on payment.",
};

export default function SolutionBnplPage() {
  return <SolutionBnplV2 />;
}
