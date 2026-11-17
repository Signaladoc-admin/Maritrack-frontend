export type NavMenuKey = "platform" | "solutions" | "resources";

export type ChallengeIconName = "missing" | "spreadsheets" | "late";

export type NavIconName =
  | "device-management"
  | "tracking-geofencing"
  | "device-protection"
  | "integrations"
  | "device-financing"
  | "financial-institutions"
  | "bnpl"
  | "telecoms-retailers"
  | "enterprise-solutions"
  | "blog"
  | "faqs";

export interface MobileNavLinkItem {
  title: string;
  description: string;
  href: string;
}

export interface MobileNavGroup {
  key: NavMenuKey;
  label: string;
  links: MobileNavLinkItem[];
}

export const mobileNavGroups: Record<NavMenuKey, MobileNavGroup> = {
  platform: {
    key: "platform",
    label: "Platform",
    links: [
      {
        title: "Platform overview",
        description: "Everything in one portal",
        href: "/platform",
      },
      {
        title: "Device management",
        description: "Enrol, assign and control every device",
        href: "/platform/device-management",
      },
      {
        title: "Device tracking and geofencing",
        description: "See where devices are and set safe zones",
        href: "/platform/device-tracking-geofencing",
      },
      {
        title: "Device protection",
        description: "Lock, wipe and recover devices",
        href: "/platform/device-protection",
      },
      {
        title: "Integrations",
        description: "Connect the systems you already use",
        href: "/platform/integrations",
      },
    ],
  },
  solutions: {
    key: "solutions",
    label: "Solutions",
    links: [
      {
        title: "Device financing",
        description: "Protect devices sold on credit",
        href: "/solutions/device-financing",
      },
      {
        title: "Financial institutions",
        description: "Device loans for banks and microfinance",
        href: "/solutions/financial-institutions",
      },
      {
        title: "BNPL",
        description: "Buy now, pay later for phones and laptops",
        href: "/solutions/bnpl",
      },
      {
        title: "Telecoms and retailers",
        description: "Instalment sales in stores and dealer networks",
        href: "/solutions/telecoms-retailers",
      },
      {
        title: "Enterprise solutions",
        description: "Company devices for staff and field teams",
        href: "/solutions/enterprise-solutions",
      },
    ],
  },
  resources: {
    key: "resources",
    label: "Resources",
    links: [
      {
        title: "Blog",
        description: "Guides and news on device portfolios",
        href: "/resources/blog",
      },
      {
        title: "FAQs",
        description: "Answers to common questions",
        href: "/resources/faqs",
      },
    ],
  },
};

export interface NavDropdownItem {
  title: string;
  description: string;
  href: string;
  icon: NavIconName;
  tone: "cyan" | "green";
}

export interface NavDropdownPanel {
  key: NavMenuKey;
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  overviewLink?: {
    label: string;
    href: string;
  };
  items: NavDropdownItem[];
  promo?: {
    badge: string;
    badgeTone: "cyan" | "green";
    title: string;
    cta: {
      label: string;
      href: string;
      variant: "button" | "link";
    };
  };
}

