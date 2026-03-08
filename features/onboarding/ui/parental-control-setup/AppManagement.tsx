import { InputGroup } from "@/shared/ui/input-group";
import { Controller, useFormContext } from "react-hook-form";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import SubHeading from "./SubHeading";

export default function AppManagement() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
                error={errors.appInstallationApproval?.message as string}
                {...field}
                wrapperClassName="divide-y divide-neutral-100"
                options={[
                  {
                    label: "Require parent approval before new apps are installed",
                    value: "REQUIRE_APPROVAL",
                    containerClassName: "py-3",
                    labelClassName: "cursor-pointer text-slate-700",
                  },
                  {
                    label: "Allow installations without approval",
                    value: "ALLOW_WITHOUT_APPROVAL",
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
                  <InputGroup label="Games" type="checkbox" id="games" {...field} />
                )}
              />
            </div>
            <div className="py-4">
              <Controller
                control={control}
                name="social_media"
                render={({ field }) => (
                  <InputGroup label="Social Media" type="checkbox" id="social_media" {...field} />
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
                    {...field}
                    disabled={true}
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
                    {...field}
                    disabled={true}
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
                    {...field}
                    disabled={true}
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
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {errors.games && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.games.message as string}
            </p>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}
