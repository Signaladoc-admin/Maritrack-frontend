import AddTeamMemberForm, { AddTeamMemberFormSkeleton } from "./AddTeamMemberForm";
import { TeamMemberSchemaValues } from "../schema";
import TeamMemberCard, { TeamMemberCardSkeleton } from "@/entities/business/ui/TeamMemberCard";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { useCreateTeamMembers } from "@/entities/business/model/useTeamMembers";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/ui/toast";

export interface TeamMember {
  id: string;
  email: string;
  location: string;
}

export default function InviteTeamMembersForm({
  onBack,
  initialTeamMembers,
  isLoadingTeamMembers,
}: {
  onBack: () => void;
  initialTeamMembers: TeamMember[];
  isLoadingTeamMembers: boolean;
}) {
  const { mutateAsync: createTeamMembers, isPending: isSubmitting } = useCreateTeamMembers();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  console.log("initialTeamMembers", teamMembers);

  const router = useRouter();
  const { toast } = useToast();

  function handleAddTeamMember(data: TeamMemberSchemaValues) {
    const newMember = {
      id: crypto.randomUUID(),
      email: data.email,
      location: data.location,
    };
    setTeamMembers((prev) => [newMember, ...prev]);
  }

  function handleRemoveTeamMember(member: TeamMember) {
    setTeamMembers((prev) => prev.filter((m) => m !== member));
  }

  async function handleSubmit() {
    try {
      const payload = teamMembers.map((m) => ({
        email: m.email,
        location: m.location,
        firstName: "",
        lastName: "",
        departmentId: "",
        businessRole: "DEVICE_MANAGER",
      }));

      await createTeamMembers(payload);

      toast({
        type: "success",
        title: "Success",
        message: "Team members invited successfully",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        type: "error",
        title: "Error",
        message: error.message || "Failed to invite team members",
      });
    }
  }

  return (
    <div className="space-y-7">
      <div className="flex justify-center">
        <Header
          className="text-center"
          title="Invite team members"
          subtitle="Add your staffs & admins"
        />
      </div>
      {isLoadingTeamMembers ? (
        <AddTeamMemberFormSkeleton />
      ) : (
        <AddTeamMemberForm onAddTeamMember={handleAddTeamMember} teamMembers={teamMembers} />
      )}

      <hr />

      <div className="space-y-3">
        {isLoadingTeamMembers ? (
          <>
            <TeamMemberCardSkeleton />
            <TeamMemberCardSkeleton />
          </>
        ) : (
          teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              teamMember={member}
              onRemoveTeamMember={handleRemoveTeamMember}
            />
          ))
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Button variant="secondary" onClick={onBack}>
          Previous
        </Button>
        <Button
          disabled={isSubmitting || teamMembers.length === 0}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <div className="flex justify-center">
        <Button variant="link" onClick={() => router.push("/dashboard")}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}
