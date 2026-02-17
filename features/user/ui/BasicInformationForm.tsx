import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { Header } from "@/shared/ui/layout/header";
import React from "react";

export default function BasicInformationForm({ goToNextStep }: { goToNextStep: () => void }) {
  // Validation here
  return (
    <div className="space-y-4">
      <Header title="Step 1" subtitle="Enter basic info" />
      <InputGroup label="Full Name" placeholder="John Doe" />
      <Button className="w-full" onClick={goToNextStep}>
        Next
      </Button>
    </div>
  );
}
