"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-background">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--coral-border)] bg-[var(--coral-soft)]">
        <ShieldAlert className="text-[var(--coral)] h-10 w-10" />
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">Access Denied</h1>
      <p className="text-base text-[var(--text-2)] mb-8 max-w-md leading-relaxed">
        You do not have the necessary permissions to view this page. If you believe this is an
        error, please contact your administrator.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Button onClick={() => router.back()} size="sm" className="min-w-[130px]">Go back</Button>
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          size="sm"
          className="min-w-[130px] text-white border-[var(--card-line-strong)] hover:border-white"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
