"use client";

import { refreshAccessTokenAction } from "@/features/auth/api/auth.actions";
import { RefreshTokenResponse } from "@/features/auth/types";
import { ApiResponse } from "@/shared/api/types";
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";

export default function RefreshTokenTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    success: boolean;
    data: ApiResponse<RefreshTokenResponse>;
  } | null>(null);

  const handleRefreshToken = async () => {
    try {
      setIsLoading(true);
      const res = await refreshAccessTokenAction();
      console.log("res", res);

      if (res?.success) {
        setResponse(res);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={handleRefreshToken} disabled={isLoading}>
        {isLoading ? "Refreshing..." : "Refresh token"}
      </Button>
      {response?.data?.data?.access_token || "N/A"}
    </div>
  );
}
