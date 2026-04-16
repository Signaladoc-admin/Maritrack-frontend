import AddTeamMemberForm from "./AddTeamMemberForm";
import { TeamMemberSchemaValues } from "../schema";
import TeamMemberCard from "@/entities/business/ui/TeamMemberCard";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { useCreateTeamMembers } from "@/entities/business/model/useTeamMembers";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/auth.store";
import { useGetBusiness } from "@/entities/business/model/useBusiness";

export interface TeamMember {
  id: string;
  memberEmail: string;
  location: string;
}

export default function InviteTeamMembersForm({ onBack }: { onBack: () => void }) {
  const { createTeamMembers, isSubmitting } = useCreateTeamMembers();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const router = useRouter();

  // const businessId = useAuthStore((s) => s.businessId);
  // console.log(businessId);
  // const { data: business } = useGetBusiness(businessId!);
  // const businessProfile = business?.staff;
  // console.log(businessProfile);

  function handleAddTeamMember(data: TeamMemberSchemaValues) {
    const newMember = {
      id: crypto.randomUUID(),
      memberEmail: data.email,
      location: data.location,
    };
    setTeamMembers((prev) => [newMember, ...prev]);
  }

  function handleRemoveTeamMember(member: TeamMember) {
    setTeamMembers((prev) => prev.filter((m) => m !== member));
  }

  async function handleSubmit() {
    const res = await createTeamMembers([]);
    console.log("res", res);
    // if (res.status === true) {
    //   router.push("/dashboard");
    // }
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
      <AddTeamMemberForm onAddTeamMember={handleAddTeamMember} />

      <hr />

      <div className="space-y-3">
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={index}
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
