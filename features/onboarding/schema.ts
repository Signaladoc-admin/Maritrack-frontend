import { genderOptions } from "@/lib/constants/shared";
import z from "zod";

const genderValues = genderOptions.map((option) => option.value) as [string, ...string[]];

export const childProfileSchema = z.object({
  profileImage: z.instanceof(File).optional(),
  name: z.string().min(1, "Enter your child's name"),
  age: z.string().min(1, "Enter your child's age"),
  gender: z.enum(genderValues, {
    error: () => ({
      message: "Select a gender",
    }),
  }),
});
