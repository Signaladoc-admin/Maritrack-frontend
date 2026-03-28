"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { QRCodeCard } from "@/shared/ui/cards/qr-code-card";
import { AlertBox } from "@/shared/ui/dashboard/alert-box";
import { TopWebsites } from "@/shared/ui/dashboard/top-websites";
import { DeviceCard } from "@/shared/ui/dashboard/device-card";
import { BlockedWebsitesModal } from "@/shared/ui/dashboard/blocked-websites-modal";
import { LiveMapCard } from "@/shared/ui/dashboard/live-map-card";
import { AddressCard } from "@/shared/ui/dashboard/address-card";
import { AppsContainer } from "@/app/components/apps-container";
import { AlertCard } from "@/shared/ui/dashboard/alert-card";
import { ActivityTimeline, TimelineItem } from "@/shared/ui/lists/activity-timeline";
import { Button } from "@/shared/ui/button";
import { FaApple } from "react-icons/fa";
import { SiSamsung } from "react-icons/si";
import { Section } from "./_shared";
import { useToast } from "@/shared/ui/toast";

const demoWebsites = [
  { domain: "www.facebook.com", duration: "2h 33mins" },
  { domain: "www.medium.com", duration: "2h 33mins" },
  { domain: "www.stackoverflow.com", duration: "2h 33mins" },
  { domain: "www.web3school.com", duration: "2h 33mins" },
];

export function DashboardSection() {
  const { toast } = useToast();

  return (
    <AccordionItem value="dashboard" className="rounded-xl border px-4">
      <AccordionTrigger className="text-base font-bold">Dashboard</AccordionTrigger>
      <AccordionContent className="space-y-8">
        {/* QR Code Card */}
        <Section title="QR Code Card">
          <div className="flex justify-center">
            <QRCodeCard className="max-w-[260px]" />
          </div>
        </Section>

        {/* Alert Banner */}
        <Section title="Alert Banner">
          <AlertBox
            type="danger"
            title="You have 13 websites blocked"
            message="Solomon will not be able to access these websites, you'll be notified when he tries to"
            onAction={() => {
              toast({
                type: "info",
                title: "Navigation",
                message: "Navigating to Blocked Websites...",
              });
            }}
            actionLabel="Manage websites"
          />
          <div className="mt-3">
            <AlertBox
              type="warning"
              title="Screen time limit almost reached"
              message="Solomon has used 90% of the daily limit"
              onAction={() => {
                toast({
                  type: "info",
                  title: "Limit Settings",
                  message: "Opening limit settings...",
                });
              }}
              actionLabel="Adjust limit"
            />
          </div>
        </Section>

        {/* Top 5 Websites */}
        <Section title="Top 5 Websites">
          <TopWebsites websites={demoWebsites} />
        </Section>

        {/* Activity Timeline */}
        <Section title="Activity Timeline">
          <ActivityTimeline>
            <TimelineItem
              title="Screen time started"
              app="WhatsApp"
              time="3:12 PM"
              statusColor="red"
            />
            <TimelineItem title="Screen time limit exceeded" time="3:12 PM" statusColor="blue" />
            <TimelineItem
              title="Blocked app attempt"
              app="Instagram"
              time="5:02 PM"
              statusColor="red"
            />
            <TimelineItem title="Screen time ended" time="3:12 PM" statusColor="blue" isLast />
          </ActivityTimeline>
        </Section>

        {/* Device Card – Row */}
        <Section title="Device Card (Row)">
          <DeviceCard
            ownerName="Solomon Grundy"
            model="iPhone 14 Pro"
            batteryLevel={70}
            brandIcon={<FaApple className="h-5 w-5 text-[#c5d5f1]" />}
            variant="row"
          />
        </Section>

        {/* Device Card – Column */}
        <Section title="Device Card (Column)">
          <div className="grid justify-center gap-4 md:grid-cols-2">
            <DeviceCard
              ownerName="Solomon Grundy"
              model="iPhone 14 Pro"
              batteryLevel={70}
              brandIcon={<FaApple className="h-5 w-5 text-[#c5d5f1]" />}
              variant="column"
            />
            <DeviceCard
              ownerName="Kuroebi Grundy"
              model="Samsung Galaxy XY"
              batteryLevel={18}
              brandIcon={<SiSamsung className="h-6 w-auto text-white/80" />}
              variant="column"
            />
          </div>
        </Section>

        {/* Blocked Websites Modal */}
        <Section title="Blocked Websites Modal">
          <BlockedWebsitesModal
            trigger={<Button variant="outline">Manage blocked websites</Button>}
          />
        </Section>
        <Section title="Location">
          <div className="grid gap-4 md:grid-cols-2">
            <LiveMapCard className="h-64" />
            <AddressCard address="23 Ebinpejo Lane, Idumota, Lagos" />
          </div>
        </Section>

        <Section title="App Management">
          <AppsContainer />
        </Section>

        <Section title="Alert Cards">
          <div className="grid gap-4 md:grid-cols-2">
            <AlertCard
              mode="attention"
              alerts={[
                { id: "1", type: "warning", message: "Screen time exceeded", source: "Kuroebi" },
                { id: "2", type: "warning", message: "Blocked app attempt", source: "Solomon" },
              ]}
              onAction={() =>
                toast({ type: "info", title: "Reviews", message: "Reviewing alerts..." })
              }
              className="min-h-0"
            />
            <AlertCard
              mode="okay"
              onAction={() =>
                toast({
                  type: "success",
                  title: "System Status",
                  message: "All systems operational!",
                })
              }
              className="min-h-0"
            />
          </div>
        </Section>
      </AccordionContent>
    </AccordionItem>
  );
}
