import { Button } from "@/shared/ui/button";
import { FilledUserIcon } from "@/shared/ui/icons";
import { cn } from "@/lib/utils";
import { Edit2, QrCode } from "lucide-react";
import { IChildProfile } from "@/features/onboarding/types";

interface ChildProfileCardProps {
  id?: string;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE";
  image?: string;
  status?: "active" | "inactive";
  onEdit?: (data: IChildProfile) => void;
  onViewQR?: () => void;
  className?: string;
}

export function ChildProfileCard({
  id,
  name,
  age,
  gender,
  image,
  status,
  onEdit,
  onViewQR,
  className,
}: ChildProfileCardProps) {
  const relation = gender === "MALE" ? "Son" : "Daughter";

  return (
    <div
      className={cn(
        "bg-primary relative overflow-hidden rounded-2xl px-6 py-8 text-white shadow-sm",
        className
      )}
    >
      {/* Topographic Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-10 20 Q 20 10, 50 30 T 110 20 M-10 40 Q 30 30, 60 50 T 110 40 M-10 60 Q 20 50, 50 70 T 110 60 M-10 80 Q 30 70, 60 90 T 110 80"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-white">
            {image ? (
              <img src={image} alt={name} className="h-full w-full object-cover" />
            ) : (
              <FilledUserIcon className="text-primary h-6 w-6" />
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium tracking-tight">{name}</h3>
            <p className="text-sm font-medium text-blue-100/80">
              {relation}, {age}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 text-white hover:bg-white/10"
            onClick={onViewQR}
          >
            <QrCode className="h-10! w-10! stroke-[1.5]" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 rounded-full bg-white/40 text-white hover:bg-white/30"
            onClick={() => onEdit?.({ id, name, age, gender, image, status })}
          >
            <Edit2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
