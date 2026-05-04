import { teamMemberSchema, TeamMemberSchemaValues } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { InputGroup } from "@/shared/ui/input-group";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { TeamMember } from "./InviteTeamMembersForm";

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
  onAddTeamMember: (data: TeamMemberSchemaValues & { id: string }) => void;
  teamMembers: TeamMember[];
}) {
  const emailRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TeamMemberSchemaValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: { email: "", location: "" },
    mode: "onTouched",
  });

  const { ref: registerEmailRef, ...emailProps } = register("email");

  function onSubmit(data: TeamMemberSchemaValues) {
    if (teamMembers.some((m) => m.email === data.email)) {
      setError("email", { message: "Email already added" });
      return;
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
        <InputGroup
          label="Location"
          type="text"
          placeholder="Lekki"
          {...register("location")}
          error={errors.location?.message}
        />
      </div>
      <Button className="w-full" type="submit" variant="outlinePrimary">
        Add
      </Button>
    </form>
  );
}
