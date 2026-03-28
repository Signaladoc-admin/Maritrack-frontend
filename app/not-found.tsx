import { Button } from "@/shared/ui/button";
import { H3, P } from "@/shared/ui/typography";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-y-3">
      <H3 className="my-0!">404 Not Found</H3>
      <P className="my-0!">The page you are looking for does not exist.</P>
      <Button href="/">Return to Homepage</Button>
    </div>
  );
}
