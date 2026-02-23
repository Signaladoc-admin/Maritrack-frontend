import { parentGenderOptions } from "@/lib/constants/shared";
import { Button } from "@/shared/ui/button";
import { FilledUserIcon } from "@/shared/ui/icons";
import { FileUpload } from "@/shared/ui/image-upload";
import { InputGroup } from "@/shared/ui/input-group";
import { Header } from "@/shared/ui/layout/header";
import { CountryStateInput } from "@/shared/ui/inputs/country-state-input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parentOnboardingProfileSchema } from "../schema";
import z from "zod";

type ParentProfileValues = z.infer<typeof parentOnboardingProfileSchema>;

export default function BasicInformationForm({ goToNextStep }: { goToNextStep: () => void }) {
  const form = useForm<ParentProfileValues>({
    resolver: zodResolver(parentOnboardingProfileSchema),
    defaultValues: {
      address: "",
      country: "",
      state: "",
      gender: undefined,
      profileImage: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = form;

  const onSubmit = (data: ParentProfileValues) => {
    console.log("Form data:", data);
    goToNextStep();
  };

  console.log(errors);

  return (
    <div className="space-y-4">
      <Header title="Hi Grace, Tell us about you" subtitle="Give us more information about you" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <FileUpload
          value={form.watch("profileImage")}
          onChange={(file) => setValue("profileImage", file as File)}
          accept="image/*"
          className="h-24 w-24 rounded-full"
          previewClassName="h-full w-full rounded-full object-cover"
        >
          <div className="bg-muted flex h-full w-full items-center justify-center rounded-full border-gray-300 transition-colors hover:bg-gray-200">
            <FilledUserIcon className="h-12 w-12 text-[#1b3c73]" />
          </div>
        </FileUpload>

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <InputGroup
              options={parentGenderOptions}
              type="select"
              label="What gender of parent are you?"
              error={errors.gender?.message}
              {...field}
              onValueChange={field.onChange}
            />
          )}
        />

        <InputGroup
          label="Address"
          placeholder="Enter street address, apt. number, etc."
          error={errors.address?.message}
          {...register("address")}
        />

        <CountryStateInput
          control={control}
          countryName="country"
          stateName="state"
          errors={errors}
          setValue={setValue}
        />

        <Button type="submit" className="w-full bg-[#1b3c73] hover:bg-[#152e5a]">
          Next
        </Button>
      </form>
    </div>
  );
}
