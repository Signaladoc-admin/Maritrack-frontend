import { AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { H1, H2, H3, H4, P, Blockquote } from "@/shared/ui/typography";
import { Section } from "./_shared";

export function TypographySection() {
  return (
    <AccordionItem value="typography" className="rounded-xl border px-4">
      <AccordionTrigger className="text-base font-bold">Typography</AccordionTrigger>
      <AccordionContent className="space-y-6">
        <Section title="Headings">
          <div className="space-y-4">
            <H1>Heading 1</H1>
            <H2>Heading 2</H2>
            <H3>Heading 3</H3>
            <H4>Heading 4</H4>
          </div>
        </Section>
        <Section title="Paragraph">
          <P>
            This is a paragraph element styled with the default typography component. It includes
            proper leading and spacing for readability.
          </P>
        </Section>
        <Section title="Blockquote">
          <Blockquote>
            &ldquo;Your children&rsquo;s safety is our priority.&rdquo; — MariTrack
          </Blockquote>
        </Section>
      </AccordionContent>
    </AccordionItem>
  );
}
