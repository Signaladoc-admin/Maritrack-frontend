import type { Metadata } from "next";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { Header } from "@/shared/ui/layout/header";
import { SignOutButton } from "@/features/auth/ui/SignOutButton";
import { ChangePasswordView } from "@/features/auth/ui/ChangePasswordView";
import { getBusinessAction } from "@/entities/business/api/business.actions";
import type { ApiResponse } from "@/shared/api/types";
import type { Business } from "@/entities/business/types";

export const metadata: Metadata = {
  title: "Change Password — Flentra",
  description:
    "Secure your Flentra account by replacing your temporary default password. Newly invited team members set a strong personal password here before accessing their organisation's device management workspace.",
  // Protected, account-specific page — keep it out of search indexes.
  robots: { index: false, follow: false },
};

// The inviting organisation's name powers the subtitle. The signed-in invited staff
// carry their businessId in the access token; resolve the business from it. Any failure
// (missing token/businessId, restricted access) falls back to a generic phrasing.
async function getInvitingBusinessName(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("accessToken")?.value || cookieStore.get("refreshToken")?.value;
    if (!token) return null;

    const { businessId } = decodeJwt(token) as { businessId?: string | null };
    if (!businessId) return null;

    const res = await getBusinessAction(businessId);
    if (!res.success || !res.data) return null;

    return (res.data as ApiResponse<Business>).data?.name ?? null;
  } catch {
    return null;
  }
}

export default async function ChangePasswordPage() {
  const businessName = await getInvitingBusinessName();
  const subtitle = `You've been invited by ${
    businessName ?? "your organisation"
  }, change your password from the default now`;

  return (
    <div className="mx-auto max-w-xl p-5">
      <div className="mb-6 flex justify-end">
        <SignOutButton />
      </div>

      <div className="flex justify-center">
        <Header className="text-center" title="Change your password" subtitle={subtitle} />
      </div>

      <ChangePasswordView />
    </div>
  );
}
