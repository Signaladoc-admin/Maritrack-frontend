import React from "react";
import { Button } from "./button";

interface IconProps {
  action: () => void;
  icon: React.ReactNode;
}

const IconWrapper = ({ action, icon }: IconProps) => {
  return (
    <Button onClick={action} variant="secondary" className="rounded-full">
      {icon}
    </Button>
  );
};

export default IconWrapper;
