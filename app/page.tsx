"use client";

import { Button } from "@/shared/ui/Button/button";
import { useState } from "react";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { AccountTypeModal } from "@/shared/ui/Modal/Modals/AccountTypeSelectionModal";
import { EditChildModal } from "@/shared/ui/Modal/Modals/ChildDetailsModal";
import { BlockedWebsitesModal } from "@/shared/ui/Modal/Modals/BlockedWebsitesModal";
import { GeofencingModal } from "@/shared/ui/Modal/Modals/GeofencingModal";
import { SetTimeLimitModal } from "@/shared/ui/Modal/Modals/TimeLimitModal";
import { PairDeviceModal } from "@/shared/ui/Modal/Modals/PairDeviceModal";
import { LoaderModal } from "@/shared/ui/Modal/Modals/LoaderModal";
import { PricingCard, PricingFeatureItem } from "@/shared/ui/PricingCard/PricingCard";
import { DeviceUsageCard } from "@/shared/ui/DeviceStatusCard/DeviceStatusCard";
import { UserSelect } from "@/shared/ui/UserDropdown/UserDropdown";
import { DashboardCard } from "@/shared/ui/DashboardWidget/DashboardWidget";
import { InfoListCard, InfoListItem } from "@/shared/ui/AppListCard/AppListCard";
import { AlertTriangle, Ban, BarChart, Clock, Globe, Smartphone } from "lucide-react";
import { BarChartCard, ChartDataPoint } from "@/shared/ui/BarChart/BarChartCard";
import { TimelineCard, TimelineItemData } from "@/shared/ui/TimelineCard/TimelineCard";
import { MostUsedAppsCard } from "@/shared/ui/MostUsedAppsCard/MostUsedAppsCard";
import { RecentLocationCard } from "@/shared/ui/LocationHistoryCard/LocationHistoryCard";
import GeofencingCard, { GeofencingLocation } from "@/shared/ui/GeofencingCard/GeofencingCard";

const mockUsers = [
  {
    id: "1",
    name: "Mide A.",
    image: "https://github.com/shadcn.png", // Example image URL
    email: "mide@example.com",
  },
  {
    id: "2",
    name: "David K.",
    // No image provided, will fallback to "DK"
    email: "david@example.com",
  },
  {
    id: "3",
    name: "Sarah J.",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "sarah@example.com",
  },
];

