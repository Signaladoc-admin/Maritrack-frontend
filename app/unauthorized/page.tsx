import type { Metadata } from "next";
import Unauthorized from "@/views/Unauthorized";

export const metadata: Metadata = {
  title: "Access Denied — Flentra",
  description:
    "You do not have permission to access this page on Flentra. This may be because you are signed in with an account that does not have the required role or privileges for the requested resource. If you believe this is an error, please contact your account administrator or sign in with a different account. Return to your dashboard or log out to switch accounts.",
};

export default function UnauthorizedPage() {
  return <Unauthorized />;
}
