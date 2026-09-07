import AddTeamMemberForm, { AddTeamMemberFormSkeleton } from "./AddTeamMemberForm";
import { OnboardingStaffMemberValues } from "../schema";
import TeamMemberCard, { TeamMemberCardSkeleton } from "@/entities/business/ui/TeamMemberCard";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { useCreateStaffMembers } from "@/entities/business/model/useStaffMembers";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/ui/toast";
import { setOnboardedAction } from "@/features/onboarding/api/onboarding.actions";
import { BusinessRoleEnum } from "@/entities/user/model/user.schema";
import { useOtherTeamMembers } from "@/entities/business/model/useTeamMembers";

export interface TeamMember {
  id: string;
  email: string;
  location: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export default function InviteTeamMembersForm({
  onBack,
}: {
  onBack: () => void;
}) {
  const { mutateAsync: createStaffMembers, isPending: isSubmitting } = useCreateStaffMembers();
  const { otherTeamMembers: existingTeamMembers } = useOtherTeamMembers();

  const [newTeamMembers, setNewTeamMembers] = useState<TeamMember[]>([]);
  const formattedExistingTeamMembers: TeamMember[] = (existingTeamMembers || []).map(
    (member: any) => ({
      id: member.id,
      email: member.user?.email || "",
      location: member.location || "",
      firstName: member.user?.firstName || "",
      lastName: member.user?.lastName || "",
      phone: member.user?.phone || "",
    })
  );

  // On submit, creating the staff invalidates & refetches the staff-members list, so the
  // just-created members land in `formattedExistingTeamMembers` while still living in the
  // local `newTeamMembers` state — rendering each one twice. Dedupe by email (email is the
  // unique identifier for a member) and let the server-persisted copy, which comes first, win.
  const allTeamMembers = [...formattedExistingTeamMembers, ...newTeamMembers].filter(
    (member, index, list) => list.findIndex((m) => m.email === member.email) === index
  );

  const router = useRouter();
  const { toast } = useToast();

  function handleAddTeamMember(data: OnboardingStaffMemberValues) {
    const newMember = {
      id: crypto.randomUUID(),
      email: data.email,
      location: data.location,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    };
    setNewTeamMembers((prev) => [newMember, ...prev]);
  }

  function handleRemoveTeamMember(member: TeamMember) {
    setNewTeamMembers((prev) => prev.filter((m) => m !== member));
  }

  async function handleSubmit() {
    try {
      const payload = newTeamMembers.map((m) => ({
        email: m.email,
        location: m.location,
        firstName: m.firstName,
        lastName: m.lastName,
        departmentId: "",
        businessRole: BusinessRoleEnum.DEPARTMENT_MANAGER,
        position: "",
        phone: m.phone,
      }));

      await createStaffMembers(payload);

      newTeamMembers.length > 0 &&
        toast({
          type: "success",
          title: "Success",
          message: "Team members invited successfully",
        });

      await setOnboardedAction();
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
      <AddTeamMemberForm onAddTeamMember={handleAddTeamMember} teamMembers={newTeamMembers} />


      <hr />

      <div className="space-y-3">
        {allTeamMembers.map((member) => (
          <TeamMemberCard
            key={member.email}
            teamMember={member}
            onRemoveTeamMember={handleRemoveTeamMember}
          />
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Button variant="secondary" onClick={onBack}>
          Previous
        </Button>
        <Button
          disabled={isSubmitting || allTeamMembers.length === 0}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          variant="link"
          onClick={async () => {
            await setOnboardedAction();
            router.push("/dashboard");
          }}
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}
