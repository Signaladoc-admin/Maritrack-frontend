import z from "zod";

const genderValues = ["MALE", "FEMALE"] as const;
const parentGenderValues = ["FATHER", "MOTHER", "GUARDIAN"] as const;

export const parentOnboardingProfileSchema = z.object({
  profileImage: z.instanceof(File).optional(),
  gender: z.enum(parentGenderValues, {
    error: () => ({
      message: "Select a gender",
    }),
  }),
  address: z.string().min(1, "Enter your address"),
  country: z.string().min(1, "Select a country"),
  state: z.string().min(1, "Select a state"),
});

export const childProfileSchema = z.object({
  profilePicture: z
    .instanceof(File, { message: "Please upload a profile photo" })
    .refine((f) => f.size > 0, { message: "Please upload a profile photo" }),
  name: z.string().min(1, "Enter your child's name"),
  age: z.coerce.number().min(1, "Enter your child's age"),
  gender: z.enum(genderValues, {
    error: () => ({
      message: "Select a gender",
    }),
  }),
});

/** Same as childProfileSchema but profilePicture is optional — used when editing an existing child. */
export const updateChildProfileSchema = childProfileSchema.extend({
  profilePicture: z.instanceof(File).optional(),
});
