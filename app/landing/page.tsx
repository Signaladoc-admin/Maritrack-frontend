import type { Metadata } from "next";
import Landing from "@/views/Landing";

export const metadata: Metadata = {
  title: "Flentra — Smart Parental Controls & Business MDM",
  description:
    "Flentra is an all-in-one platform for parents and organisations who need intelligent device management and digital safety. For families, Flentra provides powerful parental controls that let you monitor screen time, restrict harmful content, track app usage, receive safety alerts, and manage all your children's devices from a single dashboard. For businesses, Flentra delivers a full Mobile Device Management (MDM) solution — enrol company devices, enforce security policies, track assets, manage staff access, and maintain compliance across your entire fleet. Sign up today and take control of every connected device.",
};

export default function LandingPage() {
  return <Landing />;
}
