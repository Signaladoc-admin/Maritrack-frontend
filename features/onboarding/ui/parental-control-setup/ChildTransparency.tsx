import { InputGroup } from "@/shared/ui/input-group";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import SubHeading from "./SubHeading";

const schema = z.object({
  inform_my_child_of_monitoring: z.boolean(),
  allow_my_child_request_extra_screen_time: z.boolean(),
});

export default function ChildTransparency() {
  const { control, formState } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      inform_my_child_of_monitoring: false,
      allow_my_child_request_extra_screen_time: false,
    },
  });

  return (
    <CardWrapper variant="outline" className="space-y-10!">
      <div>
        <CardHeader
          title="Child Transparency & Requests"
          description="Build trust and encourage healthy digital habits."
        />

        <div className="space-y-4">
          <SubHeading title="Notify me when:" />
          <div className="divide-y divide-neutral-100 border-b border-neutral-100">
            <div className="py-4">
              <Controller
                control={control}
                name="inform_my_child_of_monitoring"
                render={({ field }) => (
                  <InputGroup
                    label="Inform my child that their device is being monitored"
                    type="checkbox"
                    id="inform_my_child_of_monitoring"
                    error={formState.errors.inform_my_child_of_monitoring?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="allow_my_child_request_extra_screen_time"
                render={({ field }) => (
                  <InputGroup
                    label="Allow my child to request extra screen time"
                    type="checkbox"
                    id="allow_my_child_request_extra_screen_time"
                    error={formState.errors.allow_my_child_request_extra_screen_time?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <span className="text-muted-foreground text-sm">
        We recommend transparency to help children understand boundaries rather than feel monitored
      </span>
    </CardWrapper>
  );
}
