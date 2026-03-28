import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react"; // Optional: for loading spinner
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        // Primary: #1B3C73
        default: "bg-[#1B3C73] text-white hover:bg-[#1B3C73]/90",

        // Danger: #D95D55
        destructive: "bg-[#D95D55] text-white hover:bg-[#D95D55]/90",

        // Neutral: #EEEEEE
        secondary: "bg-[#EEEEEE] text-[#667085] hover:bg-[#EEEEEE]/80",

        link: "text-[#1B3C73] underline-offset-4 hover:underline",

        white: "text-[#1B3C73] bg-[#ffffff] hover:bg-[#ffffff]/80",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8", // Good for Login
        icon: "h-9 w-9", // Good for Edit/Pencil buttons
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {!isLoading && children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
