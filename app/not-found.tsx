import { Button } from "@/shared/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center py-12 bg-background">
      {/* 404 Accent Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-tint)] px-4 py-1.5 text-xs font-bold tracking-wider text-[var(--accent)] uppercase">
        Error 404
      </div>

      {/* Large 404 Header */}
      <h1 className="text-7xl sm:text-9xl font-extrabold tracking-tight text-white mb-2 font-mono">
        404
      </h1>

      {/* Title & Description */}
      <div className="space-y-3 max-w-md mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Page not found
        </h2>
        <p className="text-base text-[var(--text-2)] leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed, renamed, or doesn&apos;t exist.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <Button href="/" className="min-w-[150px] flex items-center justify-center gap-2">
          <Home className="h-4 w-4" />
          Go to Dashboard
        </Button>
        <Button
          href="/devices"
          variant="outline"
          className="min-w-[150px] flex items-center justify-center gap-2 text-white border-[var(--card-line-strong)] hover:border-white"
        >
          <ArrowLeft className="h-4 w-4" />
          View Devices
        </Button>
      </div>
    </div>
  );
}
