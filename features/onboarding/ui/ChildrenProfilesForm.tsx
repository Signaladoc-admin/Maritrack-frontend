import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { Plus } from "lucide-react";

export default function ChildrenProfilesForm({
  goToPrevStep,
  goToNextStep,
}: {
  goToPrevStep: () => void;
  goToNextStep: () => void;
}) {
  // Validation here
  return (
    <div className="space-y-4">
      <Header title="Create your children's profile" subtitle="Create your children's profile" />
      <button className="bg-muted/30 hover:bg-muted/50 border-muted-foreground/20 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-8 transition-colors">
        <Plus className="text-primary h-5 w-5" />
        <span className="text-primary font-medium">Add a profile</span>
      </button>
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={goToPrevStep}>
          Back
        </Button>
        <Button className="flex-1" onClick={goToNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
