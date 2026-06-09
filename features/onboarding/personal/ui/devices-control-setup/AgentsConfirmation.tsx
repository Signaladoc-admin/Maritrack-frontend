import { InputGroup } from "@/shared/ui/input-group";
import { Controller, useFormContext } from "react-hook-form";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import { AppRole, devicesControlHeadings } from "@/features/parents/ui/DeviceConfigurationSetup";
import { useAuth } from "@/shared/auth/AuthProvider";

const checkboxOptions = [
  { label: "Inform agents that monitoring is active", value: "inform_agents_of_monitoring" },
  {
    label: "Allow agents to request extra screen time",
    value: "allow_agents_to_request_extra_screen_time",
  },
];

export default function AgentsConfirmation() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <CardWrapper variant="outline" className="space-y-10!">
      <div>
        <CardHeader
          title={devicesControlHeadings.confirmationAndConsent["BUSINESS"].title}
          description={devicesControlHeadings.confirmationAndConsent["BUSINESS"].description}
          className="mb-6"
        />

        <div className="space-y-4">
          <div className="divide-y divide-neutral-100 border-neutral-100">
            {checkboxOptions.map((item, index) => (
              <div className="py-4!" key={index}>
                <Controller
                  control={control}
                  name={item.value}
                  render={({ field }) => (
                    <InputGroup
                      label={item.label}
                      type="checkbox"
                      id={item.value}
                      error={errors[item.value]?.message as string}
                      {...field}
                    />
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <p className="text-muted-foreground mt-6! text-sm font-medium">
          {devicesControlHeadings.confirmationAndConsent["BUSINESS"].footerDescription}
        </p>
      </div>
    </CardWrapper>
  );
}
