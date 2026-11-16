import type { ChallengeIconName, NavIconName } from "@/features/landing-v2/data";

export function NavItemIcon({
  icon,
  tone,
}: {
  icon: NavIconName;
  tone: "cyan" | "green";
}) {
  const strokeColor = tone === "green" ? "#5CF5B0" : "#7FE9EC";

  switch (icon) {
    case "device-management":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    case "tracking-geofencing":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    case "device-protection":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        </svg>
      );
    case "integrations":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
          <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
        </svg>
      );
    case "device-financing":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18M7 15h3" />
        </svg>
      );
    case "financial-institutions":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 10l9-6 9 6M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18" />
        </svg>
      );
    case "bnpl":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 7h12l-1 13H7z" />
          <path d="M9 7a3 3 0 0 1 6 0" />
        </svg>
      );
    case "telecoms-retailers":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20h4v-6H4zM10 20h4V10h-4zM16 20h4V4h-4z" />
        </svg>
      );
    case "enterprise-solutions":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
        </svg>
      );
    case "blog":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z" />
          <path d="M8 7h6M8 11h6" />
        </svg>
      );
    case "faqs":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17h.01" />
        </svg>
      );
  }
}

export function ChallengeIcon({ icon }: { icon: ChallengeIconName }) {
  switch (icon) {
    case "missing":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF9C8E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
      );
    case "spreadsheets":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF9C8E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 4v16" />
        </svg>
      );
    case "late":
      return (
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF9C8E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
  }
}

export function CheckIcon({
  tone = "green",
  size = 18,
}: {
  tone?: "cyan" | "green" | "green-light";
  size?: number;
}) {
  const strokeColor =
    tone === "cyan"
      ? "#05E0E5"
      : tone === "green-light"
        ? "#5CF5B0"
        : "#01DB5E";
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth={tone === "green-light" ? "2.6" : "2.4"}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0"
    >
      <path d={tone === "green-light" ? "M5 12l5 5L20 7" : "M5 12l5 5 9-10"} />
    </svg>
  );
}

export function ShieldTrustIcon() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5CF5B0"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    </svg>
  );
}

export function SignInUserIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7FE9EC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#002147"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="fl-arrow shrink-0"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function HamburgerMenuIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function LockAlertIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF9C8E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="fl-chev shrink-0"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