export const navDropdownPanels: Record<NavMenuKey, NavDropdownPanel> = {
  platform: {
    key: "platform",
    id: "menu-platform",
    eyebrow: "Platform",
    headline: "One platform for your device portfolio",
    description:
      "Manage, track and protect every device, linked to the people and contracts behind it.",
    overviewLink: {
      label: "Platform overview →",
      href: "/platform",
    },
    items: [
      {
        title: "Device management",
        description: "Enrol, assign and control every device",
        href: "/platform/device-management",
        icon: "device-management",
        tone: "cyan",
      },
      {
        title: "Device tracking and geofencing",
        description: "See where devices are and set safe zones",
        href: "/platform/device-tracking-geofencing",
        icon: "tracking-geofencing",
        tone: "cyan",
      },
      {
        title: "Device protection",
        description: "Lock, wipe and recover lost or overdue devices",
        href: "/platform/device-protection",
        icon: "device-protection",
        tone: "cyan",
      },
      {
        title: "Integrations",
        description: "Connect Flentra to the systems you already use",
        href: "/platform/integrations",
        icon: "integrations",
        tone: "cyan",
      },
    ],
  },
  solutions: {
    key: "solutions",
    id: "menu-solutions",
    eyebrow: "Solutions",
    headline: "Built for how your business uses devices",
    description: "Whether you finance devices to customers or issue them to staff.",
    items: [
      {
        title: "Device financing",
        description: "Protect devices sold on credit",
        href: "/solutions/device-financing",
        icon: "device-financing",
        tone: "cyan",
      },
      {
        title: "Financial institutions",
        description: "Device loans for banks and microfinance",
        href: "/solutions/financial-institutions",
        icon: "financial-institutions",
        tone: "cyan",
      },
      {
        title: "BNPL",
        description: "Buy now, pay later for phones and laptops",
        href: "/solutions/bnpl",
        icon: "bnpl",
        tone: "cyan",
      },
      {
        title: "Telecoms and retailers",
        description: "Instalment sales in stores and dealer networks",
        href: "/solutions/telecoms-retailers",
        icon: "telecoms-retailers",
        tone: "cyan",
      },
      {
        title: "Enterprise solutions",
        description: "Company devices for staff and field teams",
        href: "/solutions/enterprise-solutions",
        icon: "enterprise-solutions",
        tone: "green",
      },
    ],
    promo: {
      badge: "Not sure which fits?",
      badgeTone: "cyan",
      title: "Tell us how you use devices and we’ll show you the right setup.",
      cta: {
        label: "Talk to us",
        href: "/book-a-demo",
        variant: "button",
      },
    },
  },
  resources: {
    key: "resources",
    id: "menu-resources",
    eyebrow: "Resources",
    headline: "Learn and get answers",
    description: "Guides on device portfolios, and quick answers about Flentra.",
    items: [
      {
        title: "Blog",
        description: "Guides and news on device portfolios",
        href: "/resources/blog",
        icon: "blog",
        tone: "cyan",
      },
      {
        title: "FAQs",
        description: "Answers to common questions",
        href: "/resources/faqs",
        icon: "faqs",
        tone: "cyan",
      },
    ],
    promo: {
      badge: "Need help?",
      badgeTone: "cyan",
      title: "Our team answers at info@flentra.io",
      cta: {
        label: "Email us →",
        href: "mailto:info@flentra.io",
        variant: "link",
      },
    },
  },
};

export interface FooterLinkGroup {
  heading: string;
  links: {
    label: string;
    href: string;
  }[];
}

export const footerColumns: FooterLinkGroup[][] = [
  [
    {
      heading: "Platform",
      links: [
        { label: "Platform overview", href: "/platform" },
        { label: "Device management", href: "/platform/device-management" },
        { label: "Tracking and geofencing", href: "/platform/device-tracking-geofencing" },
        { label: "Device protection", href: "/platform/device-protection" },
        { label: "Integrations", href: "/platform/integrations" },
      ],
    },
  ],
  [
    {
      heading: "Solutions",
      links: [
        { label: "Device financing", href: "/solutions/device-financing" },
        { label: "Financial institutions", href: "/solutions/financial-institutions" },
        { label: "BNPL", href: "/solutions/bnpl" },
        { label: "Telecoms and retailers", href: "/solutions/telecoms-retailers" },
        { label: "Enterprise solutions", href: "/solutions/enterprise-solutions" },
      ],
    },
  ],
  [
    {
      heading: "For families",
      links: [{ label: "Flentra for Family", href: "/family" }],
    },
    {
      heading: "Resources",
      links: [
        { label: "Blog", href: "/resources/blog" },
        { label: "FAQs", href: "/resources/faqs" },
      ],
    },
  ],
  [
    {
      heading: "Company",
      links: [
        { label: "About us", href: "/company" },
        { label: "Book a demo", href: "/book-a-demo" },
        { label: "Sign in", href: "/login" },
        { label: "Privacy policy", href: "/privacy-policy" },
        { label: "Terms of service", href: "/terms-of-service" },
      ],
    },
  ],
];

export interface HeroStatItem {
  label: string;
  value: string;
  tone: "white" | "coral" | "green";
}

export interface HeroDeviceRow {
  assignedTo: string;
  subtitle: string;
  device: string;
  status: string;
  tone: "green" | "coral" | "cyan";
}

export const heroStats: HeroStatItem[] = [
  { label: "Devices online", value: "192", tone: "white" },
  { label: "Locked", value: "6", tone: "coral" },
  { label: "Assigned this week", value: "14", tone: "green" },
];

