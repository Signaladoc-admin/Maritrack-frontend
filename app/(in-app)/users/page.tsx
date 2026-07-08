import type { Metadata } from "next";
import { Suspense } from "react";
import Users from "@/views/Users";

export const metadata: Metadata = {
  title: "Team Members — Flentra",
  description:
    "Administer your organisation's team members from the Flentra users management page. View a full directory of all staff who have been enrolled in your MDM programme, invite new team members via email, assign roles and permissions, link team members to their managed devices, and remove departed employees. Use this page to ensure only authorised personnel have access to company devices and that each person's account reflects their current role within the organisation.",
};

export default function UsersPage() {
  return (
    <Suspense>
      <Users />
    </Suspense>
  );
}
