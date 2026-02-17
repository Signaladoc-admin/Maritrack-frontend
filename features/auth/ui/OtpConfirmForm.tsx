"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { OTPInput } from "@/shared/ui/otp-input";
import { InputGroup } from "@/shared/ui/input-group";
import HaveAnAccount from "./HaveAnAccount";

export default function OtpConfirmForm() {
  const [otp, setOtp] = useState("");
  return (
    <form className="space-y-7">
      <div className="space-y-2">
        <InputGroup label="Enter OTP" type="text">
          <OTPInput value={otp} onChange={setOtp} length={4} />
        </InputGroup>
        <div className="text-muted-foreground flex items-center justify-between text-sm font-medium">
          <span>Resend code in 10s</span>
          <span>Change email</span>
        </div>
      </div>
      <Button className="w-full">Continue</Button>
      <HaveAnAccount />
    </form>
  );
}
