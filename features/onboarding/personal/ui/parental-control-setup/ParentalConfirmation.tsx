import { InputGroup } from "@/shared/ui/input-group";
import { Controller, useFormContext } from "react-hook-form";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import { AppRole, devicesControlHeadings } from "@/features/parents/ui/DeviceConfigurationSetup";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function ParentalConfirmation() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { user } = useAuth()

  return (
    <CardWrapper variant="outline" className="space-y-10!">
      <div>
        <CardHeader
          title={devicesControlHeadings.parentalConfirmationAndConsent[user?.appRole?.toUpperCase() as AppRole].title}
          description={devicesControlHeadings.parentalConfirmationAndConsent[user?.appRole?.toUpperCase() as AppRole].description}
        />

        <div className="space-y-4">
          <div className="divide-y divide-neutral-100 border-neutral-100">
            <div>
              <Controller
                control={control}
                name="parentalConsent"
                render={({ field }) => (
                  <InputGroup
                    label={devicesControlHeadings.parentalConfirmationAndConsent[user?.appRole?.toUpperCase() as AppRole].checkboxLabel}
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
