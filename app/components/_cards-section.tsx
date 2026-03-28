import { AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Header } from "@/shared/ui/layout/header";
import { Section } from "./_shared";

export function CardsSection() {
  return (
    <AccordionItem value="cards" className="rounded-xl border px-4">
      <AccordionTrigger className="text-base font-bold">Cards & Layout</AccordionTrigger>
      <AccordionContent className="space-y-8">
        <Section title="CardWrapper Variants">
          <div className="grid gap-4 sm:grid-cols-2">
            <CardWrapper variant="default" padding="default">
              <p className="text-sm font-medium">Default Card</p>
              <p className="text-xs text-slate-500">variant=&quot;default&quot;</p>
            </CardWrapper>
            <CardWrapper variant="primary" padding="default">
              <p className="text-sm font-medium">Primary Card</p>
              <p className="text-xs text-slate-300">variant=&quot;primary&quot;</p>
            </CardWrapper>
            <CardWrapper variant="outline" padding="default">
              <p className="text-sm font-medium">Outline Card</p>
              <p className="text-xs text-slate-500">variant=&quot;outline&quot;</p>
            </CardWrapper>
            <CardWrapper variant="destructive" padding="default">
              <p className="text-sm font-medium">Destructive Card</p>
              <p className="text-xs text-red-100">variant=&quot;destructive&quot;</p>
            </CardWrapper>
          </div>
        </Section>

        <Section title="Header Component">
          <div className="overflow-hidden">
            <Header
              title="Hello Janet"
              subtitle="February 10, 2026"
              action={<Button size="sm">Action</Button>}
            />
          </div>
        </Section>
      </AccordionContent>
    </AccordionItem>
  );
}
