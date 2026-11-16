import { Button } from "@/shared/ui/button";
import { FilledUserIcon } from "@/shared/ui/icons";
import { cn, getInitials } from "@/shared/lib/utils";
import { Edit2, QrCode } from "lucide-react";
import { IChildProfile } from "@/features/onboarding/personal/types";
import { Skeleton } from "@/shared/ui/skeleton";

interface ChildProfileCardProps {
  id?: string;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE";
  imageUrl?: string;
  status?: "active" | "inactive";
  onEdit?: (data: IChildProfile) => void;
  onViewQR?: () => void;
  className?: string;
  showActions?: boolean;
}

export function ChildProfileCardSkeleton() {
  return (
    <div className="surface relative overflow-hidden rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] px-5 py-4">
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 shrink-0 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3.5 w-20" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ChildProfileCard({
  id,
  name,
  age,
  gender,
  imageUrl,
  status,
  onEdit,
  onViewQR,
  className,
  showActions = true,
}: ChildProfileCardProps) {
  const relation = gender === "MALE" ? "Son" : "Daughter";

  return (
    <div
      className={cn(
        "surface relative overflow-hidden rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] px-5 py-4 text-left text-[var(--text-1)] shadow-none",
        className
      )}
    >
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--card-line)] bg-[var(--surface)] text-sm font-bold text-[var(--accent)]">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
            ) : (
              getInitials(name)
            )}
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold tracking-tight text-[var(--text-1)]">{name}</h3>
            <p className="text-xs font-medium text-[var(--text-3)]">
              {relation}
              {age ? `, ${age} years old` : ""}
            </p>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center gap-2">
            {onViewQR && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 cursor-pointer text-[var(--text-2)] hover:bg-[var(--card-hover)] hover:text-[var(--text-1)]"
                onClick={onViewQR}
                title="View QR Code"
              >
                <QrCode className="h-4 w-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 cursor-pointer text-[var(--text-2)] hover:bg-[var(--card-hover)] hover:text-[var(--text-1)]"
                onClick={() => onEdit?.({ id, name, age, gender, imageUrl, status })}
                title="Edit profile"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
