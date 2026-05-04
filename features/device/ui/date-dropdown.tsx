"use client";

import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Calendar1Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/shared/ui/calendar";
import CustomDatePicker from "./date-picker";

const DateDropdown = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="flex w-full items-center justify-between bg-[#F8F9FA] font-bold md:w-auto"
        >
          Today
          <Calendar1Icon className="h-5 w-5 text-[#1B3C73]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="start">
        <CustomDatePicker />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateDropdown;
