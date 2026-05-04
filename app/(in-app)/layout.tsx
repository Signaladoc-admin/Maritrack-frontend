import DashboardLayout from "@/shared/layout/DashboardLayout";

export default function InAppLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