export const heroDeviceRows: HeroDeviceRow[] = [
  {
    assignedTo: "Kwame Mensah",
    subtitle: "Customer · financed",
    device: "Motorola Edge 50",
    status: "Active",
    tone: "green",
  },
  {
    assignedTo: "Amaka Nwosu",
    subtitle: "Staff · Sales, Abuja",
    device: "ThinkPad E14",
    status: "Active",
    tone: "green",
  },
  {
    assignedTo: "Sofia Martinez",
    subtitle: "Customer · financed",
    device: "Galaxy A15",
    status: "Locked · overdue",
    tone: "coral",
  },
  {
    assignedTo: "Field team 3",
    subtitle: "Staff · Logistics, Kano",
    device: "iPad 10th gen",
    status: "Offline 3 days",
    tone: "cyan",
  },
];

export const heroPlatforms = ["Android", "iPhone and iPad", "Windows"] as const;

export const trustBadges = [
  "Consent recorded for every user",
  "Audit trail on every action",
  "Built for the NDPA 2023",
] as const;

export interface ChallengeCardItem {
  icon: ChallengeIconName;
  title: string;
  description: string;
}

export const challengeCards: ChallengeCardItem[] = [
  
   {
    icon: "late",
    title: "Problems are found too late",
    description:
      "A missed payment or an offline device shows up in a report weeks later, when it’s much harder to recover.",
  },
  {
    icon: "spreadsheets",
    title: "Records live in spreadsheets",
    description:
      "Who has which device, what it cost and whether it’s paid for are scattered across sheets and inboxes.",
  },
  {
    icon: "missing",
    title: "Devices go missing",
    description:
      "Phones and laptops are lost, stolen or never returned when staff leave, often with company data still on them.",
  }
 
];

export interface TwoWaysCardItem {
  badge: string;
  badgeTone: "cyan" | "green";
  title: string;
  description: string;
  checklist: string[];
  cta?: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
  };
}

export const twoWaysCards: TwoWaysCardItem[] = [
  {
    badge: "Device financing",
    badgeTone: "cyan",
    title: "For businesses that sell devices on credit",
    description:
      "Link each customer, their repayment plan and their device, so instalment sales stay protected until the final payment.",
    checklist: [
      "Activation at the counter through your retailer network",
      "Automatic reminders and grace periods",
      "Lock where your contract allows; unlock the moment they pay",
      "Release devices for good once fully paid",
    ],
  },
  {
    badge: "Corporate devices",
    badgeTone: "green",
    title: "For companies that buy devices for their teams",
    description:
      "Register every phone, tablet and laptop you procure, assign it to a person or team, and keep track of it until it comes back.",
    checklist: [
      "One register of every device, its cost and who holds it",
      "Location and status, with alerts when a device goes offline",
      "Lock or wipe a lost device remotely",
      "Recover and reassign devices when staff move or leave",
    ],
  },
];

export interface PlatformFeatureCardItem {
  title: string;
  description: string;
}

export const platformFeatureCards: PlatformFeatureCardItem[] = [
  {
    title: "Device register",
    description:
      "Every device, its owner, cost and history, searchable in one place.",
  },
  {
    title: "Location and status",
    description:
      "See where devices are and which are online, offline or locked.",
  },
  {
    title: "Lock, wipe and restore",
    description: "Act remotely on Android, iPhone, iPad and Windows devices.",
  },
  {
    title: "Alerts and messages",
    description:
      "Automatic alerts for your team and approved messages for device users.",
  },
  {
    title: "Retailer network",
    description:
      "For financing: authorise retailers to activate devices at the counter.",
  },
  {
    title: "Reports, audit logs and roles",
    description: "A full record of every action, with access set by role.",
  },
];

export interface SolutionCardItem {
  title: string;
  description: string;
}

export const solutionCards: SolutionCardItem[] = [
  
  {
    title: "Lenders and banks",
    description:
      "Offer device loans with the controls and audit trail your risk team expects.",
  },
  {
    title: "Telcos and retailers",
    description:
      "Sell more devices on instalments through your stores and dealer networks.",
  },
  {
    title: "Corporates and SMEs",
    description:
      "Keep track of the phones and laptops you buy for staff, from day one to their last day.",
  },
  {
    title: "Field and logistics teams",
    description:
      "Know where shared tablets and handhelds are, and lock them if they go missing.",
  }
];

