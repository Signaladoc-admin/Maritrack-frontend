import { useAuth } from "@/shared/auth/AuthProvider";
import Link from "next/link";

export default function HaveAnAccount() {
  const { user } = useAuth();

  return (
    <p className="text-center text-sm">
      Have an account?{" "}
      <Link
        href={
          user?.appRole === "BUSINESS"
            ? "/business/login"
            : user?.appRole === "PARENT"
              ? "/login"
              : "/login"
        }
        className="text-primary font-semibold"
      >
        Log in
      </Link>
    </p>
  );
}
