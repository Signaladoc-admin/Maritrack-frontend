// app/some-route/error.tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Example of using a hook

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service here
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>An error digest: {error.digest}</p>
      <button onClick={() => reset()}>Try again</button>
      {/* Optionally, provide a way to navigate home */}
      <button onClick={() => useRouter().push("/")}>Go Home</button>
    </div>
  );
}
