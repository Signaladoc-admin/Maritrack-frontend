"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="bg-destructive/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
        <ShieldAlert className="text-destructive h-10 w-10" />
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Access Denied</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        You do not have the necessary permissions to view this page. If you believe this is an
        error, please contact your administrator.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => router.push("/")} variant="outline">
          Go to Home
        </Button>
        <Button onClick={() => router.push("/login")}>Login with different account</Button>
      </div>
    </div>
  );
}
