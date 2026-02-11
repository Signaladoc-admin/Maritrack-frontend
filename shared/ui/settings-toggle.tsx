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
}

export function SettingsToggle({
  label,
  description,
  id,
  checked,
  onCheckedChange,
  className,
}: SettingsToggleProps) {
  return (
    <div className={cn("flex items-center justify-between space-x-2", className)}>
      <div className="space-y-0.5">
        <Label htmlFor={id} className="text-base">
          {label}
        </Label>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
