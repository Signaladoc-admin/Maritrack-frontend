"use client";

import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import Modal from "@/shared/ui/modal";
import { User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UserAccountTypeSelectionCard from "./UserAccountTypeSelectionCard";
import { accountTypes } from "../constants";

export default function LoginForm() {
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);

  return (
    <form className="space-y-7">
      <InputGroup label="Email adddress" type="email" />
      <div className="space-y-2">
        <InputGroup label="Enter password" type="password" />
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-muted-foreground text-right text-sm font-medium"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <Button className="w-full">Login</Button>
      <p className="text-center text-sm">
        Are you new here?{" "}
        <Button
          type="button"
          onClick={() => setIsCreateAccountModalOpen(true)}
          variant="link"
          className="text-primary font-semibold"
        >
          Create an account
        </Button>
      </p>

      <Modal
        title="What type of account do you want to create?"
        subtitle="Create one now"
        isOpen={isCreateAccountModalOpen}
        onClose={() => setIsCreateAccountModalOpen(false)}
        cancelText="Cancel"
        confirmText="Create Account"
      >
        <div className="space-y-5">
          <UserAccountTypeSelectionCard
            icon={accountTypes.PERSONAL.icon}
            label={accountTypes.PERSONAL.label}
            description={accountTypes.PERSONAL.description}
          />
          <UserAccountTypeSelectionCard
            icon={accountTypes.BUSINESS.icon}
            label={accountTypes.BUSINESS.label}
            description={accountTypes.BUSINESS.description}
          />
        </div>
      </Modal>
    </form>
  );
}
