import { teamMemberSchema, TeamMemberSchemaValues } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputGroup } from "@/shared/ui/input-group";
import { Button } from "@/shared/ui/button";

export default function AddTeamMemberForm({
  onAddTeamMember,
}: {
  onAddTeamMember: (data: TeamMemberSchemaValues & { id: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TeamMemberSchemaValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      email: "",
      location: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(data: TeamMemberSchemaValues) {
    const payload = { id: crypto.randomUUID(), ...data };
    onAddTeamMember(payload);
    setValue("email", "");
    setValue("location", "");

    // set cursor back on first input after submission
    document.querySelector("input")?.focus();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="space-y-5">
        <InputGroup
          label="Member email"
          type="text"
          placeholder="Email address here"
          {...register("email")}
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
