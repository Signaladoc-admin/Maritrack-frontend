"use client";

import { useState } from "react";
import { useToast } from "@/shared/ui/toast";
import { Loader } from "@/shared/ui/loader";

export default function Reports() {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (report: "user" | "device", type: "csv" | "xlxs") => {
    const key = `${report}-${type}`;
    setDownloading(key);

    try {
      const response = await fetch(`/api/reports/export?report=${report}&type=${type}`);

      if (!response.ok) {
        let errorMsg = "Failed to export report";
        try {
          const errData = await response.json();
          errorMsg = errData.error || errData.message || errorMsg;
        } catch {
          // Response body is not JSON
        }
        toast({
          title: "Export Failed",
          message: errorMsg,
          type: "error",
        });
        return;
      }

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await response.json();
        const link = data?.data?.link || data?.link;
        if (link) {
          const a = document.createElement("a");
          a.href = link;
          a.download = "";
          document.body.appendChild(a);
          a.click();
          a.remove();
          toast({
            title: "Report Downloaded",
            message: `${report === "user" ? "User" : "Device"} report (${type}) downloaded successfully.`,
            type: "success",
          });
          return;
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const extension = type.toLowerCase() === "csv" ? "csv" : "xlsx";
      a.download = `${report}-report.${extension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      toast({
        title: "Report Downloaded",
        message: `${report === "user" ? "User" : "Device"} report (${type}) downloaded successfully.`,
        type: "success",
      });
    } catch (err: any) {
      toast({
        title: "Download Error",
        message: err?.message || "An unexpected error occurred while downloading the report.",
        type: "error",
      });
    } finally {
      setDownloading(null);
    }
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
          <div className="flex items-center gap-2">
            <button
              className="btn-chip flex-1 cursor-pointer justify-center text-center font-medium !bg-white !text-[#002147] hover:!bg-white/90 disabled:opacity-50"
              disabled={!!downloading}
              onClick={() => handleDownload("user", "csv")}
            >
              {downloading === "user-csv" ? (
                <span className="flex items-center justify-center gap-1.5">
                  <Loader size="sm" /> csv
                </span>
              ) : (
                "csv"
              )}
            </button>
            <button
              className="btn-chip flex-1 cursor-pointer justify-center text-center font-medium !bg-white !text-[#002147] hover:!bg-white/90 disabled:opacity-50"
              disabled={!!downloading}
              onClick={() => handleDownload("user", "xlxs")}
            >
              {downloading === "user-xlxs" ? (
                <span className="flex items-center justify-center gap-1.5">
                  <Loader size="sm" /> xlxs
                </span>
              ) : (
                "xlxs"
              )}
            </button>
          </div>
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
          <div className="flex items-center gap-2">
            <button
              className="btn-chip flex-1 cursor-pointer justify-center text-center font-medium !bg-white !text-[#002147] hover:!bg-white/90 disabled:opacity-50"
              disabled={!!downloading}
              onClick={() => handleDownload("device", "csv")}
            >
              {downloading === "device-csv" ? (
                <span className="flex items-center justify-center gap-1.5">
                  <Loader size="sm" /> csv
                </span>
              ) : (
                "csv"
              )}
            </button>
            <button
              className="btn-chip flex-1 cursor-pointer justify-center text-center font-medium !bg-white !text-[#002147] hover:!bg-white/90 disabled:opacity-50"
              disabled={!!downloading}
              onClick={() => handleDownload("device", "xlxs")}
            >
              {downloading === "device-xlxs" ? (
                <span className="flex items-center justify-center gap-1.5">
                  <Loader size="sm" /> xlxs
                </span>
              ) : (
                "xlxs"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

