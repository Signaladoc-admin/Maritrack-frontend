"use client";

import React, { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { MultiStepForm } from "@/shared/ui/multi-step-form";
import { SettingsToggle } from "@/shared/ui/settings-toggle";
import { Header } from "@/shared/ui/layout/header";
import { Plus } from "lucide-react";
import { Section } from "./_shared";

export function NavigationSection() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 2));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

  const tabs = [
    { value: "tab1", label: "Overview" },
    { value: "tab2", label: "Analytics" },
    { value: "tab3", label: "Settings" },
  ];

  const steps = [
    {
      title: "Basic Information",
      component: (
        <div className="space-y-4">
          <Header title="Step 1" subtitle="Enter basic info" />
          <InputGroup label="Full Name" placeholder="John Doe" />
          <Button className="w-full" onClick={nextStep}>
            Next
          </Button>
        </div>
      ),
    },
    {
      title: "Children Profiles",
      component: (
        <div className="space-y-4">
          <Header title="Step 2" subtitle="Add children" />
          <button className="bg-muted/30 hover:bg-muted/50 border-muted-foreground/20 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-8 transition-colors">
            <Plus className="text-primary h-5 w-5" />
            <span className="text-primary font-medium">Add a profile</span>
          </button>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={prevStep}>
              Back
            </Button>
            <Button className="flex-1" onClick={nextStep}>
              Next
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Parental Control & Consent Setup",
      component: (
        <div className="space-y-4">
          <Header title="Step 3" subtitle="Set up permissions" />
          <SettingsToggle label="Screen time duration" checked id="demo-st" />
          <SettingsToggle label="App usage" id="demo-app" />
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={prevStep}>
              Back
            </Button>
            <Button className="flex-1" onClick={() => alert("Done!")}>
              Finish
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <AccordionItem value="navigation" className="rounded-xl border px-4">
      <AccordionTrigger className="text-base font-bold">Navigation</AccordionTrigger>
      <AccordionContent className="space-y-8">
        <Section title="Tab Navigation">
          <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            Active tab: <strong>{activeTab}</strong>
          </div>
        </Section>

        <Section title="Multi-Step Form with Vertical Stepper">
          <MultiStepForm steps={steps} currentStep={currentStep} />
        </Section>
      </AccordionContent>
    </AccordionItem>
  );
}
