import { Switch } from "@/shared/ui/switch";
import { Label } from "@/shared/ui/label";
import { cn } from "@/shared/lib/utils";

interface SettingsToggleProps {
  label: string;
  description?: string;
  id: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export function SettingsToggle({
  label,
  description,
  id,
  checked,
  onCheckedChange,
  className,
  error,
  disabled,
}: SettingsToggleProps) {
  return (
    <div
      className={cn("space-y-1", disabled && "pointer-events-none cursor-not-allowed opacity-50")}
    >
      <div className={cn("flex items-center justify-between space-x-2 py-4", className)}>
        <div className="space-y-0.5">
          <Label htmlFor={id} className="cursor-pointer text-base font-medium text-[var(--text-1)]">
            {label}
          </Label>
          {description && <p className="text-sm text-[var(--text-2)]">{description}</p>}
        </div>
        <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
      </div>
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}
