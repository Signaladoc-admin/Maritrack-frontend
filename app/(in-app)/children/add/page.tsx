import type { Metadata } from "next";
import AddChildView from "@/features/child-profile/ui/AddChildView";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Add Child Profile — Flentra",
  description:
    "Create a new child profile on Flentra to begin monitoring and protecting your child's digital activity. Enter your child's name, age, and gender to set up their account.",
};

export default function AddChildPage() {
  return (
    <div className="content">
      <Link href="/children" className="dd-back-link mb-6 inline-flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to children
      </Link>
      <div className="max-w-2xl">
        <AddChildView />
      </div>
    </div>
  );
}
