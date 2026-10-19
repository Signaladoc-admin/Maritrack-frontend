"use client";

import { useState } from "react";
import { useToast } from "@/shared/ui/toast";
import { Loader } from "@/shared/ui/loader";

interface ScheduledReport {
  id: string;
  name: string;
  frequency: string;
  recipients: string;
  lastRun: string;
  active: boolean;
}

const initialScheduledReports: ScheduledReport[] = [
  {
    id: "1",
    name: "Recovery report",
    frequency: "Weekly · Mondays",
    recipients: "ops@flentra.io",
    lastRun: "25 Aug 2026",
    active: true,
  },
  {
    id: "2",
    name: "Financing enforcement",
    frequency: "Monthly · 1st",
    recipients: "finance@flentra.io",
    lastRun: "01 Aug 2026",
    active: true,
  },
  {
    id: "3",
    name: "Compliance report",
    frequency: "Quarterly",
    recipients: "compliance@flentra.io",
    lastRun: "01 Jul 2026",
    active: false,
  },
];

export default function Reports() {
  const { toast } = useToast();
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>(initialScheduledReports);

  const handleGenerate = (reportName: string) => {
    setGeneratingReport(reportName);
    setTimeout(() => {
      setGeneratingReport(null);
      toast({
        title: "Report Generated",
        message: `${reportName} has been generated and queued for download.`,
        type: "success",
      });
    }, 1200);
  };

  const toggleSchedule = (id: string) => {
    setScheduledReports((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextActive = !r.active;
          toast({
            title: nextActive ? "Schedule Activated" : "Schedule Paused",
            message: `${r.name} schedule is now ${nextActive ? "active" : "paused"}.`,
            type: "info",
          });
          return { ...r, active: nextActive };
        }
        return r;
      })
    );
  };

  return (
    <section className="page active" id="page-reports">
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <h1>Reports</h1>
            <p>Export recovery, financing, and compliance reports.</p>
          </div>
        </div>
      </div>

      <div
        className="dd-tile-grid mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        style={{ marginBottom: "24px" }}
      >
        {/* Recovery report */}
        <div className="surface flex flex-col justify-between p-5">
          <div>
            <div className="method-icon mb-3.5 inline-flex text-[var(--accent)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 stroke-current"
              >
                <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4 className="mb-1.5 text-sm font-bold text-[var(--text-1)]">Recovery report</h4>
            <p className="mb-4 text-xs leading-relaxed text-[var(--text-2)]">
              Flagged, located, and recovered devices this period.
            </p>
          </div>
          <button
            className="btn-chip w-full cursor-pointer justify-center text-center font-medium"
            disabled={generatingReport === "Recovery report"}
            onClick={() => handleGenerate("Recovery report")}
          >
            {generatingReport === "Recovery report" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size="sm" /> Generating...
              </span>
            ) : (
              "Generate"
            )}
          </button>
        </div>

        {/* Financing enforcement */}
        <div className="surface flex flex-col justify-between p-5">
          <div>
            <div className="method-icon mb-3.5 inline-flex text-[var(--accent)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 stroke-current"
              >
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 018 0v3" />
              </svg>
            </div>
            <h4 className="mb-1.5 text-sm font-bold text-[var(--text-1)]">Financing enforcement</h4>
            <p className="mb-4 text-xs leading-relaxed text-[var(--text-2)]">
              Locks, reminders, and re-enablements by zone.
            </p>
          </div>
          <button
            className="btn-chip w-full cursor-pointer justify-center text-center font-medium"
            disabled={generatingReport === "Financing enforcement"}
            onClick={() => handleGenerate("Financing enforcement")}
          >
            {generatingReport === "Financing enforcement" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size="sm" /> Generating...
              </span>
            ) : (
              "Generate"
            )}
          </button>
        </div>

        {/* Fleet utilization */}
        <div className="surface flex flex-col justify-between p-5">
          <div>
            <div className="method-icon mb-3.5 inline-flex text-[var(--accent)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 stroke-current"
              >
                <path d="M4 21V9M12 21V3M20 21v-7" />
              </svg>
            </div>
            <h4 className="mb-1.5 text-sm font-bold text-[var(--text-1)]">Fleet utilization</h4>
            <p className="mb-4 text-xs leading-relaxed text-[var(--text-2)]">
              Active hours, battery health, and screen time.
            </p>
          </div>
          <button
            className="btn-chip w-full cursor-pointer justify-center text-center font-medium"
            disabled={generatingReport === "Fleet utilization"}
            onClick={() => handleGenerate("Fleet utilization")}
          >
            {generatingReport === "Fleet utilization" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size="sm" /> Generating...
              </span>
            ) : (
              "Generate"
            )}
          </button>
        </div>

        {/* Compliance report */}
        <div className="surface flex flex-col justify-between p-5">
          <div>
            <div className="method-icon mb-3.5 inline-flex text-[var(--accent)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 stroke-current"
              >
                <circle cx="12" cy="12" r="8.5" />
                <path d="M6.5 6.5l11 11" />
              </svg>
            </div>
            <h4 className="mb-1.5 text-sm font-bold text-[var(--text-1)]">Compliance report</h4>
            <p className="mb-4 text-xs leading-relaxed text-[var(--text-2)]">
              Policy adherence and restriction coverage.
            </p>
          </div>
          <button
            className="btn-chip w-full cursor-pointer justify-center text-center font-medium"
            disabled={generatingReport === "Compliance report"}
            onClick={() => handleGenerate("Compliance report")}
          >
            {generatingReport === "Compliance report" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size="sm" /> Generating...
              </span>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
