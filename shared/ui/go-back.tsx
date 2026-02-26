"use client";

import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackProps {
  label: string;
}

const Back = ({ label }: BackProps) => {
  const router = useRouter();

  return (
    <Button variant="link" className="text-[16px] text-[#667085]" onClick={() => router.back()}>
      <ChevronLeft className="h-4 w-4 text-[#FF736A]" size={16} />
      {label}
    </Button>
  );
};

export default Back;
