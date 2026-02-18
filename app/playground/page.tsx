"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Checkbox } from "@/shared/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Loader } from "@/shared/ui/loader";
import { H1, H2, H3, P } from "@/shared/ui/typography";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { PricingCard } from "@/shared/ui/cards/pricing-card";
import { StatsCard } from "@/shared/ui/cards/stats-card";
import { ChildrenProfileCard } from "@/shared/ui/cards/child-profile-card";
import { QRCodeCard } from "@/shared/ui/cards/qr-code-card";
import { CreditCard, TrendingUp } from "lucide-react";

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto space-y-10 py-10">
      <H1>Component Playground</H1>

      <section className="space-y-4">
        <H2>Typography & Buttons</H2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="space-y-4">
        <H2>Inputs & Forms</H2>
        <div className="grid max-w-sm gap-4">
          {/* @ts-ignore */}
          <Input label="Email" placeholder="example@email.com" />
          {/* @ts-ignore */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          {/* @ts-ignore */}
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>

          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div>
          </RadioGroup>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-4">
        <H2>Cards</H2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CardWrapper
            header={<H3>Generic Card</H3>}
            footer={<P className="text-sm">Footer content</P>}
          >
            <P>This is a standard card wrapper with generic content.</P>
          </CardWrapper>

          <StatsCard
            label="Total Revenue"
            value="$45,231.89"
            icon={CreditCard}
            trend={{ value: 20.1, positive: true }}
            description="from last month"
          />

          <ChildrenProfileCard name="Alice Doe" age={8} status="active" />

          <PricingCard
            planName="Pro"
            price="$29"
            description="For growing teams"
            features={[
              { text: "Unlimited projects", included: true },
              { text: "Analytics", included: true },
              { text: "24/7 Support", included: false },
            ]}
            popular
          />
        </div>

        <div className="max-w-sm">
          <QRCodeCard qrCodeValue="example" />
        </div>
      </section>

      <section className="space-y-4">
        <H2>Loaders</H2>
        <div className="flex gap-4">
          <Loader size="sm" />
          <Loader />
          <Loader size="lg" />
        </div>
      </section>
    </div>
  );
}
