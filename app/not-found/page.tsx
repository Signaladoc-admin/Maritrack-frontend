import { Button } from "@/shared/ui/button";
import { H3 } from "@/shared/ui/typography";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-3">
      <H3>404 Not Found</H3>
      <p>The page you are looking for does not exist.</p>
      <Button href="/">Return to Homepage</Button>
    </div>
  );
}
