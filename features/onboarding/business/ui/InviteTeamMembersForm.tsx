import AddTeamMemberForm from "./AddTeamMemberForm";
import { TeamMemberSchemaValues } from "../schema";
import TeamMemberCard from "@/entities/business/ui/TeamMemberCard";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";

export default function InviteTeamMembersForm({
  onSubmit,
  onBack,
  onAddTeamMember,
  onRemoveTeamMember,
  teamMembers,
}: {
  onSubmit: () => void;
  onBack: () => void;
  onAddTeamMember: (data: TeamMemberSchemaValues) => void;
  onRemoveTeamMember: (member: TeamMemberSchemaValues & { id: string }) => void;
  teamMembers: (TeamMemberSchemaValues & { id: string })[];
}) {
  function handleSubmit() {
    onSubmit();
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
      <AddTeamMemberForm handleAddTeamMember={onAddTeamMember} />

      <hr />

      <div className="space-y-3">
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={index}
            email={member.memberEmail}
            location={member.location}
            onRemove={() => onRemoveTeamMember(member)}
          />
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Button variant="secondary" onClick={onBack}>
          Previous
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className="flex justify-center">
        <Button variant="link">Skip for now</Button>
      </div>
    </div>
  );
}
