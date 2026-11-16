"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/shared/theme/ThemeProvider";
import { cn } from "@/shared/lib/utils";

interface ThemeToggleProps {
  variant?: "pill" | "icon" | "menu";
  className?: string;
}

export function ThemeToggle({ variant = "pill", className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : true;

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "flex w-full items-center justify-between rounded-md p-3 text-foreground transition-colors hover:bg-card-hover text-left cursor-pointer border-none bg-transparent outline-none",
          className
        )}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-card-fill text-foreground">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </div>
          <span className="text-sm font-semibold">
            {isDark ? "Light Mode" : "Dark Mode"}
          </span>
        </div>
        <span className="rounded-full border border-card-line bg-card-fill px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          {isDark ? "Dark" : "Light"}
        </span>
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg border border-card-line bg-card-fill text-foreground transition-colors hover:border-card-line-strong hover:bg-card-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-border cursor-pointer shadow-none",
          className
        )}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-foreground transition-transform duration-200" />
        ) : (
          <Moon className="h-4 w-4 text-foreground transition-transform duration-200" />
        )}
      </button>
    );
  }

  // Default "pill" variant for topbars
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex items-center gap-2 rounded-full border border-card-line bg-card-fill px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-card-line-strong hover:bg-card-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-border cursor-pointer shadow-none select-none",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <>
          <Sun className="h-3.5 w-3.5 text-accent" />
          <span>Light mode</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-accent" />
          <span>Dark mode</span>
        </>
      )}
    </button>
  );
}
