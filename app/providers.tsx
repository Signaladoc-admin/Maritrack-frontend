"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

import { AuthProvider } from "@/shared/auth/AuthProvider";
import { ThemeProvider } from "@/shared/theme/ThemeProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            throwOnError: false,
            retry: false,
          },
          mutations: {
            throwOnError: false,
          },
        },
      })
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
