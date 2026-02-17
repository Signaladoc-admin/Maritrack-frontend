import React from "react";
import Link from "next/link";

export default function HaveAnAccount() {
  return (
    <p className="text-center text-sm">
      Already have an account?{" "}
      <Link href="/login" className="text-primary font-semibold">
        Log in
      </Link>
    </p>
  );
}
