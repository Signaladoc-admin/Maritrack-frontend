"use client";

import React, { useState, useCallback } from "react";
import { Accordion } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { H1, P } from "@/shared/ui/typography";
import { Search, ChevronsUpDown } from "lucide-react";

import { InputsSection } from "./_inputs-section";
import { ButtonsSection } from "./_buttons-section";
import { TypographySection } from "./_typography-section";
import { NavigationSection } from "./_navigation-section";
import { FeedbackSection } from "./_feedback-section";
import { CardsSection } from "./_cards-section";
import { DashboardSection } from "./_dashboard-section";

const ALL_SECTIONS = [
  "inputs",
  "buttons",
  "typography",
  "navigation",
  "feedback",
  "cards",
  "dashboard",
];

export default function Components() {
  const [openSections, setOpenSections] = useState<string[]>(["inputs"]);
  const [searchQuery, setSearchQuery] = useState("");

  const allExpanded = openSections.length === ALL_SECTIONS.length;

  const toggleAll = useCallback(() => {
    setOpenSections(allExpanded ? [] : [...ALL_SECTIONS]);
  }, [allExpanded]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        setOpenSections([...ALL_SECTIONS]);
        setTimeout(() => {
          (window as any).find(searchQuery);
        }, 300);
      }
    },
    [searchQuery]
  );

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <H1 className="mb-2">Component Library</H1>
      <P className="text-muted-foreground mb-6">
        Browse all available UI components organized by category.
      </P>

      {/* Search & Toggle Row */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a component..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-4 pl-10 text-sm transition-colors outline-none placeholder:text-slate-400 focus:border-[#1b3c73] focus:ring-1 focus:ring-[#1b3c73]"
          />
        </form>
        <Button variant="outline" size="sm" onClick={toggleAll} className="shrink-0 gap-1.5">
          <ChevronsUpDown className="h-4 w-4" />
          {allExpanded ? "Collapse All" : "Expand All"}
        </Button>
      </div>

      <Accordion
        type="multiple"
        className="w-full space-y-2"
        value={openSections}
        onValueChange={setOpenSections}
      >
        <InputsSection />
        <ButtonsSection />
        <TypographySection />
        <NavigationSection />
        <FeedbackSection />
        <CardsSection />
        <DashboardSection />
      </Accordion>
    </div>
  );
}
