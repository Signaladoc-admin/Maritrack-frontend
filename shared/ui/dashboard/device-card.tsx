import { CardWrapper } from "@/shared/ui/card-wrapper";
import { cn } from "@/shared/lib/utils";
import { Battery, Smartphone } from "lucide-react";

interface DeviceCardProps {
  ownerName: string;
  model: string;
  batteryLevel: number;
  brandIcon?: React.ReactNode;
  variant?: "row" | "column";
  className?: string;
}

/* ─── battery level → color ─── */
function getBatteryColor(level: number) {
  if (level <= 20) return { stroke: "#ef4444", text: "text-red-500" }; // red - keep warnings punchy
  if (level <= 45) return { stroke: "#f59e0b", text: "text-amber-500" }; // orange
  return { stroke: "#0EDD9F", text: "text-[#0EDD9F]" }; // green from SVG
}

/* ─── semi-circular gauge ─── */
function SemiCircularGauge({ level, size = 120 }: { level: number; size?: number }) {
  const color = getBatteryColor(level);
  const strokeWidth = 20; // Thicker as per SVG
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <div style={{ width: size, height: size * 0.65 }}>
        <svg
          width={size}
          height={size * 0.65}
          viewBox={`0 0 ${size} ${size * 0.65}`}
          className="overflow-visible"
        >
          {/* Background track */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke="#1B3C73"
            strokeOpacity="0.5"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke={color.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 0.5s ease-out",
            }}
          />
        </svg>
      </div>
      {/* Center content */}
      <div className="absolute inset-x-0 top-12 z-10 flex flex-col items-center justify-center">
        {/* Battery Icon (Simple Rect Representation matching style) */}
        <div className="mb-1 flex items-center justify-center">
          <Battery className={cn("h-5 w-5 fill-current", color.text)} />
        </div>
        <span className="mt-1.5 leading-1 font-medium tracking-wide text-white">{level}%</span>
      </div>
    </div>
  );
}

/* ─── phone mockup (SVG Based) ─── */
function PhoneMockup({
  batteryLevel,
  size = "normal",
}: {
  batteryLevel: number;
  size?: "normal" | "large";
}) {
  // Unified SVG Geometry
  const width = 163;
  // Use the larger height (320) to ensure flush bottom in both layouts (clipped in row view)
  const height = 320;
  const gaugeSize = 130; // Unified gauge size

  return (
    <div className="relative" style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        <defs>
          <clipPath id="clip0_phone">
            <path
              d={`M0 18C0 8.05887 8.05888 0 18 0H145C154.941 0 163 8.05888 163 18V${height}H0V18Z`}
              fill="white"
            />
          </clipPath>
        </defs>

        <g clipPath="url(#clip0_phone)">
          <path
            d={`M0 18C0 8.05887 8.05888 0 18 0H145C154.941 0 163 8.05888 163 18V${height}H0V18Z`}
            fill="#1B3C73"
          />
          <path
            d={`M6 20C6 12.268 12.268 6 20 6H143C150.732 6 157 12.268 157 20V${height}H6V20Z`}
            fill="#0B182E"
          />
          <rect x="69" y="13" width="26" height="3" rx="1.5" fill="#1B3C73" />
        </g>
      </svg>

      <div className="absolute inset-x-0 top-0 flex flex-col items-center">
        <div className="mt-14">
          <SemiCircularGauge level={batteryLevel} size={gaugeSize} />
        </div>
      </div>
    </div>
  );
}

/* ─── device card ─── */
export function DeviceCard({
  ownerName,
  model,
  batteryLevel,
  brandIcon,
  variant = "row",
  className,
}: DeviceCardProps) {
  const isRowVariant = variant === "row";

  return (
    <CardWrapper
      variant="primary"
      radius="lg"
      padding="none"
      className={cn(
        "relative w-full max-w-[450px] overflow-hidden bg-linear-to-br from-slate-950 to-slate-900 px-2 py-5 pb-0 dark:from-slate-900 dark:to-slate-950",
        // Mobile: behave like column (no extra top padding). Desktop Row: add pt-10
        isRowVariant ? "md:pt-10" : "",
        className
      )}
    >
      <div
        className={cn(
          "flex h-full",
          // Mobile (Base): Column layout (Text top, phone bottom-center)
          // Desktop (md): Row layout (Text left, phone absolute right) if variant="row"
          isRowVariant
            ? "flex-col items-start px-5 pt-6 md:flex-row md:items-end md:justify-between md:px-6 md:pt-0"
            : "flex-col items-start px-5 pt-6"
        )}
      >
        {/* Text content */}
        <div
          className={cn("z-10 space-y-2.5", isRowVariant ? "pb-4 md:shrink-0 md:pb-10" : "pb-4")}
        >
          <div className="text-white/70">{brandIcon || <Smartphone className="h-5 w-5" />}</div>
          <h4 className="text-xl leading-tight font-bold text-white">
            {ownerName}&rsquo;s
            <br />
            phone
          </h4>
          <p className="text-[#c5d5f1]/75">{model}</p>
        </div>

        {/* Phone mockup */}
        <div
          className={cn(
            "z-10 shrink-0",
            // Base (Mobile/Col): Flex centered at bottom with negative margin (-mb-40)
            "mt-7 mr-auto -mb-40 w-full justify-center",
            // Desktop (Row): Absolute positioned top-right with negative margin (-mb-5)
            isRowVariant &&
              "md:absolute md:top-5 md:right-5 md:mt-0 md:mr-0 md:-mb-5 md:block md:w-auto"
          )}
        >
          <PhoneMockup batteryLevel={batteryLevel} size={isRowVariant ? "normal" : "large"} />
        </div>
      </div>
    </CardWrapper>
  );
}