export interface GettingStartedStepItem {
  step: string;
  badgeTone: "cyan" | "coral" | "green-solid";
  title: string;
  description: string;
  highlighted?: boolean;
}

export const gettingStartedSteps: GettingStartedStepItem[] = [
  {
    step: "Step 1",
    badgeTone: "cyan",
    title: "Register",
    description:
      "Enrol devices when you buy them or sell them, with consent recorded for every user.",
  },
  {
    step: "Step 2",
    badgeTone: "cyan",
    title: "Assign",
    description:
      "Link each device to an employee, a team or a customer’s repayment plan.",
  },
  {
    step: "Step 3",
    badgeTone: "coral",
    title: "Monitor and act",
    description:
      "Get alerts when a device goes offline, is reported lost or a payment is late, and lock it in seconds.",
  },
  {
    step: "Step 4",
    badgeTone: "green-solid",
    title: "Restore or recover",
    description:
      "Unlock when the issue is resolved, or wipe and reassign devices when staff leave.",
    highlighted: true,
  },
];

export interface WhyFlentraComparisonRow {
  need: string;
  standard: string;
  standardPositive?: boolean;
  flentra: string;
}

export const whyFlentraComparisonRows: WhyFlentraComparisonRow[] = [
  {
    need: "Lock, wipe and locate devices",
    standard: "Yes",
    standardPositive: true,
    flentra: "Yes",
  },
  {
    need: "Register with cost, owner and assignment history",
    standard: "Partly",
    flentra: "Yes",
  },
  {
    need: "Each device linked to an employee or a repayment plan",
    standard: "No",
    flentra: "Yes",
  },
  {
    need: "Payment reminders and automatic unlock on payment",
    standard: "No",
    flentra: "Yes",
  },
  {
    need: "Retailer network for activations at the counter",
    standard: "No",
    flentra: "Yes",
  },
  {
    need: "Consent records and a full audit trail",
    standard: "Partly",
    flentra: "Yes",
  },
];

export const complianceChecklist = [
  "Consent recorded for every device user",
  "Approved message templates",
  "Audit log of every action, by every user",
  "Role-based access for staff and auditors",
] as const;

export const pricingPilotChecklist = [
  "Set up on a group of your own devices, with our team alongside you",
  "See your portfolio dashboard and alerts from the first week",
  "Review the results with us before you decide",
] as const;

export const homeDemoUseOptions = [
  "Device financing",
  "Company devices for staff",
  "Both",
] as const;

export const homeDemoDeviceOptions = [
  "Under 100",
  "100 – 1,000",
  "1,001 – 10,000",
  "Over 10,000",
] as const;

export const bookADemoChecklist = [
  "A walkthrough of the portal, set up for your use case",
  "Pricing for your device mix, monthly or yearly",
  "A plan for a 30-day pilot",
] as const;

export const bookADemoUseOptions = [
  "Device financing",
  "Financial institution",
  "BNPL",
  "Telecom or retail",
  "Enterprise devices",
  "Flentra for Family",
] as const;

export const bookADemoDeviceOptions = [
  "Under 100",
  "100 – 1,000",
  "1,001 – 10,000",
  "Over 10,000",
] as const;

export interface FamilySampleDeviceItem {
  name: string;
  subtitle: string;
  status: string;
  variant: "safe" | "locked";
}

export const familySampleDevices: FamilySampleDeviceItem[] = [
  {
    name: "Tolu’s phone",
    subtitle: "Arrived at school · 7:58 am",
    status: "Safe",
    variant: "safe",
  },
  {
    name: "Mum’s phone",
    subtitle: "At work · Victoria Island",
    status: "Safe",
    variant: "safe",
  },
  {
    name: "Family laptop",
    subtitle: "Reported lost · locked",
    status: "Locked",
    variant: "locked",
  },
];

export interface FamilyFeatureCardItem {
  title: string;
  description: string;
}

export const familyFeatureCards: FamilyFeatureCardItem[] = [
  {
    title: "Find a lost device",
    description: "See where a family phone or laptop was last seen.",
  },
  {
    title: "Lock or wipe if stolen",
    description:
      "Protect photos, messages and bank apps on a stolen device.",
  },
  {
    title: "Safe places",
    description:
      "Get a note when family members arrive at home or school.",
  },
  {
    title: "One family view",
    description: "All your household’s devices in one simple app.",
  },
];

