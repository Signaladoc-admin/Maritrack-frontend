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
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 px-4 text-center py-10">
      <div className="rounded-full bg-red-100 p-5 dark:bg-red-900/20">
        <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-500" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          Something went wrong!
        </h2>
        <p className="mx-auto max-w-[500px] text-slate-500 dark:text-slate-400">
          We apologize for the inconvenience. An unexpected error has occurred while trying to process your request.
          {error.digest && (
            <span className="mt-2 block rounded bg-slate-100 p-2 text-xs font-mono text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              Error Digest: {error.digest}
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 sm:items-center sm:justify-center mt-8">
        <Button size='sm' onClick={() => reset()} className="flex min-w-[140px] items-center justify-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
        <Button size='sm' variant="outline" onClick={() => router.push("/")} className="flex min-w-[140px] items-center justify-center gap-2">
          <Home className="h-4 w-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
}
