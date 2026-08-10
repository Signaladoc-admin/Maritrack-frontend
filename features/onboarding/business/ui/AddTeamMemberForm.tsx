import { OnboardingStaffMemberValues, onboardingStaffMemberSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { InputGroup } from "@/shared/ui/input-group";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { TeamMember } from "./InviteTeamMembersForm";
import { useUserExists } from "@/entities/user/model/useUserProfile";
import { checkIfEmailExistsAction } from "@/entities/user/api/user.actions";

export function AddTeamMemberFormSkeleton() {
  return (
    <div className="space-y-7">
      <div className="space-y-5">
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
        </div>
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

export default function AddTeamMemberForm({
  onAddTeamMember,
  teamMembers,
}: {
  onAddTeamMember: (data: OnboardingStaffMemberValues & { id: string }) => void;
  teamMembers: TeamMember[];
}) {
  const emailRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<OnboardingStaffMemberValues>({
    resolver: zodResolver(onboardingStaffMemberSchema),
    defaultValues: { email: "", location: "", firstName: "", lastName: "", phone: "" },
    mode: "onTouched",
  });

  const { ref: registerEmailRef, ...emailProps } = register("email");
  const [isLoadingEmailExists, setIsLoadingEmailExists] = useState(false);

  async function onSubmit(data: OnboardingStaffMemberValues) {
    // Check if email already added
    if (teamMembers.some((m) => m.email === data.email)) {
      setError("email", { message: "Email already added" });
      return;
    }

    // Check if email exists
    try {
      setIsLoadingEmailExists(true);
      const userExists = await checkIfEmailExistsAction(data.email);

      if (userExists) {
        setError("email", { message: "A user with this email already exists" });
        return;
      }
    } catch (error: any) {
      setError("email", { message: error?.message });
      return;
    } finally {
      setIsLoadingEmailExists(false);
    }

    onAddTeamMember({ id: crypto.randomUUID(), ...data });
    reset();
    emailRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="space-y-5">
        <InputGroup
          label="Member email"
          type="text"
          placeholder="Email address here"
          {...emailProps}
          ref={(node) => {
            registerEmailRef(node);
            emailRef.current = node;
          }}
          error={errors.email?.message}
        />
        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="First name"
            type="text"
            placeholder="John"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <InputGroup
            label="Last name"
            type="text"
            placeholder="Doe"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <InputGroup
          label="Phone number"
          type="tel"
          placeholder="+1234567890"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <InputGroup
          label="Location"
          type="text"
          placeholder="Lekki"
          {...register("location")}
          error={errors.location?.message}
        />
      </div>
      <Button
        disabled={isLoadingEmailExists}
        className="w-full"
        type="submit"
        variant="outlinePrimary"
      >
        Add
      </Button>
    </form>
  );
}
