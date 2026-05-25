import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Successful — Flentra",
  description: "Your Flentra parent account registration was received. Check your inbox to verify your email address and activate account features including child profile creation and device pairing.",
};

import { Button } from "@/shared/ui/button";
import { H1, H3 } from "@/shared/ui/typography";

export default function SuccessPage() {
  return (
    // <AuthLayout contentPosition="right">
    <div className="flex flex-col items-center justify-center gap-4">
      <H3 variant="primary" className="text-center">
        Thanks for your interest in Flentra Device Management. Our team will contact you shortly.
      </H3>
      <Button className="w-full" href="/">
        Return to Homepage
      </Button>
    </div>
    // </AuthLayout>
  );
}
