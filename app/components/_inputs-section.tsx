"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  country: z.string().min(1, "Please select a country"),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
  newsletter: z.boolean().optional(),
  role: z.enum(["parent", "guardian", "teacher"]),
  notifications: z.boolean().optional(),
  darkmode: z.boolean().optional(),
  otp: z.string().min(6, "OTP must be 6 digits"),
  avatar: z.any().optional(), // Using detailed validation for files in production would be better
  docFile: z.any().optional(),
  screenTime: z.boolean().optional(),
  locationTracking: z.boolean().optional(),
});

export function InputsSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "",
      terms: false,
      newsletter: true,
      role: "parent",
      notifications: false,
      darkmode: true,
      otp: "",
      screenTime: true,
      locationTracking: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <AccordionItem value="inputs" className="rounded-xl border px-4">
      <AccordionTrigger className="text-base font-bold">Inputs (React Hook Form)</AccordionTrigger>
      <AccordionContent className="space-y-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Section title="Text Input">
            <InputGroup
              label="Full Name"
              placeholder="Enter your full name"
              error={form.formState.errors.fullName?.message}
              {...form.register("fullName")}
            />
          </Section>

          <Section title="Email Input">
            <InputGroup
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={form.formState.errors.email?.message}
              {...form.register("email")}
            />
          </Section>

          <Section title="Password Input">
            <InputGroup
              label="Password"
              type="password"
              placeholder="Enter password"
              error={form.formState.errors.password?.message}
              {...form.register("password")}
            />
          </Section>

          <Section title="Select Dropdown">
            <Controller
              control={form.control}
              name="country"
              render={({ field }) => (
                <InputGroup
                  label="Country"
                  type="select"
                  error={form.formState.errors.country?.message}
                >
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              )}
            />
          </Section>

          <Section title="Checkbox">
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Controller
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
                <Label
                  htmlFor="terms"
                  className={form.formState.errors.terms ? "text-destructive" : ""}
                >
                  Accept terms and conditions
                </Label>
              </div>
              {form.formState.errors.terms && (
                <p className="text-destructive text-sm">{form.formState.errors.terms.message}</p>
              )}

              <div className="flex items-center space-x-2">
                <Controller
                  control={form.control}
                  name="newsletter"
                  render={({ field }) => (
                    <Checkbox
                      id="newsletter"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="newsletter">Subscribe to newsletter</Label>
              </div>
            </div>
          </Section>

          <Section title="Radio Group">
            <Controller
              control={form.control}
              name="role"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parent" id="r1" />
                    <Label htmlFor="r1">Parent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="guardian" id="r2" />
                    <Label htmlFor="r2">Guardian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="r3" />
                    <Label htmlFor="r3">Teacher</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </Section>

          <Section title="Switch Toggle">
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Controller
                  control={form.control}
                  name="notifications"
                  render={({ field }) => (
                    <Switch id="notif" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
                <Label htmlFor="notif">Enable notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  control={form.control}
                  name="darkmode"
                  render={({ field }) => (
                    <Switch id="darkmode" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
                <Label htmlFor="darkmode">Dark mode</Label>
              </div>
            </div>
          </Section>

          <Section title="OTP Input">
            <Controller
              control={form.control}
              name="otp"
              render={({ field }) => (
                <div className="space-y-2">
                  <OTPInput value={field.value} onChange={field.onChange} length={6} />
                  {form.formState.errors.otp && (
                    <p className="text-destructive text-sm">{form.formState.errors.otp.message}</p>
                  )}
                </div>
              )}
            />
          </Section>

          <Section title="File Upload (Image / Avatar)">
            <Controller
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <div className="space-y-2">
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    accept="image/*"
                    className="h-24 w-24 rounded-full"
                    previewClassName="h-full w-full rounded-full object-cover"
                  >
                    <div className="bg-muted flex h-full w-full items-center justify-center rounded-full border-gray-300 transition-colors hover:bg-gray-200">
                      <FilledUserIcon className="h-12 w-12 text-[#1b3c73]" />
                    </div>
                  </FileUpload>
                  {form.formState.errors.avatar && (
                    <p className="text-destructive text-sm">
                      {String(form.formState.errors.avatar.message)}
                    </p>
                  )}
                </div>
              )}
            />
          </Section>

          <Section title="File Upload (Documents)">
            <Controller
              control={form.control}
              name="docFile"
              render={({ field }) => (
                <div className="space-y-2">
                  <FileUpload
                    value={field.value}
                    onChange={field.onChange}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  {form.formState.errors.docFile && (
                    <p className="text-destructive text-sm">
                      {String(form.formState.errors.docFile.message)}
                    </p>
                  )}
                </div>
              )}
            />
          </Section>

          <Section title="Settings Toggle">
            <div className="flex flex-col gap-4">
              <Controller
                control={form.control}
                name="screenTime"
                render={({ field }) => (
                  <SettingsToggle
                    label="Screen time monitoring"
                    description="Track daily screen usage"
                    id="st-demo"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="locationTracking"
                render={({ field }) => (
                  <SettingsToggle
                    label="Location tracking"
                    description="Monitor device location"
                    id="lt-demo"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </Section>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              Submit Form
            </button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
}
