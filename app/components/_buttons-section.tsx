"use client";

import React, { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { ActionButton } from "@/shared/ui/action-button";
import { Plus } from "lucide-react";
import { Section } from "./_shared";

export function ButtonsSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <AccordionItem value="buttons" className="rounded-xl border px-4">
      <AccordionTrigger className="text-base font-bold">Buttons</AccordionTrigger>
      <AccordionContent className="space-y-8">
        <Section title="Button Variants">
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </Section>

        <Section title="Button Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Section>

        <Section title="Disabled State">
          <div className="flex gap-3">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </Section>

        <Section title="Action Button (with loading)">
          <div className="flex gap-3">
            <ActionButton isLoading={isLoading} onClick={handleLoadingClick}>
              {isLoading ? "Saving..." : "Save Changes"}
            </ActionButton>
            <ActionButton isLoading variant="outline">
              Loading...
            </ActionButton>
          </div>
        </Section>
      </AccordionContent>
    </AccordionItem>
  );
}
