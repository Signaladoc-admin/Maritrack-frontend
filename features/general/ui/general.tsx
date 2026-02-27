import React from "react";
import { Power } from "lucide-react";
import { StatsCard } from "@/shared/ui/cards/stats-card";

const General = () => {
  return (
    <div className="p-6">
      <StatsCard
        label="SafeSearch status"
        value="Active"
        description="since 2 months 3 days"
        dotColor="bg-[#00E096]"
        action={{
          icon: Power,
          onClick: () => console.log("Toggle SafeSearch"),
          className: "bg-[#00B087]",
        }}
        className="max-w-md"
      />
    </div>
  );
};

export default General;
