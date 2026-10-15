import type { Metadata } from "next";
import { Suspense } from "react";
import Reports from "@/views/Reports";

export const metadata: Metadata = {
  title: "Reports — Flentra",
  description: "Export recovery, financing, and compliance reports.",
};

export default function ReportsPage() {
  return (
    <Suspense>
      <Reports />
    </Suspense>
  );
}
