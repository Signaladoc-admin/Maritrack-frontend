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
  profileImage: z.instanceof(File).optional(),
  name: z.string().min(1, "Enter your child's name"),
  age: z.coerce.number().min(1, "Enter your child's age"),
  gender: z.enum(genderValues, {
    error: () => ({
      message: "Select a gender",
    }),
  }),
});
