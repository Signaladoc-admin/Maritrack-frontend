import { Button } from "@/shared/ui/button";
import { FilledUserIcon } from "@/shared/ui/icons";
import { cn } from "@/lib/utils";
import { Edit2, QrCode } from "lucide-react";

interface ChildProfileCardProps {
  name: string;
  age: number;
  gender: "male" | "female";
  image?: string;
  status?: "active" | "inactive";
  onEdit?: () => void;
  onViewQR?: () => void;
  className?: string;
}

export function ChildProfileCard({
  name,
  age,
  gender,
  image,
  onEdit,
  onViewQR,
  className,
}: ChildProfileCardProps) {
  const relation = gender === "male" ? "Son" : "Daughter";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-[#1e3a8a] px-5 py-7 text-white shadow-md",
        className
      )}
    >
      {/* Background Pattern - subtle waves */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 50 C 20 40 40 60 60 50 C 80 40 100 60 120 50 V 100 H 0 Z" fill="white" />
          <path d="M0 70 C 20 60 40 80 60 70 C 80 60 100 80 120 70 V 100 H 0 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
            {image ? (
              <img src={image} alt={name} className="h-full w-full object-cover" />
            ) : (
              <FilledUserIcon className="h-6 w-6 text-[#1e3a8a]" />
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-blue-100">
              {relation}, {age}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            className="h-14 w-14 text-white hover:bg-white/20 hover:text-white [&_svg]:size-8!"
            onClick={onViewQR}
          >
            <QrCode className="h-8! w-8!" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
            onClick={onEdit}
          >
            <Edit2 className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
