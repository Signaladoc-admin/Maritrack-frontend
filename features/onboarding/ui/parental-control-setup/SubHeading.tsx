import { H5, P } from "@/shared/ui/typography";

export default function SubHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-1">
      <H5 className="text-primary">{title}</H5>
      {subtitle && <P className="text-sm font-normal text-slate-600">{subtitle}</P>}
    </div>
  );
}
