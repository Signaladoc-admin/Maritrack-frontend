import { cn } from "@/shared/lib/utils";
import { CardWrapper } from "@/shared/ui/card-wrapper";

interface TabNavigationProps {
  tabs: { label: string; value: string }[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
}

export function TabNavigation({ tabs, activeTab, onTabChange, className }: TabNavigationProps) {
  return (
    <CardWrapper
      variant="default"
      padding="none"
      radius="full"
      className={cn("hide-scrollbar flex items-center overflow-x-auto bg-[#F7F7F7] p-1", className)}
    >
      <div className="flex w-full items-center justify-between whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium transition-all",
              activeTab === tab.value
                ? "font-bold text-[#1b3c73]"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </CardWrapper>
  );
}
