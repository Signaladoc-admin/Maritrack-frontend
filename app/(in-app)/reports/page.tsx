import type { Metadata } from "next";
import { Suspense } from "react";
import Reports from "@/views/Reports";

export const metadata: Metadata = {
  title: "Reports — Flentra",
  description: "User and device reports, plus recovery, financing, and compliance reporting.",
};

export default function ReportsPage() {
  return (
    <Suspense>
      <Reports />
    </Suspense>
  );
}
