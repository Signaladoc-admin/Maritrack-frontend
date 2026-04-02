import React, { useState } from "react";
import { TeamMemberSchemaValues } from "./schema";

export default function useBusinessDetails() {
  const [businessData, setBusinessData] = useState<{
    businessProfile: string;
    departments?: string[];
    locations?: string[];
    teamMembers?: {
      id: string;
      memberEmail: string;
      location: string;
    }[];
  }>({
    businessProfile: "",
    departments: [],
    locations: [],
    teamMembers: [],
  });

  function handleAddBusinessDetails(data: {
    businessProfile: string;
    departments?: string[];
    locations?: string[];
  }) {
    setBusinessData((prev) => ({ ...prev, ...data }));
  }
  function handleAddTeamMember(data: TeamMemberSchemaValues) {
    const newMember = {
      id: crypto.randomUUID(),
      ...data,
    };
    setBusinessData((prev) => ({ ...prev, teamMembers: [...(prev.teamMembers ?? []), newMember] }));
  }
  function handleRemoveTeamMember(member: TeamMemberSchemaValues & { id: string }) {
    setBusinessData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers?.filter((m) => m.id !== member.id),
    }));
  }
  return {
    businessData,
    handleAddBusinessDetails,
    handleAddTeamMember,
    handleRemoveTeamMember,
  };
}
