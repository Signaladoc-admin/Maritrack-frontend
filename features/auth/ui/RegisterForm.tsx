import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import Link from "next/link";
import HaveAnAccount from "./HaveAnAccount";

export default function RegisterForm() {
  return (
    <form className="space-y-7">
      <InputGroup label="Email adddress" type="email" />
      <div className="space-y-2">
        <InputGroup label="Enter password" type="password" />
        <Link href="/forgot-password" className="text-right text-sm font-medium opacity-50">
          Forgot password?
        </Link>
      </div>
      <Button className="w-full">Register</Button>
      <HaveAnAccount />
    </form>
  );
}