export interface CompanyBeliefCardItem {
  title: string;
  description: string;
}

export const companyBeliefCards: CompanyBeliefCardItem[] = [
  {
    title: "Fair to the end user",
    description:
      "Clear consent, clear messages and quick restoration when issues are resolved.",
  },
  {
    title: "Simple to use",
    description:
      "Software your team can pick up in a day, from the counter to the boardroom.",
  },
  {
    title: "Accountable",
    description:
      "Every action recorded, so you can always show what happened and why.",
  },
];

export const blogCategories = [
  "All",
  "Device financing",
  "Enterprise",
  "Product news",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export interface BlogPostCardItem {
  title: string;
  category: Exclude<BlogCategory, "All">;
  badgeTone: "cyan" | "green" | "neutral";
  meta: string;
  href: string;
}

export const blogPostCards: BlogPostCardItem[] = [
  {
    title:
      "How to cut losses on financed phones without hurting good customers",
    category: "Device financing",
    badgeTone: "cyan",
    meta: "[Publish date] · [Author]",
    href: "#post",
  },
  {
    title:
      "What the FCCPC digital lending rules mean for device lenders",
    category: "Device financing",
    badgeTone: "cyan",
    meta: "[Publish date] · [Author]",
    href: "#post",
  },
  {
    title:
      "A checklist for getting company laptops back when staff leave",
    category: "Enterprise",
    badgeTone: "green",
    meta: "[Publish date] · [Author]",
    href: "#post",
  },
  {
    title:
      "Spreadsheet to portal: building a device register that stays up to date",
    category: "Enterprise",
    badgeTone: "green",
    meta: "[Publish date] · [Author]",
    href: "#post",
  },
  {
    title: "Introducing geofencing in Flentra",
    category: "Product news",
    badgeTone: "neutral",
    meta: "[Publish date] · [Author]",
    href: "#post",
  },
  {
    title: "Why device loans need more than a lock",
    category: "Device financing",
    badgeTone: "cyan",
    meta: "[Publish date] · [Author]",
    href: "#post",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const faqItems: FaqItem[] = [
  {
    question: "What is Flentra?",
    answer:
      "Flentra is an intelligent portfolio and device management platform. It links every device to the person, team or repayment plan it belongs to, so businesses can track, manage and protect their devices from one portal.",
    defaultOpen: true,
  },
  {
    question: "Who is Flentra for?",
    answer:
      "Device financiers such as banks, microfinance lenders, BNPL providers, telecoms and retailers, and companies that buy and issue devices to their staff. Flentra for Family is our offering for households.",
  },
  {
    question: "Which devices does Flentra work with?",
    answer:
      "Android phones and tablets, iPhones and iPads, and Windows laptops.",
  },
  {
    question: "How is Flentra priced?",
    answer:
      "You pay per device, monthly or yearly, depending on what suits your business. Prices are set by device type, with volume discounts as your fleet grows. Standard support is included, and prices exclude VAT. Ask us for our rate card.",
  },
  {
    question: "Can we try Flentra first?",
    answer: "Yes. You can start a 30-day pilot on your own devices.",
  },
  {
    question: "What happens when a customer misses a payment?",
    answer:
      "Flentra sends reminders first, then gives a grace period. Where your agreement with the customer allows, the device is then restricted. Access is restored automatically as soon as the customer pays.",
  },
  {
    question: "Can a subscription be moved to another device?",
    answer:
      "No. Each device registered is billed for its own subscription, which cannot be moved to another device or refunded.",
  },
  {
    question: "How does Flentra protect personal data?",
    answer:
      "Consent is recorded when a device is enrolled, access is limited by role, and every action is logged. Flentra is built with the Nigeria Data Protection Act 2023 in mind.",
  },
  {
    question: "Can Flentra connect to our systems?",
    answer:
      "Yes. Flentra offers APIs and webhooks for loan, payment, HR and finance systems. Our team can also build custom integrations, quoted separately.",
  },
  {
    question: "What support is included?",
    answer:
      "Standard support is included with every plan. Business and Enterprise support plans are available for faster response times and a dedicated team.",
  },
  {
    question: "Who is behind Flentra?",
    answer:
      "Flentra is built and run by Marimax Global Concepts Limited.",
  },
];

export const platformOverviewWhatItDoes: {
  title: string;
  description: string;
  href: string;
}[] = [
  {
    title: "Device management",
    description:
      "Enrol devices, keep one register of every device and assign each to a person, team or contract.",
    href: "/platform/device-management",
  },
  {
    title: "Device tracking and geofencing",
    description:
      "See where devices are, when they were last online, and get alerts when they leave a zone.",
    href: "/platform/device-tracking-geofencing",
  },
  {
    title: "Device protection",
    description:
      "Lock, unlock and wipe devices remotely, with clear rules for when each action happens.",
    href: "/platform/device-protection",
  },
  {
    title: "Integrations",
    description:
      "Connect Flentra to your loan, payment and business systems through APIs.",
    href: "/platform/integrations",
  },
];

export const platformPortfolioCards: {
  title: string;
  description: string;
}[] = [
  {
    title: "Portfolio dashboard",
    description: "Devices online, locked and needing attention, at a glance.",
  },
  {
    title: "Reports",
    description: "Portfolio, activation and device reports you can share.",
  },
  {
    title: "Audit logs",
    description: "A record of every action, by every user.",
  },
  {
    title: "Roles and permissions",
    description: "Administrator, operations and auditor access.",
  },
];

export const platformWorksWith = [
  "Android",
  "iPhone and iPad",
  "Windows",
] as const;

export const deviceManagementFeatures: {
  title: string;
  description: string;
}[] = [
  {
    title: "Enrolment",
    description:
      "Add Android, iPhone and Windows devices in minutes, in store or at the office.",
  },
  {
    title: "Device register",
    description:
      "One live list of every device: model, serial number, status and who has it.",
  },
  {
    title: "Assignment",
    description:
      "Link each device to a staff member, team, branch or customer loan.",
  },
  {
    title: "Remote actions",
    description: "Lock, unlock or wipe a device from the portal when needed.",
  },
  {
    title: "Messages to users",
    description: "Send clear notices to the person with the device.",
  },
  {
    title: "Offboarding",
    description: "Record returns, wipe devices and reassign them cleanly.",
  },
];

export const deviceManagementRelated: {
  title: string;
  href: string;
}[] = [
  {
    title: "Device tracking and geofencing",
    href: "/platform/device-tracking-geofencing",
  },
  {
    title: "Device protection",
    href: "/platform/device-protection",
  },
  {
    title: "Enterprise solutions",
    href: "/solutions/enterprise-solutions",
  },
];

export const deviceTrackingFeatures: {
  title: string;
  description: string;
}[] = [
  {
    title: "Last known location",
    description:
      "See where each device was last seen, with the time and place recorded.",
  },
  {
    title: "Online and offline status",
    description:
      "Spot devices that haven’t checked in so you can follow up early.",
  },
  {
    title: "Geofences",
    description:
      "Draw zones around offices, branches, warehouses, schools or routes.",
  },
  {
    title: "Zone alerts",
    description: "Get notified when a device enters or leaves a zone.",
  },
  {
    title: "Recovery support",
    description:
      "Location history to help recover lost or unreturned devices.",
  },
  {
    title: "Privacy by design",
    description:
      "Users know the device is managed, and location access is controlled by role.",
  },
];

export const deviceTrackingRelated: {
  title: string;
  href: string;
}[] = [
  {
    title: "Device protection",
    href: "/platform/device-protection",
  },
  {
    title: "Enterprise solutions",
    href: "/solutions/enterprise-solutions",
  },
  {
    title: "Flentra for Family",
    href: "/family",
  },
];

export const deviceProtectionFeatures: {
  title: string;
  description: string;
}[] = [
  {
    title: "Automated reminders",
    description:
      "Send clear, approved notices before and after a due date or return deadline.",
  },
  {
    title: "Grace periods",
    description:
      "Give customers or staff time to resolve an issue before a restriction applies.",
  },
  {
    title: "Remote lock",
    description:
      "Restrict access on overdue, lost or unreturned devices where your agreement allows.",
  },
  {
    title: "Instant unlock on payment",
    description:
      "Restore device access automatically the moment payment or clearance is confirmed.",
  },
  {
    title: "Remote wipe",
    description:
      "Wipe sensitive company or personal data on stolen or unrecoverable devices.",
  },
  {
    title: "Full audit trail",
    description:
      "Every reminder, lock, unlock and wipe is logged with a timestamp and user record.",
  },
];

export const deviceProtectionRelated: {
  title: string;
  href: string;
}[] = [
  {
    title: "Device financing",
    href: "/solutions/device-financing",
  },
  {
    title: "Device management",
    href: "/platform/device-management",
  },
  {
    title: "Device tracking and geofencing",
    href: "/platform/device-tracking-geofencing",
  },
];

export const integrationsConnectCards: {
  title: string;
  description: string;
}[] = [
  {
    title: "Loan management systems",
    description:
      "Link devices to loans, repayment schedules and customer records.",
  },
  {
    title: "Payment channels",
    description:
      "Unlock a device automatically as soon as a payment is confirmed.",
  },
  {
    title: "HR and staff records",
    description:
      "Assign devices when staff join and flag them for return when they leave.",
  },
  {
    title: "Finance and asset registers",
    description:
      "Keep your asset register in step with the devices on the ground.",
  },
  {
    title: "Messaging",
    description:
      "Send reminders and notices through your approved channels.",
  },
  {
    title: "Reporting tools",
    description:
      "Export portfolio and device data to your reporting or BI tools.",
  },
];

export const integrationsHowWeConnect: {
  title: string;
  description: string;
}[] = [
  {
    title: "APIs",
    description:
      "REST APIs for enrolling devices, updating status and reading portfolio data.",
  },
  {
    title: "Webhooks",
    description:
      "Real-time events when a device is enrolled, locked, unlocked or goes offline.",
  },
  {
    title: "Custom work",
    description:
      "Need a specific integration built? Our team can scope and build it with you, quoted separately.",
  },
];

export const bnplFeatures: {
  title: string;
  description: string;
}[] = [
  {
    title: "Activation at checkout",
    description:
      "Partner retailers activate each device in minutes, before it leaves the store.",
  },
  {
    title: "Automatic reminders",
    description:
      "Customers get clear, approved reminders before and after each due date.",
  },
  {
    title: "Grace periods, then a lock",
    description:
      "Give customers time to pay, then restrict the device where your terms allow.",
  },
  {
    title: "Instant unlock on payment",
    description:
      "No calls or tickets: the device unlocks as soon as payment lands.",
  },
  {
    title: "Retailer performance",
    description:
      "See activations and success rates for every partner store and branch.",
  },
  {
    title: "Fair-lending records",
    description:
      "Consent, messages and every action logged, ready for the regulator.",
  },
];

export const bnplRelated: {
  title: string;
  href: string;
}[] = [
  {
    title: "Device protection",
    href: "/platform/device-protection",
  },
  {
    title: "Device management",
    href: "/platform/device-management",
  },
  {
    title: "Integrations",
    href: "/platform/integrations",
  },
];

export const deviceFinancingSteps: {
  badge: {
    label: string;
    tone: "cyan" | "coral" | "green-solid";
    size: "sm";
    weight: "extrabold";
  };
  title: string;
  description: string;
  surface?: "navy" | "green-tint";
  descriptionTone?: "muted" | "soft";
}[] = [
  {
    badge: {
      label: "Step 1",
      tone: "cyan",
      size: "sm",
      weight: "extrabold",
    },
    title: "Activate at the counter",
    description:
      "Retailers activate the device at sale, with the customer’s consent recorded.",
  },
  {
    badge: {
      label: "Step 2",
      tone: "cyan",
      size: "sm",
      weight: "extrabold",
    },
    title: "Link it to the loan",
    description:
      "Each device follows its repayment plan, so you always know who owes what.",
  },
  {
    badge: {
      label: "Step 3",
      tone: "coral",
      size: "sm",
      weight: "extrabold",
    },
    title: "Remind, then protect",
    description:
      "Reminders, then a grace period, then a lock where your contract allows.",
  },
  {
    badge: {
      label: "Step 4",
      tone: "green-solid",
      size: "sm",
      weight: "extrabold",
    },
    title: "Restore on payment",
    description:
      "Access returns the moment they pay; paid-off devices are released for good.",
    surface: "green-tint",
    descriptionTone: "soft",
  },
];

export const deviceFinancingKinds: {
  title: string;
  description: string;
  href: string;
}[] = [
  {
    title: "Financial institutions",
    description: "Banks and microfinance lenders",
    href: "/solutions/financial-institutions",
  },
  {
    title: "BNPL providers",
    description: "Buy now, pay later for phones and laptops",
    href: "/solutions/bnpl",
  },
  {
    title: "Telecoms and retailers",
    description: "Instalment plans in stores and dealer networks",
    href: "/solutions/telecoms-retailers",
  },
];

export const enterpriseLifecycleSteps: {
  badge: {
    label: string;
    tone: "green" | "cyan" | "coral";
    size: "sm";
    weight: "extrabold";
  };
  description: string;
  descriptionTone: "soft";
}[] = [
  {
    badge: {
      label: "Procure",
      tone: "green",
      size: "sm",
      weight: "extrabold",
    },
    description:
      "Register each new device with its cost, supplier and serial number.",
    descriptionTone: "soft",
  },
  {
    badge: {
      label: "Assign",
      tone: "green",
      size: "sm",
      weight: "extrabold",
    },
    description:
      "Issue it to a person, team or site, with their acceptance recorded.",
    descriptionTone: "soft",
  },
  {
    badge: {
      label: "Track",
      tone: "cyan",
      size: "sm",
      weight: "extrabold",
    },
    description:
      "See location and status, with alerts for offline or out-of-zone devices.",
    descriptionTone: "soft",
  },
  {
    badge: {
      label: "Protect",
      tone: "coral",
      size: "sm",
      weight: "extrabold",
    },
    description: "Lock or wipe a lost or stolen device before data leaks.",
    descriptionTone: "soft",
  },
  {
    badge: {
      label: "Recover",
      tone: "green",
      size: "sm",
      weight: "extrabold",
    },
    description:
      "Collect, wipe and reassign devices when people move or leave.",
    descriptionTone: "soft",
  },
];

export const enterpriseWhoUsesIt: {
  title: string;
  description: string;
}[] = [
  {
    title: "Corporates and SMEs",
    description: "Laptops and phones for office and remote staff.",
  },
  {
    title: "Field and logistics teams",
    description: "Shared tablets and handhelds that move between sites.",
  },
  {
    title: "Schools and NGOs",
    description: "Devices issued to staff, programmes or beneficiaries.",
  },
];

export const financialInstitutionsFeatures: {
  title: string;
  description: string;
}[] = [
  {
    title: "Secured device lending",
    description:
      "Lend against the device itself, with protection that follows the loan.",
  },
  {
    title: "Staff device schemes",
    description:
      "Finance phones and laptops for employees, repaid through salary.",
  },
  {
    title: "Portfolio visibility",
    description:
      "See repayment, device and risk status across every loan, in real time.",
  },
  {
    title: "Governance and audit",
    description:
      "Consent records, role-based access and a full audit log for regulators and auditors.",
  },
  {
    title: "Core banking connection",
    description:
      "Keep loan status in step with your systems through Flentra’s APIs.",
  },
  {
    title: "Enterprise support",
    description:
      "A dedicated team and agreed response times for larger portfolios.",
  },
];

export const financialInstitutionsRelated: {
  title: string;
  href: string;
}[] = [
  {
    title: "Device protection",
    href: "/platform/device-protection",
  },
  {
    title: "Integrations",
    href: "/platform/integrations",
  },
  {
    title: "Platform overview",
    href: "/platform",
  },
];

export const telecomsRetailersFeatures: {
  title: string;
  description: string;
}[] = [
  {
    title: "Dealer and branch network",
    description:
      "Authorise stores, branches and agents to activate devices, each with their own users.",
  },
  {
    title: "Activation in minutes",
    description:
      "A simple flow at the counter, with mismatches and failures flagged straight away.",
  },
  {
    title: "Partner performance",
    description:
      "Compare activations and success rates across stores, and suspend partners when needed.",
  },
  {
    title: "Work with lenders",
    description:
      "Run your own credit plans, or connect to a bank or BNPL partner on one platform.",
  },
  {
    title: "Protection that follows payment",
    description:
      "Reminders, grace periods and locks, with instant unlock when the customer pays.",
  },
  {
    title: "Android, iPhone and laptops",
    description: "One process for the whole range you sell.",
  },
];

export const telecomsRetailersRelated: {
  title: string;
  href: string;
}[] = [
  {
    title: "BNPL",
    href: "/solutions/bnpl",
  },
  {
    title: "Device financing",
    href: "/solutions/device-financing",
  },
  {
    title: "Device protection",
    href: "/platform/device-protection",
  },
];
