"use client";

import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Calendar1Icon } from "lucide-react";
import React, { useState } from "react";
import { Calendar } from "@/shared/ui/calendar";
import CustomDatePicker from "./date-picker";

const DateDropdown = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2 bg-[#f7f7f7f7] font-bold">
          Today
          <Calendar1Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="start">
        <CustomDatePicker />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateDropdown;
