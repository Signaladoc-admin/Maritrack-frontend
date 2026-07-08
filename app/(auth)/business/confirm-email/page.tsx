import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Business Email — Flentra",
  description: "Verify your Flentra business account by entering the one-time code sent to your registered email. This step activates your organisation's MDM features including device enrolment and team management.",
};

import ConfirmEmail from "@/views/ConfirmEmail";

export default function ConfirmEmailPage() {
  return <ConfirmEmail />;
}
