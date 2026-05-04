import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
export function getInitials(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatDate(
  date: string | Date,
  format?:
    | "short"
    | "long"
    | "numeric"
    | "full"
    | "medium"
    | "relative"
    | "time"
    | "datetime"
    | "custom"
    | undefined
): string {
  switch (format) {
    case "short":
      return new Date(date).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "long":
      return new Date(date).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "numeric":
      return new Date(date).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    case "full":
      return new Date(date).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "medium":
      return new Date(date).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "relative":
      return new Date(date).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "time":
      return new Date(date).toLocaleTimeString("en-NG", {
        hour: "numeric",
        minute: "numeric",
      });
    case "datetime":
      return new Date(date).toLocaleString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    case "custom":
      return new Date(date).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    default:
      return new Date(date).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  }
}
function truncateID(id: string, length: number = 4): string {
  return id.slice(0, length) + "..." + id.slice(-length);
}

export function formatID(id: string, prefix?: string, length: number = 4): string {
  if (prefix) {
    return `${prefix}-${truncateID(id, length)}`;
  }
  return truncateID(id, length);
}
