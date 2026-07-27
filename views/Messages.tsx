"use client";

import { useDeviceMessages } from "@/entities/device/model/useDevices";
import { useState, useMemo } from "react";
import Pagination from "@/shared/ui/Table/Pagination";
import { format, parseISO } from "date-fns";
import { DeviceMessage } from "@/entities/device/model/types";

interface MessagesProps {
  deviceId?: string;
}

export default function Messages({ deviceId }: MessagesProps) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: responseData, isLoading, error } = useDeviceMessages(deviceId || "", { page, limit });

  // grouped by month
  const groupedMessages = useMemo(() => {
    const messages = responseData?.messages || [];
    if (!messages.length) return {};
    
    return messages.reduce((acc, msg) => {
      // Use fallback date if createdAt is missing
      const date = msg.createdAt ? parseISO(msg.createdAt) : new Date();
      const monthYear = format(date, "MMMM yyyy");
      if (!acc[monthYear]) acc[monthYear] = [];
      acc[monthYear].push(msg);
      return acc;
    }, {} as Record<string, DeviceMessage[]>);
  }, [responseData?.messages]);

  const totalPages = responseData?.totalPages || 0;

  return (
    <div className="mx-auto flex max-w-4xl flex-col space-y-8 pb-10">
      <h2 className="text-3xl font-medium text-[#0a2540]">Messages sent to this device</h2>
      
      {isLoading && <div className="text-gray-500">Loading messages...</div>}
      {error && <div className="text-red-500">Error loading messages.</div>}
      
      {!isLoading && !responseData?.messages?.length && !error && (
        <div className="text-gray-500">No messages have been sent to this device.</div>
      )}

      {Object.entries(groupedMessages).map(([monthYear, msgs]) => (
        <div key={monthYear} className="space-y-4">
          <h3 className="text-base font-medium text-gray-500">{monthYear}</h3>
          <div className="space-y-4">
            {msgs.map((msg) => (
              <div
                key={msg.id}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-[#1e3a5f]">
                  {msg.message}
                </p>
                <div className="mt-4 text-[13px] text-gray-400">
                  {format(msg.createdAt ? parseISO(msg.createdAt) : new Date(), "MMMM d, yyyy")} • Sent by{" "}
                  {msg.sentByUser ? `${msg.sentByUser.firstName} ${msg.sentByUser.lastName}` : "System"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="pt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="border-none bg-transparent px-0"
          />
        </div>
      )}
    </div>
  );
}
