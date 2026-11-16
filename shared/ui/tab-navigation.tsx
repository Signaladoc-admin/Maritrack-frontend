import { cn } from "@/shared/lib/utils";
import { CardWrapper } from "@/shared/ui/card-wrapper";

interface TabNavigationProps {
  tabs: { label: string | React.ReactNode; value: string }[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
  itemClassName?: string;
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  className,
  itemClassName,
}: TabNavigationProps) {
  return (
    <CardWrapper
      variant="default"
      padding="none"
      radius="full"
      className={cn(
        "hide-scrollbar flex items-center overflow-x-auto border border-[var(--card-line)] bg-[var(--card-fill)] p-1",
        className
      )}
    >
      <div className="flex w-full items-center justify-between whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "cursor-pointer rounded-full px-6 py-2 text-sm font-medium transition-all",
              itemClassName,
              activeTab === tab.value
                ? "bg-[var(--accent-tint)] font-bold text-[var(--accent)] shadow-xs"
                : "text-[var(--text-2)] hover:text-[var(--text-1)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </CardWrapper>
  );
}
