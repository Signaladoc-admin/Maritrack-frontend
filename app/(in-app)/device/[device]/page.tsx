import Device from "@/shared/views/Device";
import React from "react";

const DevicePage = () => {
  return (
    <React.Suspense fallback={null}>
      <Device />
    </React.Suspense>
  );
};

export default DevicePage;
