"use client";

import { useState } from "react";
import { useToast } from "@/shared/ui/toast";
import { Loader } from "@/shared/ui/loader";

export default function Reports() {
  const { toast } = useToast();
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

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

  return (
    <section className="page active" id="page-reports">
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <h1>Reports</h1>
            <p>User and device reports, plus recovery, financing, and compliance reporting.</p>
          </div>
        </div>
      </div>

      <div
        className="dd-tile-grid mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        style={{ marginBottom: "24px" }}
      >
        {/* User report */}
        <div className="surface flex flex-col justify-between p-5">
          <div>
            <div className="method-icon mb-3.5 inline-flex text-[var(--accent)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 stroke-current"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h4 className="mb-1.5 text-sm font-bold text-[var(--text-1)]">User report</h4>
            <p className="mb-4 text-xs leading-relaxed text-[var(--text-2)]">
              Enrolled users, assignment status, and activity by user.
            </p>
          </div>
          <button
            className="btn-chip w-full cursor-pointer justify-center text-center font-medium !bg-white !text-[#002147] hover:!bg-white/90"
            disabled={generatingReport === "User report"}
            onClick={() => handleGenerate("User report")}
          >
            {generatingReport === "User report" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size="sm" /> Generating...
              </span>
            ) : (
              "Generate"
            )}
          </button>
        </div>

        {/* Device report */}
        <div className="surface flex flex-col justify-between p-5">
          <div>
            <div className="method-icon mb-3.5 inline-flex text-[var(--accent)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 stroke-current"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="11" y1="5" x2="13" y2="5" />
              </svg>
            </div>
            <h4 className="mb-1.5 text-sm font-bold text-[var(--text-1)]">Device report</h4>
            <p className="mb-4 text-xs leading-relaxed text-[var(--text-2)]">
              Device inventory, model, status, and last-seen summary.
            </p>
          </div>
          <button
            className="btn-chip w-full cursor-pointer justify-center text-center font-medium !bg-white !text-[#002147] hover:!bg-white/90"
            disabled={generatingReport === "Device report"}
            onClick={() => handleGenerate("Device report")}
          >
            {generatingReport === "Device report" ? (
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
