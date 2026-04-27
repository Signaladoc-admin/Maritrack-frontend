import { Suspense } from "react";
import DevicesList from "@/views/DevicesList";

export default function DevicesPage() {
  return (
    <Suspense>
      <DevicesList />
    </Suspense>
  );
}
