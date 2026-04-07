import AuthLayout from "@/features/auth/ui/AuthLayout";
import { Button } from "@/shared/ui/button";
import { H1, H3 } from "@/shared/ui/typography";

export default function SuccessPage() {
  return (
    <AuthLayout contentPosition="right">
      <div className="flex flex-col items-center justify-center gap-4">
        <H3 variant="primary" className="text-center">
          Thanks for your interest in OptiTrack Device Management. Our team will contact you
          shortly.
        </H3>
        <Button className="w-full" href="/">
          Return to Homepage
        </Button>
      </div>
    </AuthLayout>
  );
}
