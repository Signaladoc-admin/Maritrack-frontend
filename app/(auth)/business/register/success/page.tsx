import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Registration Received — Flentra",
  description: "Your Flentra business account request has been submitted. Our team will review your organisation's details and reach out shortly to activate your enterprise device management account.",
};

import { Button } from "@/shared/ui/button";
import { H1, H3 } from "@/shared/ui/typography";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <H3 variant="primary" className="text-center">
        Thanks for your interest in Flentra Device Management. Our team will contact you shortly.
      </H3>
      <Button className="w-full" href="/">
        Return to Homepage
      </Button>
    </div>
  );
}
