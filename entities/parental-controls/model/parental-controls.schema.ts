import { z } from "zod";

export const parentalControlSchema = z.object({
  monitorScreenTime: z.boolean().default(false),
  monitorAppUsage: z.boolean().default(false),
  monitorAppInstalls: z.boolean().default(false),
  monitorWebBrowsing: z.boolean().default(false),
  monitorLocation: z.boolean().default(false),
  monitorDeviceUsageHours: z.boolean().default(false),

  screenTimeLimit: z.string().default("NO_LIMIT"),
  customScreenTimeHours: z.number().optional().default(0),
  downtimeStart: z.string().optional().default("22:30"),
  downtimeEnd: z.string().optional().default("05:00"),
  schoolHoursRestriction: z.boolean().default(false),

  appInstallApproval: z.string().default("ALLOW_WITHOUT_APPROVAL"),
  restrictedCategories: z.array(z.string()).default([]),

  alertEvents: z.array(z.string()).default([]),
  notificationMethod: z.string().default("PUSH"),

  informChildMonitoring: z.boolean().default(false),
  allowExtraScreenTime: z.boolean().default(false),
  parentalConsent: z.boolean().default(false),
});

export type ParentalControlDto = z.infer<typeof parentalControlSchema>;

export interface ParentalControlResponse extends ParentalControlDto {
  id: string;
  parentId: string;
  createdAt?: string;
  updatedAt?: string;
}
