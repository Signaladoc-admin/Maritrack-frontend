"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 px-4 text-center py-10 bg-background">
      {/* Alert Icon Badge with Coral Tone */}
      <div className="rounded-full border border-[var(--coral-border)] bg-[var(--coral-soft)] p-5">
        <AlertTriangle className="h-10 w-10 text-[var(--coral)]" />
      </div>

      <div className="space-y-3 max-w-[540px] mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Something went wrong
        </h2>
        <p className="text-base text-[var(--text-2)] leading-relaxed">
          An unexpected error occurred while trying to process your request. Please try again or return to the homepage.
        </p>

        {error.digest && (
          <div className="mt-4 inline-block rounded-md border border-[var(--card-line)] bg-[var(--card-fill)] px-3 py-2 text-xs font-mono text-[var(--text-3)]">
            Error Code: <span className="text-[var(--text-2)] font-semibold">{error.digest}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <Button
          size="sm"
          onClick={() => reset()}
          className="flex min-w-[140px] items-center justify-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push("/")}
          className="flex min-w-[140px] items-center justify-center gap-2 text-white border-[var(--card-line-strong)] hover:border-white"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
}
