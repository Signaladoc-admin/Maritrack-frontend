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
import { parentHooks } from "@/shared/api/resources";
import { useParentStore } from "@/shared/stores/user-store";
import { useEffect } from "react";
import { Country, State } from "country-state-city";
import { useCreateZone } from "@/features/mdm-sync/model/useMdmSync";
import { useToast } from "@/shared/ui/toast";
import type { UserProfile } from "@/entities/user/model/user.schema";
import { Loader } from "@/shared/ui/loader";
import { cn } from "@/shared/lib/utils";
import { useUserProfile } from "@/entities/user/model/useUserProfile";

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
    reset,
    formState: { errors },
  } = form;

  const { toast } = useToast();

  const { data: user } = useUserProfile();
  console.log("user", user);

  const { data: existingParent, isLoading: isFetchingParent } = parentHooks.useGetById(
    user?.parentId || ""
  );

  console.log("existingParent", existingParent);

  const { mutateAsync: createParent, isPending: isCreating } = parentHooks.useCreate();
  const { mutateAsync: updateParent, isPending: isUpdating } = parentHooks.useUpdate();
  const { mutateAsync: createZone, isPending: isCreatingZone } = useCreateZone();
  const setParentId = useParentStore((state) => state.setParentId);

  useEffect(() => {
    if (existingParent && !isFetchingParent) {
      console.log("Existing parent data received:", existingParent);

      const allCountries = Country.getAllCountries();
      const countryRaw = existingParent.country?.trim() || "";
      const countryMatch = allCountries.find(
        (c) =>
          c.isoCode.toUpperCase() === countryRaw.toUpperCase() ||
          c.name.toLowerCase() === countryRaw.toLowerCase()
      );

      const countryCode = countryMatch?.isoCode || "";

      let stateCode = "";
      if (countryCode) {
        const stateRaw = existingParent.state?.trim() || "";
        const allStates = State.getStatesOfCountry(countryCode);
        const stateMatch = allStates.find(
          (s) =>
            s.isoCode.toUpperCase() === stateRaw.toUpperCase() ||
            s.name.toLowerCase() === stateRaw.toLowerCase() ||
            s.name.toLowerCase().includes(stateRaw.toLowerCase())
        );
        stateCode = stateMatch?.isoCode || "";
      }

      console.log("Mapped ISO codes:", { countryCode, stateCode });

      // Use setValue sequentially to respect dependencies (State depends on Country)
      setValue("address", existingParent.address || "", { shouldDirty: false });

      if (existingParent.gender) {
        const gender = existingParent.gender.toUpperCase();
        console.log("Setting gender to:", gender);
        setValue("gender", gender as any, { shouldDirty: false });
      }

      if (countryCode) {
        console.log("Setting country to:", countryCode);
        setValue("country", countryCode as any, { shouldDirty: false });

        // Wait a microtask to ensure the CountryStateInput has updated its state options
        setTimeout(() => {
          if (stateCode) {
            console.log("Setting state to:", stateCode);
            setValue("state", stateCode as any, { shouldDirty: false });
          }
        }, 0);
      }

      if (existingParent.id) {
        setParentId(existingParent.id);
      }
    }
  }, [existingParent, isFetchingParent, setValue, setParentId]);
  const isPending = isCreating || isUpdating;

  const onSubmit = async (data: ParentProfileValues) => {
    console.log("Form data:", data);

    console.log(user?.parentId);

    try {
      let activeParentId = user?.parentId || existingParent?.id;

      console.log("activeParentId", activeParentId);

      if (activeParentId) {
        // Update the existing parent record
        await updateParent({
          id: activeParentId,
          data: {
            gender: data.gender as any,
            address: data.address,
            state: data.state,
            country: data.country,
          },
        });
        console.log("Parent profile updated successfully.");
      } else {
        // Create the parent record
        const res: any = await createParent({
          gender: data.gender as any,
          address: data.address,
          state: data.state,
          country: data.country,
          userId: user?.id || "",
        });

        console.log("Parent profile created successfully.", res);

        if (res?.data?.id) {
          activeParentId = res.data.id;
          setParentId(res.data.id);
        }
      }

      toast({
        title: "Success",
        message: `Parent profile ${activeParentId ? "updated" : "created"} successfully!`,
        type: "success",
      });

      goToNextStep();
    } catch (err: any) {
      console.error("Failed to save parent information or create zone", err);
      toast({
        title: "Error",
        message: err.message || "Failed to process information. Please try again.",
        type: "error",
      });
    }
  };

  console.log(errors);

  return (
    <div className="relative space-y-4">
      {isFetchingParent && (
        <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
          <Loader size="lg" />
        </div>
      )}

      <Header title="Hi Grace, Tell us about you" subtitle="Give us more information about you" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("space-y-7 transition-opacity duration-300", {
          "pointer-events-none opacity-50": isFetchingParent,
        })}
      >
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

        <Button
          type="submit"
          className="w-full bg-[#1b3c73] hover:bg-[#152e5a]"
          disabled={isPending || isFetchingParent || isCreatingZone}
        >
          {isPending || isCreatingZone ? "Saving..." : isFetchingParent ? "Loading..." : "Next"}
        </Button>
      </form>
    </div>
  );
}
