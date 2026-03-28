import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import Link from "next/link";

export default function ForgotPasswordForm() {
  return (
    <div className="space-y-7">
      <InputGroup label="Email adddress" type="email" />
      <Button className="w-full">Register</Button>
      <p className="text-center text-sm">
        Remember your password?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Log in
        </Link>
      </p>
    </div>
  );
}
