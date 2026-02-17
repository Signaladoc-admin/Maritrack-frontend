import { genderOptions } from "@/lib/constants/shared";
import { Button } from "@/shared/ui/button";
import { FilledUserIcon } from "@/shared/ui/icons";
import { FileUpload } from "@/shared/ui/image-upload";
import { InputGroup } from "@/shared/ui/input-group";
import { Header } from "@/shared/ui/layout/header";
import React, { useState } from "react";

export default function BasicInformationForm({ goToNextStep }: { goToNextStep: () => void }) {
  const [avatar, setAvatar] = useState<File | null>(null);
  // Validation here
  return (
    <div className="space-y-4">
      <Header title="Hi Grace, Tell us about you" subtitle="Give us more information about you" />
      <div className="space-y-7">
        <FileUpload
          value={avatar}
          onChange={setAvatar}
          accept="image/*"
          className="h-24 w-24 rounded-full"
          previewClassName="h-full w-full rounded-full object-cover"
        >
          <div className="bg-muted flex h-full w-full items-center justify-center rounded-full border-gray-300 transition-colors hover:bg-gray-200">
            <FilledUserIcon className="h-12 w-12 text-[#1b3c73]" />
          </div>
        </FileUpload>
        <InputGroup options={genderOptions} type="select" label="Gender" />
        <InputGroup label="Full Name" placeholder="John Doe" />
        <InputGroup label="Email Address" placeholder="" />
        <InputGroup label="Phone Number" placeholder="1234567890" />
        <Button className="w-full" onClick={goToNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
