import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { User } from "lucide-react";
import { CardWrapper } from "./card-wrapper";
import { useUserStore } from "@/shared/stores/user-store";

export default function ChildSwitcher() {
  const { children, selectedChildId, setSelectedChildId } = useUserStore();

  return (
    <CardWrapper variant="default" radius="full" padding="xs" className="w-[180px]">
      <Select value={selectedChildId} onValueChange={setSelectedChildId}>
        <SelectTrigger className="h-10 w-full rounded-full border-none bg-transparent px-2 py-0 shadow-none hover:bg-transparent focus:ring-0">
          <div className="flex items-center gap-2">
            <div className="text-primary flex items-center justify-center rounded-full bg-neutral-200 p-1.5">
              <User className="h-4 w-4 fill-current" />
            </div>
            <SelectValue placeholder="Select child" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <span className="font-medium">All Children</span>
          </SelectItem>
          {children.map((child) => (
            <SelectItem key={child.id} value={child.id}>
              {child.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CardWrapper>
  );
}
