"use client";

import React, { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { InputGroup } from "@/shared/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Checkbox } from "@/shared/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Switch } from "@/shared/ui/switch";
import { OTPInput } from "@/shared/ui/otp-input";
import { FileUpload } from "@/shared/ui/image-upload";
import { SettingsToggle } from "@/shared/ui/settings-toggle";
import { Label } from "@/shared/ui/label";
import { FilledUserIcon } from "@/shared/ui/icons";
import { Section } from "./_shared";

export function InputsSection() {
  const [otp, setOtp] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);

  return (
    <AccordionItem value="inputs" className="rounded-xl border px-4">
      <AccordionTrigger className="text-base font-bold">Inputs</AccordionTrigger>
      <AccordionContent className="space-y-8">
        <Section title="Text Input">
          <InputGroup label="Full Name" placeholder="Enter your full name" />
        </Section>

        <Section title="Email Input">
          <InputGroup label="Email Address" type="email" placeholder="you@example.com" />
        </Section>

        <Section title="Password Input">
          <InputGroup label="Password" type="password" placeholder="Enter password" />
        </Section>

        <Section title="Select Dropdown">
          <InputGroup label="Country" type="select">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ng">Nigeria</SelectItem>
                <SelectItem value="gh">Ghana</SelectItem>
                <SelectItem value="ke">Kenya</SelectItem>
                <SelectItem value="za">South Africa</SelectItem>
              </SelectContent>
            </Select>
          </InputGroup>
        </Section>

        <Section title="Checkbox">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" defaultChecked />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
        </Section>

        <Section title="Radio Group">
          <RadioGroup defaultValue="option1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="r1" />
              <Label htmlFor="r1">Parent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="r2" />
              <Label htmlFor="r2">Guardian</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="r3" />
              <Label htmlFor="r3">Teacher</Label>
            </div>
          </RadioGroup>
        </Section>

        <Section title="Switch Toggle">
          <div className="flex items-center space-x-2">
            <Switch id="notif" />
            <Label htmlFor="notif">Enable notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="darkmode" defaultChecked />
            <Label htmlFor="darkmode">Dark mode</Label>
          </div>
        </Section>

        <Section title="OTP Input">
          <OTPInput value={otp} onChange={setOtp} length={6} />
        </Section>

        <Section title="File Upload (Image / Avatar)">
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
        </Section>

        <Section title="File Upload (Documents)">
          <FileUpload value={docFile} onChange={setDocFile} accept=".pdf,.doc,.docx,.txt" />
        </Section>

        <Section title="Settings Toggle">
          <SettingsToggle
            label="Screen time monitoring"
            description="Track daily screen usage"
            id="st-demo"
            checked
          />
          <SettingsToggle
            label="Location tracking"
            description="Monitor device location"
            id="lt-demo"
          />
        </Section>
      </AccordionContent>
    </AccordionItem>
  );
}
