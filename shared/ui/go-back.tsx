"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUIStore } from "../stores/ui.store";
import { useIsMobile } from "../hooks/use-mobile";

interface BackProps {
  label: string;
  href?: string;
}

const Back = ({ label, href }: BackProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { setMobileBack } = useUIStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isMobile && mounted) {
      setMobileBack(label, href);
      return () => setMobileBack(null);
    }
  }, [isMobile, label, href, setMobileBack, mounted]);

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="dd-back-link mb-4 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]"
        onClick={handleClick}
      >
        <ChevronLeft className="h-4 w-4" />
        {label}
      </button>
    );
  }

  if (isMobile) return null;

  return (
    <button
      type="button"
      className="dd-back-link mb-4 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[var(--text-2)] transition-colors hover:text-[var(--text-1)]"
      onClick={handleClick}
    >
      <ChevronLeft className="h-4 w-4" />
      {label}
    </button>
  );
};

export default Back;
