import React from "react";
import { Button } from "@/shared/ui/Button/button";
import { IconProps } from "../types";

const IconWrapper = ({ action, icon }: IconProps) => {
  return (
    <Button onClick={action} variant="secondary" className="h-15 w-15 cursor-pointer rounded-full">
      {icon}
    </Button>
  );
};

export default IconWrapper;
