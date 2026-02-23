"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";

// --- 1. Brand Icons with Exact Colors (Inline SVGs) ---

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.472 16.058C17.138 15.891 15.496 15.076 15.189 14.965C14.882 14.854 14.659 14.798 14.436 15.132C14.213 15.466 13.573 16.218 13.378 16.441C13.183 16.664 12.988 16.692 12.654 16.525C12.32 16.358 11.243 16.001 9.966 14.862C8.953 13.959 8.27 12.844 7.936 12.259C7.602 11.674 7.899 11.365 8.066 11.2C8.213 11.054 8.392 10.821 8.559 10.626C8.726 10.431 8.837 10.292 8.948 10.069C9.059 9.846 9.003 9.651 8.92 9.484C8.837 9.317 8.141 7.603 7.852 6.917C7.569 6.255 7.286 6.347 7.082 6.347C6.897 6.338 6.684 6.338 6.47 6.338C6.257 6.338 5.913 6.421 5.625 6.736C5.337 7.051 4.521 7.821 4.521 9.391C4.521 10.96 5.662 12.475 5.829 12.698C5.996 12.921 8.083 16.287 11.373 17.609C12.155 17.923 12.765 18.11 13.245 18.262C14.006 18.504 14.708 18.466 15.262 18.384C15.88 18.291 17.166 17.603 17.435 16.834C17.704 16.065 17.704 15.406 17.63 15.276C17.556 15.146 17.333 15.086 17.009 14.919L17.472 16.058Z"
      fill="#25D366"
    />
    <path
      d="M12 0C5.373 0 0 5.373 0 12C0 14.584 0.828 16.971 2.248 18.935L0.73 23.485L5.414 22.262C7.281 23.37 9.549 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM12 21.818C9.817 21.818 7.79 21.205 6.115 20.138L5.717 19.883L2.505 20.723L3.358 17.603L3.096 17.184C1.908 15.276 1.218 13.039 1.218 10.643C1.218 4.69 6.047 -0.139 12 -0.139C17.953 -0.139 22.782 4.69 22.782 10.643C22.782 16.596 17.953 21.818 12 21.818Z"
      fill="#25D366"
    />
    <path
      d="M12 2.182C6.59 2.182 2.182 6.59 2.182 12C2.182 14.155 2.873 16.139 4.055 17.765L4.143 17.902L3.485 20.306L5.921 19.667L6.097 19.779C7.794 20.855 9.812 21.494 12 21.494C17.41 21.494 21.818 17.086 21.818 11.675C21.818 6.265 17.41 2.182 12 2.182Z"
      fill="white"
    />
    <path
      d="M12 2.182C6.59 2.182 2.182 6.59 2.182 12C2.182 14.155 2.873 16.139 4.055 17.765L4.143 17.902L3.485 20.306L5.921 19.667L6.097 19.779C7.794 20.855 9.812 21.494 12 21.494C17.41 21.494 21.818 17.086 21.818 11.675C21.818 6.265 17.41 2.182 12 2.182Z"
      fill="#25D366"
    />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="url(#ig-grad)" />
    <path
      d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"
      fill="white"
    />
    <path
      d="M16.5 8.5C16.5 9.05228 16.0523 9.5 15.5 9.5C14.9477 9.5 14.5 9.05228 14.5 8.5C14.5 7.94772 14.9477 7.5 15.5 7.5C16.0523 7.5 16.5 7.94772 16.5 8.5Z"
      fill="white"
    />
    <defs>
      <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD600" />
        <stop offset="0.5" stopColor="#FF0069" />
        <stop offset="1" stopColor="#7638FA" />
      </linearGradient>
    </defs>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#000000" />
    <path
      d="M16.5 8.5C16.5 8.5 15 8.5 14 7.5C13 6.5 13 5 13 5H10V15.5C10 17 9 18 7.5 18C6 18 5 17 5 15.5C5 14 6 13 7.5 13C8 13 8.5 13.2 9 13.5V10.5C8.5 10.2 8 10 7.5 10C4.5 10 2 12.5 2 15.5C2 18.5 4.5 21 7.5 21C10.5 21 13 18.5 13 15.5V10C14 11 15.5 11.5 17 11.5V8.5H16.5Z"
      fill="white"
    />
    <path
      d="M16.7 8.7C16.7 8.7 15.2 8.7 14.2 7.7C13.2 6.7 13.2 5.2 13.2 5.2H10.2V15.7C10.2 17.2 9.2 18.2 7.7 18.2C6.2 18.2 5.2 17.2 5.2 15.7C5.2 14.2 6.2 13.2 7.7 13.2C8.2 13.2 8.7 13.4 9.2 13.7V10.7C8.7 10.4 8.2 10.2 7.7 10.2C4.7 10.2 2.2 12.7 2.2 15.7C2.2 18.7 4.7 21.2 7.7 21.2C10.7 21.2 13.2 18.7 13.2 15.7V10.2C14.2 11.2 15.7 11.7 17.2 11.7V8.7H16.7Z"
      fill="#FE2C55"
    />
    <path
      d="M16.3 8.3C16.3 8.3 14.8 8.3 13.8 7.3C12.8 6.3 12.8 4.8 12.8 4.8H9.8V15.3C9.8 16.8 8.8 17.8 7.3 17.8C5.8 17.8 4.8 16.8 4.8 15.3C4.8 13.8 5.8 12.8 7.3 12.8C7.8 12.8 8.3 13 8.8 13.3V10.3C8.3 10 7.8 9.8 7.3 9.8C4.3 9.8 1.8 12.3 1.8 15.3C1.8 18.3 4.3 20.8 7.3 20.8C10.3 20.8 12.8 18.3 12.8 15.3V9.8C13.8 10.8 15.3 11.3 16.8 11.3V8.3H16.3Z"
      fill="#25F4EE"
    />
  </svg>
);

// --- 2. Data Structure ---
interface AppUsageItem {
  id: string;
  name: string;
  time: string;
  percentage: number; // Added percentage for the bar
  icon: React.ReactNode;
}

const mostUsedAppsData: AppUsageItem[] = [
  {
    id: "1",
    name: "WhatsApp",
    time: "1hr 20min",
    percentage: 75,
    icon: <WhatsAppIcon className="h-full w-full" />,
  },
  {
    id: "2",
    name: "Instagram",
    time: "45min",
    percentage: 50,
    icon: <InstagramIcon className="h-full w-full" />,
  },
  {
    id: "3",
    name: "TikTok",
    time: "30min",
    percentage: 30,
    icon: <TikTokIcon className="h-full w-full" />,
  },
];

// --- 3. Main Component ---
export function MostUsedAppsCard() {
  return (
    // The outer Card uses the #F7F7F7 background defined in your custom component
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col gap-3">
        {mostUsedAppsData.map((app) => (
          <div
            key={app.id}
            // Each item is a white "pill" sitting on the grey card background
            className="flex items-center justify-between rounded-2xl border border-transparent p-3 transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Icon Container: White square box for the icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-100 p-1">
                {app.icon}
              </div>

              {/* Text Info */}
              <div className="flex w-full flex-col">
                <span className="gap-1.5 text-[16px] font-semibold text-[#212529]">{app.name}</span>
                <div className="flex w-full items-center gap-2">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#D0D5DD]">
                    <div
                      className="h-full rounded-full bg-[#1B3C73] transition-all duration-500"
                      style={{ width: `${app.percentage}%` }}
                    />
                  </div>
                  <div className="w-[200px] text-sm font-semibold text-[#D0D5DD]">{app.time}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
