"use client";

import OtpConfirmForm from "@/features/auth/ui/OtpConfirmForm";
import { useNewUserStore } from "@/shared/stores/user.store";
import { Header } from "@/shared/ui/layout/header";
import { useToast } from "@/shared/ui/toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function maskEmail(email: string) {
  if (!email) return "your email";
  const [name, domain] = email.split("@");
  if (!domain) return email;
  const maskedName = name.length > 2 ? `${name.substring(0, 2)}***` : `${name.substring(0, 1)}*`;
  return `${maskedName}@${domain}`;
}

export default function ConfirmEmail() {
  const { email } = useNewUserStore();

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!email) {
      toast({
        type: 'error',
        title: 'Error',
        message: 'Email not found. Redirecting to login...'
      })
      router.push('/login')
    }
  }, [email, router, toast])

  return (
    <div className="w-fit mx-auto lg:mx-0 lg:w-full">
      <Header
        title="Confirm your email"
        subtitle={`We have sent an otp to ${maskEmail(email)}, please enter the code sent below`}
        className="mb-10"
      />
      <OtpConfirmForm />
    </div>
  );
}
