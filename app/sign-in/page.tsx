import type { Metadata } from "next";
import SignInV2 from "@/views/SignInV2";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Flentra portal.",
  alternates: { canonical: "/sign-in" },
};

export default function SignInPage() {
  return <SignInV2 />;
}
