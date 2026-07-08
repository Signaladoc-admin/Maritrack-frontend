import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const badgeVariants = cva("rounded-lg px-3 py-2 text-xs font-medium", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "bg-outline text-outline-foreground",
      success: "bg-green-500/10 text-green-500",
    },
  },
});

export default function Badge({
  content,
  variant = "primary",
}: {
  content: string | ReactNode;
  variant?: VariantProps<typeof badgeVariants>["variant"];
}) {
  return <div className={badgeVariants({ variant })}>{content}</div>;
}
