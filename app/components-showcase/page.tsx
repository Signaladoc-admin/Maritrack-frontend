"use client";

import { Sidebar, NavIcon } from "@/shared/ui/layout/sidebar";
import { Header } from "@/shared/ui/layout/header";
import { AppShell } from "@/shared/ui/layout/app-shell";
import { StatCard } from "@/shared/ui/dashboard/stat-card";
import { DeviceCard } from "@/shared/ui/dashboard/device-card";
import { AlertBox } from "@/shared/ui/dashboard/alert-box";
import { DataTableList } from "@/shared/ui/lists/data-table-list";
import { DataRow } from "@/shared/ui/lists/data-row";
import { ActivityTimeline, TimelineItem } from "@/shared/ui/lists/activity-timeline";
import { SettingsToggle } from "@/shared/ui/settings-toggle";
import { InputGroup } from "@/shared/ui/input-group";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { ActionButton } from "@/shared/ui/action-button";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Checkbox } from "@/shared/ui/checkbox";
import { Switch } from "@/shared/ui/switch";
import { OTPInput } from "@/shared/ui/otp-input";
import { ImageUpload } from "@/shared/ui/image-upload";
import { DateRangePicker } from "@/shared/ui/date-range-picker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select";
import { H1, H2, H3, P, Blockquote } from "@/shared/ui/typography";
import {
  MessageSquare,
  Youtube,
  Instagram,
  Twitter,
  Home,
  User,
  Plus,
  Settings,
  Shield,
  Smartphone,
  Tablet,
  Laptop,
  Apple,
} from "lucide-react";
import { useState } from "react";

