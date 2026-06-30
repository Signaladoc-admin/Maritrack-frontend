export const TABS = [
  { label: "General", value: "general" },
  // { label: "Web history", value: "web-history" },
  { label: "App control", value: "app-control" },
  { label: "Location", value: "location" },
  { label: "Configuration", value: "configuration" },
];

// Recipient for "request a custom plan" enquiries (e.g. business users needing more
// than 200 devices). Falls back to a hard-coded address when the env var is unset.
// Must stay NEXT_PUBLIC_-prefixed so Next.js inlines it into the client bundle —
// PricingStep reads it in the browser.
export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_FLENTRA_SUPPORT_EMAIL ?? "support@flentra.com";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}
