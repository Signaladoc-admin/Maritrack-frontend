import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { Plus } from "lucide-react";
import { useState } from "react";
import { IChildProfile } from "../types";
import CreateChildProfileForm from "./CreateChildProfileForm";
import { ChildProfileCard } from "@/shared/ui/cards/child-profile-card";
import PricingStep from "./PricingStep";
import PairingQRStep from "./PairingQRStep";

export default function ChildrenProfiles({
  goToPrevStep,
  goToNextStep,
}: {
  goToPrevStep: () => void;
  goToNextStep: () => void;
}) {
  const [childProfiles, setChildProfiles] = useState<IChildProfile[]>([]);

  const [currentView, setCurrentView] = useState<"form" | "list" | "pricing" | "qr">("list");
  const [selectedChildProfile, setSelectedChildProfile] = useState<IChildProfile | null>(null);
  const [pendingChild, setPendingChild] = useState<IChildProfile | null>(null);

  const handleAddChild = (data: IChildProfile) => {
    // Stage the child data but don't add to list yet until QR pairing is done
    setPendingChild({ ...data, id: crypto.randomUUID() });
    setCurrentView("pricing");
  };

  const handleEditChild = (data: IChildProfile) => {
    setChildProfiles((prev) => prev.map((child) => (child.id === data.id ? data : child)));
    setCurrentView("list");
  };

  const handleFinishPairing = () => {
    if (pendingChild) {
      setChildProfiles((prev) => [...prev, pendingChild]);
      setPendingChild(null);
    }
    setCurrentView("list");
  };

  const handleOpenForm = (profile?: IChildProfile) => {
    setSelectedChildProfile(profile || null);
    setCurrentView("form");
  };

  if (currentView === "form") {
    return (
      <CreateChildProfileForm
        onCancel={() => {
          setSelectedChildProfile(null);
          setCurrentView("list");
        }}
        onAddChild={selectedChildProfile ? handleEditChild : handleAddChild}
        initialData={selectedChildProfile || undefined}
        goToNextStep={goToNextStep}
      />
    );
  }

  if (currentView === "pricing") {
    return (
      <PricingStep onBack={() => setCurrentView("form")} onSuccess={() => setCurrentView("qr")} />
    );
  }

  if (currentView === "qr") {
    return (
      <PairingQRStep
        childName={pendingChild?.name || "Child"}
        onBack={() => setCurrentView("pricing")}
        onComplete={handleFinishPairing}
      />
    );
  }

  return (
    <div className="space-y-5">
      <Header title="Create your children's profile" subtitle="Create your children's accounts" />

      <div className="space-y-4">
        {childProfiles.map((childProfile, index) => (
          <ChildProfileCard
            key={childProfile.id || index}
            onEdit={() => handleOpenForm(childProfile)}
            onViewQR={() => {
              setPendingChild(childProfile);
              setCurrentView("qr");
            }}
            {...childProfile}
          />
        ))}
      </div>

      <button
        onClick={() => handleOpenForm()}
        className="border-muted-foreground/20 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed bg-neutral-50/50 py-12 transition-colors hover:bg-neutral-100/50"
      >
        <Plus className="text-primary/70 h-5 w-5" />
        <span className="font-medium text-slate-500">Add a profile</span>
      </button>

      <div className="flex gap-4 pt-4">
        <Button
          variant="secondary"
          className="flex-1 bg-neutral-100 text-[#1e3a8a] hover:bg-neutral-200"
          onClick={goToPrevStep}
        >
          Previous
        </Button>
        <Button className="flex-1 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90" onClick={goToNextStep}>
          Next
        </Button>
      </div>

      <div className="flex justify-center">
        <Button variant="link" className="font-normal text-slate-500">
          Skip for now
        </Button>
      </div>
    </div>
  );
}
