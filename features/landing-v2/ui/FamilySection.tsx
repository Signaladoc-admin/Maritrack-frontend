"use client";

import { useState, type FormEvent } from "react";
import {
  familyFeatureCards,
  familySampleDevices,
} from "@/features/landing-v2/data";
import LandingV2Badge from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";

export default function FamilySection() {
  const [earlyAccessSubmitted, setEarlyAccessSubmitted] = useState(false);

  const handleEarlyAccess = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEarlyAccessSubmitted(true);
  };

  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[{ label: "Flentra for Family" }]}
        badge={{ label: "Flentra for Family", tone: "green" }}
        title="Peace of mind for every device in your home."
        description="Find a lost phone, lock it if it’s stolen, and know your family got home safely, with everyone in the family aware and agreeing to how it’s used."
        actionSlot={
          <form
            aria-label="Get early access"
            onSubmit={handleEarlyAccess}
            className="flex flex-wrap gap-2.5 pt-1.5"
          >
            <label className="flex min-w-0 flex-[1_1_260px] flex-col gap-1.5 text-[13.5px] font-semibold text-text-soft">
              Email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className="rounded-sm border border-line bg-surface px-3.5 py-3 text-[15px] font-normal text-white placeholder:text-text-dim focus:border-cyan focus:outline-none"
              />
            </label>

            <LandingV2Button
              type="submit"
              variant="primary"
              size="md"
              className="self-end"
            >
              Get early access
            </LandingV2Button>

            {earlyAccessSubmitted ? (
              <p
                role="status"
                className="m-0 basis-full text-[14px] font-medium text-green-light"
              >
                Thanks! We’ve added your email to the Flentra for Family early
                access list.
              </p>
            ) : null}
          </form>
        }
        aside={
          <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-2.5 rounded-lg border border-line bg-surface p-5">
            <div className="flex items-center justify-between">
              <p className="m-0 font-bold text-white">Our family</p>
              <LandingV2Badge tone="muted" size="xs" bordered>
                Sample screen
              </LandingV2Badge>
            </div>

            {familySampleDevices.map((device) => {
              const isLocked = device.variant === "locked";
              return (
                <div
                  key={device.name}
                  className={`flex items-center justify-between rounded-md border p-3.5 ${
                    isLocked
                      ? "border-coral-border bg-coral-tint"
                      : "border-line"
                  }`}
                >
                  <span className="flex flex-col gap-0.5">
                    <b className="font-semibold text-white">{device.name}</b>
                    <span
                      className={`text-[12.5px] ${
                        isLocked ? "text-text-soft" : "text-text-dim"
                      }`}
                    >
                      {device.subtitle}
                    </span>
                  </span>

                  {isLocked ? (
                    <span className="inline-flex items-center gap-1.5 rounded-badge bg-[#FF6857] px-[11px] py-[5px] text-[11.5px] font-bold text-navy">
                      {device.status}
                    </span>
                  ) : (
                    <LandingV2Badge
                      tone="green"
                      size="xs"
                      className="px-[11px] py-[5px]"
                    >
                      {device.status}
                    </LandingV2Badge>
                  )}
                </div>
              );
            })}
          </div>
        }
      />

      <LandingV2FeatureGridSection
        title="What Flentra for Family does"
        background="deep"
        cardSurface="navy"
        items={familyFeatureCards}
      >
        <div className="flex items-start gap-3.5 rounded-md border border-cyan-border bg-navy px-[22px] py-5">
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#05E0E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0"
          >
            <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
          </svg>
          <p className="m-0 text-[15.5px] leading-[1.6] text-text-nav">
            <b className="font-bold text-white">Open by design.</b> Every
            family member can see that Flentra is on their device and what it
            shares. Flentra for Family is for keeping your own household’s
            devices safe, not for monitoring anyone without their knowledge.
          </p>
        </div>
      </LandingV2FeatureGridSection>
    </>
  );
}
