"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col items-center justify-center space-y-6 px-4 text-center py-10 bg-[#002147] text-white antialiased">
        {/* Alert Icon Badge with Coral Tone */}
        <div className="rounded-full border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.12)] p-5">
          <AlertTriangle className="h-10 w-10 text-[#ef4444]" />
        </div>

        <div className="space-y-3 max-w-[540px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Critical Application Error
          </h2>
          <p className="text-base text-[rgba(255,255,255,0.7)] leading-relaxed">
            A critical error occurred while rendering the application. Please try reloading the page.
          </p>

          {error.digest && (
            <div className="mt-4 inline-block rounded-md border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-3 py-2 text-xs font-mono text-[rgba(255,255,255,0.5)]">
              Error Code: <span className="text-white font-semibold">{error.digest}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#00e564] px-6 py-2.5 text-sm font-bold text-[#002147] hover:bg-[#00c452] transition-colors cursor-pointer"
          >
            <RefreshCcw className="h-4 w-4" />
            Reload application
          </button>
        </div>
      </body>
    </html>
  );
}
