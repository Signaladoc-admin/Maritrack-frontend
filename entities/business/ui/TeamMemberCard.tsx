import { TeamMember } from "@/features/onboarding/business/ui/InviteTeamMembersForm";
import { Button } from "@/shared/ui/button";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { X } from "lucide-react";

export default function TeamMemberCard({
  teamMember,
  onRemoveTeamMember,
}: {
  teamMember: TeamMember;
  onRemoveTeamMember: (member: TeamMember) => void;
}) {
  return (
    <CardWrapper variant="default" padding="default" radius="default">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-2 text-slate-600">
          <p className="truncate text-sm font-normal">{teamMember.memberEmail}</p>
          <p className="truncate text-xs">{teamMember.location}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={() => onRemoveTeamMember(teamMember)}
          className="shrink-0 rounded p-1.5 py-1.5 leading-0 transition-colors hover:bg-red-50"
          aria-label="Remove member"
        >
          <X className="text-red-700" size={16} strokeWidth={2.5} />
        </Button>
      </div>
    </CardWrapper>
  );
}
