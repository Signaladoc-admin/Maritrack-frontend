import { cn } from "@/shared/lib/utils";
import { LucideIcon, User2 } from "lucide-react";
import { useQueryState } from "nuqs";

function EntityListItem({
  id,
  title,
  subtitle,
  description,
  Icon = User2,
}: {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  Icon?: LucideIcon;
}) {
  const [selectedId, setSelectedId] = useQueryState("selectedId", { defaultValue: "" });
  const isSelected = selectedId === id;

  const handleToggle = () => {
    setSelectedId(isSelected ? "" : id);
  };
  return (
    <div
      onClick={handleToggle}
      className={cn(
        "hover:border-primary flex cursor-pointer items-center gap-2 rounded-lg border-[1.5px] border-transparent p-2.5",
        isSelected && "border-primary"
      )}
    >
      <div className="rounded-lg bg-[#eee] p-3">
        <Icon className="text-primary" />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
    </div>
  );
}
export default EntityListItem;
