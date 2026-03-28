"use client";

import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { useUIStore } from "../stores/ui-store";
import { useIsMobile } from "../hooks/use-mobile";

interface BackProps {
  label: string;
  href?: string; // Optional specific href to go back to
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

  if (!mounted)
    return (
      <Button
        variant="link"
        className="px-0 text-[16px] text-[#667085]"
        onClick={() => (href ? router.push(href) : router.back())}
      >
        <ChevronLeft className="h-4 w-4 text-[#FF736A]" size={16} />
        {label}
      </Button>
    );

  if (isMobile) return null;

  return (
    <Button
      variant="link"
      className="px-0 text-[16px] text-[#667085]"
      onClick={() => (href ? router.push(href) : router.back())}
    >
      <ChevronLeft className="h-4 w-4 text-[#FF736A]" size={16} />
      {label}
    </Button>
  );
};

export default Back;
