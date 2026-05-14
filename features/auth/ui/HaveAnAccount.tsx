import React from "react";
import Link from "next/link";

export default function HaveAnAccount({ type }: { type: "business" | "parent" }) {
  return (
    <p className="text-center text-sm">
      Have an account?{" "}
      <Link
        href={type === "business" ? "/business/login" : "/login"}
        className="text-primary font-semibold"
      >
        Log in
      </Link>
    </p>
  );
}
