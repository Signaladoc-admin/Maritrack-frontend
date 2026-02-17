"use client";

import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import Link from "next/link";

export default function PersonalRegistrationForm() {
  return (
    <form className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <InputGroup label="First name" type="text" placeholder="First name here" />
        <InputGroup label="Last name" type="text" placeholder="Last name here" />
      </div>
      <InputGroup label="Email" type="email" placeholder="Email here" />
      <InputGroup label="Phone number" type="text" placeholder="Phone number here" />
      <InputGroup type="password" label="Password" placeholder="Password here" />
      <InputGroup type="password" label="Confirm password" placeholder="Confirm password here" />

      <Button className="w-full">Next</Button>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Log in
        </Link>
      </p>
    </form>
  );
}
