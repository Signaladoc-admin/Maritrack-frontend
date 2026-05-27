"use client";

import UserAccountTypeSelectionCard from "@/features/auth-register/ui/UserAccountTypeSelectionCard";
import { accountTypes } from "@/features/auth-register/constants";
import Modal from "@/shared/ui/modal";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function RegisterOrSignInButtons() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex flex-row items-center gap-4">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 bg-[#1a3a6b] hover:bg-[#1e4580] border border-white/10 transition-colors text-white font-semibold rounded-lg text-sm w-36 flex items-center justify-center h-auto"
                >
                    Start for free
                </Button>
                <Link
                    href="/login"
                    className="px-6 py-3 bg-white hover:bg-gray-100 transition-colors text-black font-semibold rounded-lg text-sm w-32 flex items-center justify-center"
                >
                    Sign In
                </Link>
            </div>

            <Modal
                title="What type of account do you want to create?"
                subtitle="Create one now"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <div className="space-y-5">
                    <UserAccountTypeSelectionCard
                        icon={accountTypes.PERSONAL.icon}
                        label={accountTypes.PERSONAL.label}
                        description={accountTypes.PERSONAL.description}
                        href="/register"
                    />
                    <UserAccountTypeSelectionCard
                        icon={accountTypes.BUSINESS.icon}
                        label={accountTypes.BUSINESS.label}
                        description={accountTypes.BUSINESS.description}
                        href="/business/register"
                    />
                </div>
            </Modal>
        </>
    )
}