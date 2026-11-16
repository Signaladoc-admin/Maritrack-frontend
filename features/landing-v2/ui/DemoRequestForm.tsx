"use client";

import { useState, type FormEvent } from "react";
import {
  bookADemoDeviceOptions,
  bookADemoUseOptions,
  homeDemoDeviceOptions,
  homeDemoUseOptions,
} from "@/features/landing-v2/data";
import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";

const DEMO_RECIPIENT_EMAIL = "info@flentra.io";

interface DemoRequestFormProps {
  variant?: "home" | "page";
}

export default function DemoRequestForm({
  variant = "home",
}: DemoRequestFormProps) {
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const useCase = String(formData.get("use") ?? "").trim();
    const devices = String(formData.get("devices") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    const subject = `Demo request from ${name} (${company})`;
    const bodyLines = [
      "Hi Flentra team,",
      "",
      "I would like to book a demo of Flentra. Here are my details:",
      "",
      `Full name: ${name}`,
      `Company: ${company}`,
      `Work email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Use case: ${useCase}`,
      `Number of devices: ${devices}`,
    ];

    if (notes) {
      bodyLines.push("", "Additional notes:", notes);
    }

    bodyLines.push("", "Thanks.");

    const href = `mailto:${DEMO_RECIPIENT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    setMailtoUrl(href);
    window.location.href = href;
  };

  const flexBasis =
    variant === "home" ? "flex-[1_1_460px]" : "flex-[1_1_480px]";

  const labelClassName =
    "flex flex-col gap-[7px] text-[13.5px] font-semibold text-white/80";
  const inputClassName =
    "rounded-md border border-line bg-surface px-3.5 py-[11px] text-[15px] font-normal text-white placeholder:text-text-dim focus:border-cyan focus:outline-none";
  const selectClassName =
    "rounded-md border border-line bg-deep px-3.5 py-[11px] text-[15px] font-normal text-white focus:border-cyan focus:outline-none";

  const useOptions =
    variant === "home" ? homeDemoUseOptions : bookADemoUseOptions;
  const deviceOptions =
    variant === "home" ? homeDemoDeviceOptions : bookADemoDeviceOptions;

  return (
    <form
      aria-label="Book a demo"
      onSubmit={handleSubmit}
      className={`grid min-w-0 ${flexBasis} grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 rounded-lg border border-line bg-surface p-7`}
    >
      <label className={labelClassName}>
        Full name
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          className={inputClassName}
        />
      </label>

      <label className={labelClassName}>
        Company
        <input
          type="text"
          name="company"
          autoComplete="organization"
          required
          className={inputClassName}
        />
      </label>

      <label className={labelClassName}>
        Work email
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          className={inputClassName}
        />
      </label>

      <label className={labelClassName}>
        Phone
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className={inputClassName}
        />
      </label>

      <label className={labelClassName}>
        What do you need Flentra for?
        <select name="use" className={selectClassName}>
          {useOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={labelClassName}>
        Number of devices
        <select name="devices" className={selectClassName}>
          {deviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {variant === "page" ? (
        <label className={`${labelClassName} col-span-full`}>
          Anything else we should know?
          <textarea
            name="notes"
            rows={4}
            className={`${inputClassName} resize-y`}
          />
        </label>
      ) : null}

      <LandingV2Button
        type="submit"
        variant="primary"
        size="block"
        className="col-span-full font-semibold"
      >
        Book my demo
      </LandingV2Button>

      {mailtoUrl ? (
        <p
          role="status"
          className="col-span-full m-0 rounded-md border border-green-border bg-green-tint px-3.5 py-2.5 text-[14px] leading-[1.55] font-medium text-green-light"
        >
          Your email client should open with your demo request addressed to{" "}
          <span className="font-semibold text-white">info@flentra.io</span>. If
          it didn&apos;t open automatically,{" "}
          <a
            href={mailtoUrl}
            className="font-semibold text-cyan underline hover:text-cyan-light"
          >
            click here to send it
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
