import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Your Email — Flentra",
  description: "Verify your Flentra parent account by entering the one-time passcode sent to your email inbox. Email verification secures your account and unlocks access to child monitoring and device management features.",
};

import ConfirmEmail from "@/views/ConfirmEmail";

export default function ConfirmEmailPage() {
  return <ConfirmEmail />;
}
