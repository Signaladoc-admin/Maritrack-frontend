import type { Metadata } from "next";
import FamilyV2 from "@/views/FamilyV2";

export const metadata: Metadata = {
  title: { absolute: "Flentra for Family" },
  description:
    "Find a lost phone, lock it if it is stolen, and know your family got home safely.",
  alternates: { canonical: "/family" },
};

export default function FamilyPage() {
  return <FamilyV2 />;
}
