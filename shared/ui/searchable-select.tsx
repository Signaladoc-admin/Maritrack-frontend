"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface SearchableSelectProps {
  options: { label: string; value: string }[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  isSearchable?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function SearchableSelect({
  options = [],
  value,
  onValueChange,
  placeholder = "Select an option",
  isSearchable = false,
  disabled = false,
  className,
  id,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const listRef = React.useRef<HTMLDivElement>(null);

  const filteredOptions = React.useMemo(() => {
    if (!isSearchable || !searchQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, isSearchable, searchQuery]);

  const selectedOption = options.find((opt) => opt.value === value);

  // Reset highlight when search results change
  React.useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredOptions]);

  // Scroll highlighted item into view
  React.useEffect(() => {
    if (highlightedIndex < 0 || !listRef.current) return;
    const item = listRef.current.children[highlightedIndex] as HTMLElement;
    item?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          onValueChange(filteredOptions[highlightedIndex].value);
          setOpen(false);
          setSearchQuery("");
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          onKeyDown={!isSearchable ? handleKeyDown : undefined}
          className={cn(
            "ring-offset-background flex h-[50px] w-full items-center rounded-xl border border-[#E5E7EB] bg-[#fafafa] px-4 text-base transition-colors focus-within:ring-[1.5px] focus-within:ring-[#1b3c73] focus-within:ring-offset-0 focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
        >
          <span className="w-full truncate text-left">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        {isSearchable && (
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
        <div ref={listRef} className="max-h-60 overflow-y-auto p-1">
          {filteredOptions.length === 0 ? (
            <p className="p-2 text-center text-sm text-slate-500">No options found.</p>
          ) : (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                className={cn(
                  "relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm select-none",
                  value === option.value && "bg-slate-50 font-medium text-[#1b3c73]",
                  highlightedIndex === index ? "bg-slate-100" : "hover:bg-slate-100"
                )}
                onClick={() => handleSelect(option.value)}
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  {value === option.value && <Check className="h-4 w-4" />}
                </span>
                {option.label}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
