import { InputGroup } from "@/shared/ui/input-group";
import { Controller, useFormContext } from "react-hook-form";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";

export default function ParentalConfirmation() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
                name="parentalConsent"
                render={({ field }) => (
                  <InputGroup
                    label="I confirm that I am the legal parent or guardian of the child(ren) added and I consent to monitoring their device activity."
                    type="checkbox"
                    id="parentalConsent"
                    error={errors.parentalConsent?.message as string}
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
