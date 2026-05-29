"use server";

import { withSafeAction } from "@/shared/lib/safe-action";
import { requestTokenAction } from "@/features/auth/api/auth.actions";
import { createBusinessAction } from "@/entities/business/api/business.actions";
import { RegisterBusinessRequest } from "@/entities/business/types";

export async function registerBusinessAction(data: RegisterBusinessRequest) {
  return withSafeAction(async () => {
    const registerRes = await createBusinessAction(data);

    if (!registerRes.success) throw new Error(registerRes.error || 'Registration failed')

    const email = String(data.email)
    const requestTokenRes = await requestTokenAction('email', { email })

    if (!requestTokenRes.success) throw new Error(requestTokenRes.error);

    return {
      success: true,
      data: {
        ...registerRes.data.data,
        ...requestTokenRes.data.data,
      },
      message: `${registerRes.data.message || 'Registration successful'}. ${requestTokenRes.data.message || 'Check your email to verify the email address.'}`
    }
  }, "Registration failed");
}