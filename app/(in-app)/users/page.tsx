import { Suspense } from "react";
import Users from "@/views/Users";

export default function UsersPage() {
  return (
    <Suspense>
      <Users />
    </Suspense>
  );
}
