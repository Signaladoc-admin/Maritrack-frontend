import { Edit, User } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { H4, P } from "@/shared/ui/typography";
import { cn } from "@/shared/lib/utils";

interface ChildrenProfileCardProps {
  name: string;
  age: number;
  imageUrl?: string; // In real app, this would be an image URL
  status: "active" | "inactive" | "pending";
  onEdit?: () => void;
}

export function ChildrenProfileCard({
  name,
  age,
  imageUrl,
  status,
  onEdit,
}: ChildrenProfileCardProps) {
  return (
    <CardWrapper padding="sm" className="flex items-center gap-4">
      <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={name} className="h-full w-full rounded-full object-cover" />
        ) : (
          <User className="text-muted-foreground h-8 w-8" />
        )}
      </div>
      <div className="flex-1">
        <H4 className="text-lg">{name}</H4>
        <P className="text-muted-foreground mt-1 text-sm">{age} years old</P>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span
          className={cn("rounded-full px-2 py-0.5 text-xs font-medium capitalize", {
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400":
              status === "active",
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": status === "inactive",
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400":
              status === "pending",
          })}
        >
          {status}
        </span>
        {onEdit && (
          <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </div>
    </CardWrapper>
  );
}
