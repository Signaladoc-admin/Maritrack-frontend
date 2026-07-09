import {
  Smartphone,
  Truck,
  Building2,
  ShoppingCart,
  Stethoscope,
  GraduationCap,
  Landmark,
  Network,
  Package,
  Shield,
  Wifi,
  Eye,
  Zap,
} from "lucide-react";

export const industries = [
  {
    icon: Smartphone,
    title: "Telecom & Device Financing",
    desc: "Recover financed and enterprise handsets; enforce payment-linked device policy.",
    accent: "#05E0E4",
  },
  {
    icon: Truck,
    title: "Logistics & Field Operations",
    desc: "Track and secure devices carried by delivery riders, drivers, and field agents.",
    accent: "#4A9EFF",
  },
  {
    icon: Building2,
    title: "Corporate IT & Enterprise",
    desc: "Manage and protect company-issued laptops, tablets, and phones — including after offboarding.",
    accent: "#04DB62",
  },
  {
    icon: ShoppingCart,
    title: "Retail & Point-of-Sale",
    desc: "Protect POS terminals and devices activated at point of sale before they leave the store.",
    accent: "#05E0E4",
  },
  {
    icon: Stethoscope,
    title: "Healthcare Providers",
    desc: "Secure devices carrying patient data across clinics, home visits, and mobile care teams.",
    accent: "#4A9EFF",
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Manage school-issued devices and support safer device use for students.",
    accent: "#04DB62",
  },
  {
    icon: Landmark,
    title: "Government & Public Sector",
    desc: "Track and secure devices issued to field officers and public-facing teams.",
    accent: "#05E0E4",
  },
  {
    icon: Network,
    title: "MVNOs & Wholesale Partners",
    desc: "Extend the same protection layer to partners and resellers on your network.",
    accent: "#4A9EFF",
  },
  {
    icon: Package,
    title: "Any Growing Fleet",
    desc: "If your business hands out devices faster than you can track them, this is built for you.",
    accent: "#04DB62",
  },
];

export const businessProtections = [
  "Recover lost, stolen, or unreturned company devices",
  "See and secure every device across a fleet, in real time",
  "Protect sensitive data on devices you don't physically control",
];

export const familyProtections = [
  "See your child's live location and safe zones",
  "Filter apps and content by age-appropriateness",
  "Lock or locate a lost or stolen device instantly",
];

export const values = [
  {
    icon: Shield,
    title: "Trust by design.",
    desc: "Every lock, wipe, and location request is encrypted and auditable. Power over a device belongs only to the person who should have it — an operations team, an IT admin, or a parent — and no one else.",
    accent: "#05E0E4",
  },
  {
    icon: Wifi,
    title: "Built for real conditions.",
    desc: "Connectivity isn't guaranteed everywhere our customers operate, so Flentra works over SMS as well as data — control shouldn't disappear the moment a device goes offline.",
    accent: "#4A9EFF",
  },
  {
    icon: Eye,
    title: "Protection, not surveillance.",
    desc: "For employees, subscribers, and children alike, the goal is safety and accountability — never control for its own sake.",
    accent: "#04DB62",
  },
  {
    icon: Zap,
    title: "Simple enough to actually use.",
    desc: "Whether it's an operations team managing a fleet of thousands or a parent setting up their first safe zone, the platform should never require a manual.",
    accent: "#05E0E4",
  },
];

export const timelineEvents = [
  {
    year: "Day 1",
    label: "The observation",
    desc: "Organizations investing millions in mobile devices lost all visibility the moment those devices left their premises.",
  },
  {
    year: "Early",
    label: "Telecom roots",
    desc: "Working with telecom operators and device financing partners revealed a systemic gap: financed handsets vanishing, assets unreturned, policies impossible to enforce.",
  },
  {
    year: "Expanding",
    label: "The pattern repeats",
    desc: "Logistics, healthcare, education, enterprise — everywhere a device left the building, the same loss of control appeared.",
  },
  {
    year: "Platform",
    label: "One solution built",
    desc: "Real-time device intelligence, remote security controls, and policy enforcement — in a single platform that works even with inconsistent connectivity via SMS.",
  },
  {
    year: "Today",
    label: "Two audiences, one mission",
    desc: "The same intelligence that protects enterprise assets now provides peace of mind to families. Businesses and households, served under one mission.",
  },
];