export default function ComponentsShowcasePage() {
  const [activeTab, setActiveTab] = useState("gen");
  const [otpValue, setOtpValue] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen space-y-16 p-4 md:p-8 dark:bg-slate-950">
      {/* Header */}
      <div className="space-y-4">
        <H1>OptiTrack Design System</H1>
        <P className="text-muted-foreground text-lg">
          Comprehensive verification of all design tokens, atomic components, and composed modules.
        </P>
      </div>

      {/* 1. ATOMIC PRIMITIVES */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b pb-2">
          <span className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs font-bold">
            LEVEL 1
          </span>
          <H2 className="m-0 text-xl">Atomic Primitives</H2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <CardWrapper
            header={<H3 className="text-base">Buttons & Actions</H3>}
            className="space-y-4"
          >
            <div className="mb-4 flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <ActionButton>Action</ActionButton>
              <ActionButton isLoading>Loading</ActionButton>
              <ActionButton disabled>Disabled</ActionButton>
            </div>
          </CardWrapper>

          <CardWrapper header={<H3 className="text-base">Form Controls</H3>} className="space-y-4">
            <InputGroup label="Standard Input" placeholder="Standard Input" />
            <InputGroup label="Disabled Input" disabled placeholder="Disabled Input" />

            <InputGroup label="Toggle Switch" id="sw-demo" type="checkbox">
              <Switch id="sw-demo" />
            </InputGroup>

            <InputGroup label="Checkbox Option" type="checkbox" id="chk-demo" />

            <InputGroup label="Select Component">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Component" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </InputGroup>

            <div className="space-y-2 border-t pt-2">
              <P className="text-muted-foreground text-xs font-semibold">Enhanced Inputs</P>
              <InputGroup label="Email Input" type="email" placeholder="Email with auto-icon" />
              <InputGroup
                label="Password Input"
                type="password"
                placeholder="Password with toggle"
              />
              <InputGroup
                label="Custom Icon Input"
                iconLeft={<User className="size-4" />}
                placeholder="Custom Left Icon"
              />
            </div>

            <div className="space-y-2 border-t pt-2">
              <P className="text-muted-foreground text-xs font-semibold">OTP Input</P>
              <InputGroup label="Enter OTP">
                <OTPInput value={otpValue} onChange={setOtpValue} />
              </InputGroup>
            </div>

            <div className="space-y-2 border-t pt-2">
              <P className="text-muted-foreground text-xs font-semibold">Image Upload</P>
              <InputGroup label="Profile Image">
                <ImageUpload value={imageFile} onChange={setImageFile} />
              </InputGroup>
            </div>
          </CardWrapper>

          <CardWrapper header={<H3 className="text-base">Typography</H3>} className="space-y-2">
            <H1 className="text-2xl">Heading 1</H1>
            <H2 className="text-xl">Heading 2</H2>
            <H3 className="text-lg">Heading 3</H3>
            <P className="text-sm">
              Body text paragraph with <span className="text-primary font-bold">accent color</span>.
            </P>
            <Blockquote className="text-xs">Blockquote text style.</Blockquote>
          </CardWrapper>
        </div>
      </section>

      {/* 2. COMPOSED WIDGETS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b pb-2">
          <span className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs font-bold">
            LEVEL 2
          </span>
          <H2 className="m-0 text-xl">Dashboard Widgets</H2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Screen Time"
            value="4h 20m"
            trend={{ value: 12, positive: true, label: "vs yesterday" }}
            chartData={[20, 45, 30, 80, 50, 70, 40]}
          />
          <StatCard
            title="Battery Health"
            value="82%"
            trend={{ value: 5, positive: false, label: "drained fast" }}
            chartData={[90, 85, 82, 80, 78, 75, 70]}
          />
          <StatCard title="Apps Blocked" value="14" description="In the last 24h" />
          <AlertBox
            type="warning"
            title="Update Required"
            message="New firmware available."
            actionLabel="Update now"
            onAction={() => {}}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <DeviceCard
            ownerName="Solomon"
            model="iPhone 14 Pro"
            batteryLevel={75}
            brandIcon={<Apple className="h-6 w-6" />}
          />
          <DeviceCard
            ownerName="Tablet"
            model="Samsung Galaxy Tab"
            batteryLevel={30}
            brandIcon={<Tablet className="h-6 w-6" />}
          />
          <div className="space-y-4">
            <AlertBox
              type="success"
              title="System Normal"
              message="All limits respected."
              onAction={() => {}}
            />
            <AlertBox
              type="danger"
              title="Security Alert"
              message="Suspicious login attempt."
              onAction={() => {}}
            />
          </div>
        </div>
      </section>

      {/* 3. LISTS & DATA */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b pb-2">
          <span className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs font-bold">
            LEVEL 2
          </span>
          <H2 className="m-0 text-xl">Lists & Data</H2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <DataTableList title="Most Used Apps" actionLabel="View Report">
            <DataRow
              icon={MessageSquare}
              label="WhatsApp"
              value="2h 33m"
              subLabel="Social"
              iconBg="bg-green-100 text-green-600"
            />
            <DataRow
              icon={Youtube}
              label="Youtube"
              value="1h 12m"
              subLabel="Entertainment"
              iconBg="bg-red-100 text-red-600"
            />
            <DataRow
              icon={Instagram}
              label="Instagram"
              value="45m"
              subLabel="Social"
              iconBg="bg-pink-100 text-pink-600"
            />
            <DataRow
              icon={Twitter}
              label="X"
              value="30m"
              subLabel="News"
              iconBg="bg-slate-100 text-slate-600"
            />
          </DataTableList>

          <DataTableList title="Activity Timeline" actionLabel="Filter">
            <ActivityTimeline>
              <TimelineItem
                time="14:20"
                title="Limit Reached"
                app="Screen Time"
                statusColor="red"
              />
              <TimelineItem time="13:45" title="App Installed" app="Roblox" statusColor="blue" />
              <TimelineItem time="12:00" title="School Mode" app="System" statusColor="green" />
              <TimelineItem time="09:00" title="Device Unlocked" isLast />
            </ActivityTimeline>
          </DataTableList>
        </div>
      </section>

      {/* 4. INTERACTIVE MODULES */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b pb-2">
          <span className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs font-bold">
            LEVEL 2
          </span>
          <H2 className="m-0 text-xl">Interactive Modules</H2>
        </div>

        <CardWrapper className="max-w-2xl">
          <TabNavigation
            tabs={[
              { label: "General Settings", value: "gen" },
              { label: "Web Filtering", value: "web" },
              { label: "App Limits", value: "app" },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 pt-6">
            {activeTab === "gen" && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputGroup
                    label="Profile Name"
                    id="p-name"
                    placeholder="Enter name"
                    defaultValue="Solomon"
                  />
                  <InputGroup
                    label="Device Name"
                    id="d-name"
                    placeholder="Enter device name"
                    defaultValue="My iPhone"
                  />
                </div>
                <div className="space-y-4 border-t pt-4">
                  <H3 className="text-muted-foreground text-base">Permissions</H3>
                  <SettingsToggle
                    id="loc-2"
                    label="Location Tracking"
                    description="Allow real-time GPS monitoring"
                    checked
                  />
                  <SettingsToggle
                    id="app-2"
                    label="App Installation"
                    description="Allow installing new apps"
                    checked
                  />
                  <SettingsToggle
                    id="cam-2"
                    label="Camera Access"
                    description="Allow usage of camera"
                  />
                </div>
              </>
            )}
            {activeTab === "web" && (
              <div className="text-muted-foreground py-10 text-center">
                Web Filtering Settings Content
              </div>
            )}
            {activeTab === "app" && (
              <div className="text-muted-foreground py-10 text-center">
                App Limit Settings Content
              </div>
            )}

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="ghost">Cancel</Button>
              <ActionButton>Save Configuration</ActionButton>
            </div>
          </div>
        </CardWrapper>
      </section>

      {/* 5. FULL SIMULATION */}
      <section className="space-y-6 pt-10">
        <div className="flex items-center gap-2 border-b pb-2">
          <span className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs font-bold">
            LEVEL 3
          </span>
          <H2 className="m-0 text-xl">Full Page Simulation</H2>
        </div>

        <div className="relative flex h-[900px] overflow-hidden rounded-xl border bg-slate-50 shadow-2xl dark:bg-slate-900">
          {/* Simulated Sidebar */}
          <div className="absolute top-0 bottom-0 left-0 z-10 flex h-full w-20 flex-col items-center border-r bg-white py-6 dark:bg-slate-950">
            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              O
            </div>
            <nav className="flex flex-col items-center space-y-6">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                <Home className="h-6 w-6" />
              </div>
              <div className="text-muted-foreground rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                <User className="h-6 w-6" />
              </div>
              <div className="text-muted-foreground rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                <Shield className="h-6 w-6" />
              </div>
              <div className="text-muted-foreground rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                <Settings className="h-6 w-6" />
              </div>
            </nav>
            <div className="mt-auto">
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200 dark:border-slate-800">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
            </div>
          </div>

          {/* Simulated Content */}
          <div className="ml-20 h-full flex-1 overflow-auto bg-slate-50/50 dark:bg-slate-950/50">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-8 py-6 dark:bg-slate-900">
              <div>
                <H2>Hello, Janet</H2>
                <P className="text-muted-foreground text-sm">Here is what{"'"}s happening today.</P>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950">
                  <SelectValue placeholder="Select child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  <SelectItem value="sol">Solomon</SelectItem>
                  <SelectItem value="kur">Kuroebi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-8 p-8">
              {/* Stats Row */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Total Screen Time"
                  value="4h 20"
                  trend={{ value: 12, positive: true }}
                  chartData={[30, 50, 40, 60, 80]}
                  className="bg-white shadow-sm dark:bg-slate-900"
                />
                <StatCard
                  title="Battery Health"
                  value="60%"
                  trend={{ value: 10, positive: false }}
                  chartData={[80, 75, 70, 65, 60]}
                  className="bg-white shadow-sm dark:bg-slate-900"
                />
                <AlertBox
                  type="success"
                  title="Within Limits"
                  message="No breaches detected."
                  className="shadow-sm md:col-span-2"
                  onAction={() => {}}
                />
              </div>

              {/* Mid Row */}
              <div className="grid gap-6 md:grid-cols-2">
                <DeviceCard
                  ownerName="Solomon"
                  model="iPhone 14 Pro"
                  batteryLevel={70}
                  brandIcon={<Apple className="h-6 w-6" />}
                  className="shadow-sm"
                />
                <DeviceCard
                  ownerName="Kuroebi"
                  model="Samsung Galaxy S22"
                  batteryLevel={45}
                  brandIcon={<Smartphone className="h-6 w-6" />}
                  className="shadow-sm"
                />
              </div>

              {/* Bottom Row */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <DataTableList
                  title="Top Apps"
                  className="bg-white shadow-sm lg:col-span-2 dark:bg-slate-900"
                >
                  <DataRow
                    icon={MessageSquare}
                    label="WhatsApp"
                    value="2h 32m"
                    subLabel="Average daily use"
                    iconBg="bg-green-100 text-green-600"
                  />
                  <DataRow
                    icon={Youtube}
                    label="YouTube"
                    value="1h 45m"
                    subLabel="Down 15%"
                    iconBg="bg-red-100 text-red-600"
                  />
                  <DataRow
                    icon={Instagram}
                    label="Instagram"
                    value="45m"
                    subLabel="Limit approaching"
                    iconBg="bg-pink-100 text-pink-600"
                  />
                </DataTableList>

                <DataTableList
                  title="Recent Alerts"
                  className="bg-white shadow-sm dark:bg-slate-900"
                >
                  <ActivityTimeline>
                    <TimelineItem
                      time="10:00 AM"
                      title="Safety Check"
                      app="Location"
                      statusColor="green"
                    />
                    <TimelineItem
                      time="08:30 AM"
                      title="App Install Blocked"
                      app="Unknown"
                      statusColor="red"
                    />
                    <TimelineItem
                      time="Yesterday"
                      title="Weekly Report"
                      app="System"
                      statusColor="blue"
                      isLast
                    />
                  </ActivityTimeline>
                </DataTableList>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
