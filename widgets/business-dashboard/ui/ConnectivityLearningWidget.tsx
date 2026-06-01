"use client";

import * as React from "react";
import {
  DashboardEmptyState,
  DashboardLineChart,
  DashboardValueCard,
} from "@/shared/ui/dashboard/analytics-ui";

interface ConnectivityLearningWidgetProps {
  preloadedContentValue?: string;
  offlineLearningValue?: string;
  preloadedContentData?: Record<string, string | number>[];
  offlineLearningData?: Record<string, string | number>[];
  isLoading?: boolean;
}

export function ConnectivityLearningWidget({
  preloadedContentValue = "—",
  offlineLearningValue = "—",
  preloadedContentData = [],
  offlineLearningData = [],
  isLoading = false,
}: ConnectivityLearningWidgetProps) {
  return (
    <div className="mb-8">
      <h2 className="text-primary mb-4 text-base font-semibold">Connectivity & Learning Access</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardValueCard
          value={isLoading ? "—" : preloadedContentValue}
          label="Usage of preloaded content"
          isLoading={isLoading}
          color="#e418ff"
        >
          {preloadedContentData.length > 0 ? (
            <DashboardLineChart data={preloadedContentData} dataKey="usage" xAxisKey="month" />
          ) : (
            <DashboardEmptyState />
          )}
        </DashboardValueCard>

        <DashboardValueCard
          value={isLoading ? "—" : offlineLearningValue}
          label="Offline learning hours logged"
          isLoading={isLoading}
          color="#003366"
        >
          {offlineLearningData.length > 0 ? (
            <DashboardLineChart data={offlineLearningData} dataKey="hours" xAxisKey="month" />
          ) : (
            <DashboardEmptyState />
          )}
        </DashboardValueCard>
      </div>
    </div>
  );
}
