"use client";

import * as React from "react";
import { Download, ChevronDown } from "lucide-react";

export function DashboardHeaderWidget() {
  return (
    <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <span>Analytics for</span>
          <button className="ml-1 flex items-center gap-1 font-medium text-gray-700 hover:text-gray-900">
            This week <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 sm:mt-0">
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <Download className="h-4 w-4" />
          Download
        </button>
      </div>
    </div>
  );
}
