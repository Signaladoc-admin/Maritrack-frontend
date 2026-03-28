import { LuggageIcon, User } from "lucide-react";

export const accountTypes = {
  PERSONAL: {
    label: "A Personal Account",
    description: "Suitable for parent who want to keep track of their childern's app usage",
    path: "/register/personal",
    icon: User,
  },
  BUSINESS: {
    label: "A Business Account",
    description: "Suitable for business who want to keep track of their employees' app usage",
    path: "/register/business",
    icon: LuggageIcon,
  },
};
