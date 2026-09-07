import z from "zod";

export const CreateDepartmentValues = z.object({
  name: z.string().min(1, "Department name is required"),
});

export type CreateDepartmentValues = z.infer<typeof CreateDepartmentValues>;

export const updateDepartmentValues = CreateDepartmentValues.extend({});

export type UpdateDepartmentValues = z.infer<typeof updateDepartmentValues>;

export const assignDeviceToUserSchema = z
  .object({
    staffId: z.string().min(1, "Staff member not selected"),
    underPaymentPlan: z.boolean().optional(),
    devicePriceInKobo: z.string().optional(),
    downPaymentInKobo: z.string().optional(),
    monthlyPaymentInKobo: z.string().optional(),
    paymentPlanDuration: z.string().optional(),
    gracePeriodInDays: z.string().optional(),
    paymentStartDate: z.string().optional(),
    transFer: z.boolean().optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
    address: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.underPaymentPlan) {
      if (!data.devicePriceInKobo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Device price is required",
          path: ["devicePriceInKobo"],
        });
      }
      if (!data.monthlyPaymentInKobo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Monthly payment is required",
          path: ["monthlyPaymentInKobo"],
        });
      }
      if (!data.paymentPlanDuration) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Repayment duration is required",
          path: ["paymentPlanDuration"],
        });
      }
      if (!data.paymentStartDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Payment start date is required",
          path: ["paymentStartDate"],
        });
      }
      if (data.transFer) {
        if (!data.gender) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Gender is required when transfer is enabled",
            path: ["gender"],
          });
        }
        if (!data.address) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Address is required when transfer is enabled",
            path: ["address"],
          });
        }
        if (!data.state) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "State is required when transfer is enabled",
            path: ["state"],
          });
        }
        if (!data.country) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Country is required when transfer is enabled",
            path: ["country"],
          });
        }
      }
    }
  });

export type AssignDeviceToUserValues = z.infer<typeof assignDeviceToUserSchema>;
