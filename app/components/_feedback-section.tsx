import { AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { Loader } from "@/shared/ui/loader";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/shared/ui/dialog";
import { Section } from "./_shared";
import { useToast } from "@/shared/ui/toast";

export function FeedbackSection() {
  return (
    <AccordionItem value="feedback" className="rounded-xl border px-4">
      <AccordionTrigger className="text-base font-bold">Feedback & Overlays</AccordionTrigger>
      <AccordionContent className="space-y-8">
        <Section title="Loader">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <Loader size="sm" />
              <span className="mt-1 block text-xs text-slate-500">Small</span>
            </div>
            <div className="text-center">
              <Loader size="default" />
              <span className="mt-1 block text-xs text-slate-500">Default</span>
            </div>
            <div className="text-center">
              <Loader size="lg" />
              <span className="mt-1 block text-xs text-slate-500">Large</span>
            </div>
          </div>
        </Section>

        <Section title="Dialog / Modal">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>
                  Are you sure you want to proceed? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Toast Notifications">
          <ToastDemo />
        </Section>
      </AccordionContent>
    </AccordionItem>
  );
}

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast({
            type: "success",
            title: "Success",
            message: "Your changes have been saved successfully.",
          })
        }
      >
        Show Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            type: "error",
            title: "Error",
            message: "Something went wrong. Please try again.",
          })
        }
      >
        Show Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            type: "warning",
            title: "Warning",
            message: "Your account is about to expire.",
          })
        }
      >
        Show Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            type: "info",
            title: "Info",
            message: "New features are available.",
          })
        }
      >
        Show Info
      </Button>
    </div>
  );
}
