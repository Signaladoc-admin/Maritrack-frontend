import Badge from "@/shared/ui/Badge";
import { Calendar, Signal } from "lucide-react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import CustomTooltip from "./CustomTooltip";
import { cn } from "@/shared/lib/utils";
import { CardWrapper } from "@/shared/ui/card-wrapper";

const data = [
  { name: "1", pv: 26 },
  { name: "2", pv: 24 },
  { name: "3", pv: 18 },
  { name: "4", pv: 28 },
  { name: "5", pv: 40 }, // <- highlighted point
  { name: "6", pv: 30 },
  { name: "7", pv: 12 },
  { name: "8", pv: 22 },
  { name: "9", pv: 38 },
  { name: "10", pv: 42 },
  { name: "11", pv: 40 },
];

export default function UserAnalyticsCard({
  title,
  measureCount,
  percentageChange,
}: {
  title: string;
  measureCount: number;
  percentageChange: number;
}) {
  return (
    <CardWrapper variant="outline" className="p-6 lg:p-8">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            content={
              <div className="flex items-center gap-2 text-neutral-500">
                <Calendar size={20} />
                <span>This month</span>
              </div>
            }
          />
          <span className="rounded-lg bg-neutral-100 p-2">
            <Signal className="text-[#4318ff]" strokeWidth={3} size={20} />
          </span>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <div className="space-y-1">
            <p className="text-4xl font-bold">{measureCount}</p>
            <p className="text-sm text-neutral-500">{title}</p>
            <p
              className={cn("font-bold", percentageChange > 0 ? "text-green-500" : "text-red-500")}
            >
              {percentageChange > 0 ? "+" : ""} {percentageChange}%
            </p>
          </div>
          <LineChart width="100%" height={120} data={data}>
            <Tooltip content={<CustomTooltip active={false} payload={[]} />} cursor={false} />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#5B3DF5"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#5B3DF5",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
            {/* <RechartsDevtools /> */}
          </LineChart>
        </div>
      </div>
    </CardWrapper>
  );
}
