import { InputGroup } from "@/shared/ui/input-group";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import SubHeading from "./SubHeading";

const schema = z.object({
  appInstallationApproval: z.enum(["require_approval", "allow_without_approval"]),
  games: z.boolean().optional(),
  social_media: z.boolean().optional(),
  browsers: z.boolean().optional(),
  streaming: z.boolean().optional(),
  in_app_purchases: z.boolean().optional(),
  adult_restricted_content: z.boolean().optional(),
});

export default function AppManagement() {
  const { control, formState } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      appInstallationApproval: undefined,
      games: false,
      social_media: false,
      browsers: false,
      streaming: false,
      in_app_purchases: false,
      adult_restricted_content: false,
    },
  });

  return (
    <CardWrapper variant="outline">
      <div className="space-y-10!">
        <CardHeader
          title="App Management Preferences"
          description="Control which apps your child can install and use"
        />
        <div className="space-y-2">
          <SubHeading title="App installation approval" />
          <Controller
            control={control}
            name="appInstallationApproval"
            render={({ field }) => (
              <InputGroup
                label=""
                type="radio"
                error={formState.errors.appInstallationApproval?.message}
                {...field}
                wrapperClassName="divide-y divide-neutral-100"
                options={[
                  {
                    label: "Require parent approval before new apps are installed",
                    value: "require_approval",
                    containerClassName: "py-3",
                    labelClassName: "cursor-pointer text-slate-700",
                  },
                  {
                    label: "Allow installations without approval",
                    value: "allow_without_approval",
                    containerClassName: "py-3",
                    labelClassName: "cursor-pointer text-slate-700",
                  },
                ]}
              />
            )}
          />
        </div>
        <div className="space-y-2">
          <SubHeading title="Restrict app categories" subtitle="Multiple selections allowed" />
          <div className="divide-y divide-neutral-100">
            <div className="py-4">
              <Controller
                control={control}
                name="games"
                render={({ field }) => (
                  <InputGroup
                    label="Games"
                    type="checkbox"
                    id="games"
                    error={formState.errors.games?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="social_media"
                render={({ field }) => (
                  <InputGroup
                    label="Social Media"
                    type="checkbox"
                    id="social_media"
                    error={formState.errors.social_media?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="browsers"
                render={({ field }) => (
                  <InputGroup
                    label="Browsers"
                    type="checkbox"
                    id="browsers"
                    error={formState.errors.browsers?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="streaming"
                render={({ field }) => (
                  <InputGroup
                    label="Streaming & entertainment"
                    type="checkbox"
                    id="streaming"
                    error={formState.errors.streaming?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="in_app_purchases"
                render={({ field }) => (
                  <InputGroup
                    label="In-app purchases"
                    type="checkbox"
                    id="in_app_purchases"
                    error={formState.errors.in_app_purchases?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="adult_restricted_content"
                render={({ field }) => (
                  <InputGroup
                    label="Adult or age-restricted content"
                    type="checkbox"
                    id="adult_restricted_content"
                    error={formState.errors.adult_restricted_content?.message}
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
