import { InputGroup } from "@/shared/ui/input-group";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";

const schema = z.object({
  is_legal_guardian: z.boolean(),
});

export default function ParentalConfirmation() {
  const { control, formState } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      is_legal_guardian: false,
    },
  });

  return (
    <CardWrapper variant="outline" className="space-y-10!">
      <div>
        <CardHeader
          title="Parental Confirmation & Consent"
          description="Confirm your authority and approve monitoring."
        />

        <div className="space-y-4">
          <div className="divide-y divide-neutral-100 border-neutral-100">
            <div>
              <Controller
                control={control}
                name="is_legal_guardian"
                render={({ field }) => (
                  <InputGroup
                    label="I confirm that I am the legal parent or guardian of the child(ren) added and I consent to monitoring their device activity."
                    type="checkbox"
                    id="is_legal_guardian"
                    error={formState.errors.is_legal_guardian?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
