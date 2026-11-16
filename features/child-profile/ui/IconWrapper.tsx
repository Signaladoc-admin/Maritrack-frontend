import React from "react";
import { IconProps } from "../model/types";

const IconWrapper = ({ action, icon }: IconProps) => {
  return (
    <button type="button" onClick={action} className="dd-action-btn cursor-pointer">
      {icon}
    </button>
  );
};

export default IconWrapper;
