import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Signal } from "lucide-react";

export default function BasicInfoCard({ title, count }: { title: string; count: string }) {
  return (
    <CardWrapper variant="outline">
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center rounded-full bg-[#f4f7fe] p-3.5">
          <Signal strokeWidth={3} className="text-[#4318ff]" />
        </div>
        <div className="space-y-1 leading-1">
          <p className="text-muted-foreground text-sm">{title}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>
    </CardWrapper>
  );
}