export default function Home() {
  const [showSignOut, setShowSignOut] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAccountType, setShowAccountType] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showBlockedWebsites, setShowBlockedWebsites] = useState(false);
  const [showGeofencing, setShowGeofencing] = useState(false);
  const [showTimeLimit, setShowTimeLimit] = useState(false);
  const [showPairDevice, setShowPairDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string>("");

  // Geofencing State
  const [isGeofencingActive, setIsGeofencingActive] = useState(true);

  const geofencingLocations: GeofencingLocation[] = [
    { id: "1", name: "Oshodi, Lagos", radius: "2km" },
    { id: "2", name: "Maryland, Lagos", radius: "1km" },
    { id: "3", name: "Ikeja, Lagos", radius: "3km" },
  ];

  const handlePairingProcess = () => {
    setIsLoading(true);

    // Simulate a 3-second API call or process
    setTimeout(() => {
      setIsLoading(false);
      console.log("Process complete!");
    }, 3000);
  };

  // Data for the Basic Plan
  const basicFeatures: PricingFeatureItem[] = [
    { text: "Customer Support", included: true },
    { text: "Free User Account", included: true },
    { text: "Monthly Reports", included: false },
    { text: "Multiple Devices", included: false },
  ];

  // Data for the Premium Plan
  const premiumFeatures: PricingFeatureItem[] = [
    { text: "Customer Support", included: true },
    { text: "Upto 10 Users", included: true },
    { text: "Monthly Reports", included: true },
    { text: "Multiple Devices Supported", included: true },
  ];

  const appData: InfoListItem[] = [
    {
      id: "1",
      title: "WhatsApp",
      subtitle: "Social Media",
      value: "1hr 20min",
      icon: (
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#25D366] text-xs font-bold text-white">
          WA
        </div>
      ),
    },
    {
      id: "2",
      title: "Instagram",
      subtitle: "Social Media",
      value: "45min",
      icon: (
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-tr from-yellow-400 to-purple-600 text-xs font-bold text-white">
          IG
        </div>
      ),
    },
    {
      id: "3",
      title: "YouTube",
      subtitle: "Entertainment",
      value: "30min",
      icon: (
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#FF0000] text-xs font-bold text-white">
          YT
        </div>
      ),
    },
  ];

  // 2. Data for Websites
  const websiteData: InfoListItem[] = [
    {
      id: "1",
      title: "www.medium.com",
      value: "Just now",
      icon: <Globe className="h-5 w-5 text-slate-600" />,
    },
    {
      id: "2",
      title: "www.figma.com",
      value: "2 mins ago",
      icon: <Globe className="h-5 w-5 text-slate-600" />,
    },
    {
      id: "3",
      title: "www.dribbble.com",
      value: "10 mins ago",
      icon: <Globe className="h-5 w-5 text-slate-600" />,
    },
  ];

  const weeklyUsageData: ChartDataPoint[] = [
    { name: "Mon", value: 2.5 },
    { name: "Tue", value: 3.8 },
    { name: "Wed", value: 1.5 },
    { name: "Thu", value: 4.2 }, // Peak usage
    { name: "Fri", value: 3.0 },
    { name: "Sat", value: 5.5 },
    { name: "Sun", value: 2.0 },
  ];

  const activityData: TimelineItemData[] = [
    {
      id: "1",
      title: "Device Paired",
      app: "Whatsapp",
      time: "10:20 AM",
      variant: "success", // Green
    },
    {
      id: "2",
      title: "Website Blocked",
      app: "Instagram",
      time: "9:45 AM",
      variant: "danger", // Red
    },
    {
      id: "3",
      title: "Time Limit Reached",
      app: "Twitter",
      time: "Yesterday",
      variant: "warning", // Yellow
    },
    {
      id: "4",
      title: "New Alert",
      app: "Tiktok",
      time: "Mon, 24",
      variant: "default", // Primary Blue
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center gap-2 font-sans dark:bg-black">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="link">Link</Button>
      </div>

      <div className="space-y-4 p-10">
        {/* Triggers */}
        <Button onClick={() => setShowSignOut(true)}>Open Sign Out Modal</Button>
        <Button onClick={() => setShowDelete(true)} variant="destructive">
          Open Delete Modal
        </Button>
        <Button onClick={() => setShowAccountType(true)} variant="secondary">
          Open Account Type
        </Button>
        <Button onClick={() => setShowEdit(true)} variant="secondary">
          Open Edit Child
        </Button>
        <Button onClick={() => setShowBlockedWebsites(true)} variant="secondary">
          Open Blocked Websites
        </Button>
        <Button onClick={() => setShowGeofencing(true)} variant="secondary">
          Open Geofencing
        </Button>
        <Button onClick={() => setShowTimeLimit(true)} variant="secondary">
          Open Time Limit
        </Button>
        <Button onClick={() => setShowPairDevice(true)} variant="secondary">
          Open Pair Device
        </Button>

        <Button onClick={handlePairingProcess}>Start Pairing</Button>

        {/* The Loader Modal */}
        <LoaderModal
          open={isLoading}
          text="Pairing..."
          gifSrc="/assets/loader.gif" // Ensure the GIF is in your public folder
        />

        {/* 1. Sign Out Modal Instance */}
        <ConfirmationModal
          open={showSignOut}
          onOpenChange={setShowSignOut}
          title="Are you sure you want to sign out?"
          confirmText="Sign out"
          onConfirm={() => console.log("Signed out")}
          variant="destructive"
        />

        {/* 2. Delete App Modal Instance */}
        <ConfirmationModal
          open={showDelete}
          onOpenChange={setShowDelete}
          title="Are you sure you want to delete this app?"
          description="Deleting WhatsApp cannot be reverted. Are you sure?"
          confirmText="Delete"
          onConfirm={() => console.log("Deleted")}
          variant="destructive"
        />

        {/* 3. Account Type Modal Instance */}
        <AccountTypeModal
          open={showAccountType}
          onOpenChange={setShowAccountType}
          onSelect={(type) => console.log("Selected:", type)}
        />

        {/* 4. Edit Child Modal Instance */}
        <EditChildModal
          open={showEdit}
          onOpenChange={setShowEdit}
          initialData={{ name: "Solomon Grundy", age: "23", gender: "Male" }}
        />

        <BlockedWebsitesModal open={showBlockedWebsites} onOpenChange={setShowBlockedWebsites} />

        <GeofencingModal open={showGeofencing} onOpenChange={setShowGeofencing} />

        <SetTimeLimitModal open={showTimeLimit} onOpenChange={setShowTimeLimit} />

        <PairDeviceModal open={showPairDevice} onOpenChange={setShowPairDevice} />
      </div>

      <div className="flex flex-col items-center justify-center gap-8 p-10 md:flex-row">
        {/* 1. Basic Card Instance */}
        <PricingCard
          title="Basic Plan"
          price="0"
          description="Joy horrible moreover man feelings own shy. Request norland neither mistake for yet."
          features={basicFeatures}
          buttonText="Get Basic"
          isPremium={false}
          onButtonClick={() => console.log("Basic clicked")}
        />

        {/* 2. Premium Card Instance */}
        <PricingCard
          title="Premium Plan"
          price="49"
          description="On even feet time have an no at. Relation so in confined smallest children unpacked delicate."
          features={premiumFeatures}
          buttonText="Get the premium"
          isPremium={true}
          onButtonClick={() => console.log("Premium clicked")}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 p-10">
        {/* Instance 1: Active State (Top card in your image) */}
        <DeviceUsageCard
          deviceName="Mide's iPhone"
          status="active"
          percentage={37.5}
          device="Google Pixel 9"
        />

        {/* Instance 2: Locked/Limit Reached State (Bottom card in your image) */}
        <DeviceUsageCard
          deviceName="Mide's iPhone"
          status="locked"
          percentage={100}
          device="Iphone 14"
        />
      </div>

      <div className="mx-auto max-w-md p-10">
        <UserSelect
          label="Select Child Profile"
          placeholder="Choose a child..."
          users={mockUsers}
          value={selectedChild}
          onChange={setSelectedChild}
          className="rounded-full"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 bg-white p-8 md:grid-cols-3">
        {/* --- Instance 1: Recent Activity --- */}
        <DashboardCard title="Recent Activity" onActionClick={() => console.log("View Activity")}>
          Welcome
        </DashboardCard>
      </div>

      <div className="grid gap-8 p-10 md:grid-cols-2">
        {/* Instance 1: Most Used Apps */}
        <div className="h-[400px]">
          <InfoListCard
            title="Most used apps"
            actionText="View all"
            onActionClick={() => console.log("View Apps")}
            items={appData}
          />
        </div>

        {/* Instance 2: Recent Websites */}
        <div className="h-[400px]">
          <InfoListCard
            title="Recent Websites"
            actionText="View history"
            onActionClick={() => console.log("View History")}
            items={websiteData}
          />
        </div>
      </div>

      <div className="flex items-center p-10">
        {/* The Chart Widget */}
        <div className="h-[400px] w-full max-w-lg">
          <BarChartCard
            title="Time Used"
            time="22hr 30m"
            subtitle="+1h better than yesterday"
            data={weeklyUsageData}
            filterLabel="This Week"
            onFilterClick={() => console.log("Filter clicked")}
            height={300} // Adjust internal chart height
          />
        </div>
      </div>

      <div className="flex p-10">
        {/* The Timeline Widget Instance */}
        <div className="w-full max-w-md">
          <TimelineCard
            title="Recent Activity"
            actionText="View all"
            onActionClick={() => console.log("View all clicked")}
            items={activityData}
          />
        </div>
      </div>

      <div className="flex items-start p-10">
        <MostUsedAppsCard />
      </div>

      <div className="flex p-10">
        <RecentLocationCard onSeeMore={() => console.log("See more clicked")} />
      </div>

      <div className="flex p-10">
        <GeofencingCard
          locations={geofencingLocations}
          isActive={isGeofencingActive}
          onSetGeofencing={() => setIsGeofencingActive(!isGeofencingActive)}
        />
      </div>
    </>
  );
}
