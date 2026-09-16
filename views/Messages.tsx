"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useDeviceMessages, bulkMessageDevicesAction } from "@/entities/device";

interface MessagesProps {
  deviceId?: string;
}

export default function Messages({ deviceId }: MessagesProps) {
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const {
    data: messagesData,
    isLoading,
    refetch,
  } = useDeviceMessages(deviceId || "", {
    limit: 50,
  });

  const messages = Array.isArray(messagesData?.messages) ? messagesData.messages : [];

  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    if (!deviceId) {
      toast.error("Device ID is required to send messages");
      return;
    }

    setIsSending(true);
    try {
      const res = await bulkMessageDevicesAction([deviceId], "GENERAL", trimmed);
      if (res && (res as any).success === false) {
        toast.error((res as any).error || "Failed to send message");
      } else {
        toast.success("Message dispatched to device");
        setInputText("");
        refetch();
      }
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMetaTime = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return format(new Date(dateStr), "dd MMM, h:mm a");
    } catch {
      return "-";
    }
  };

  return (
    <div className="detail-tab-panel animate-in fade-in-0 w-full duration-300">
      <div className="message-composer">
        <textarea
          placeholder="Send a message to this device..."
          id="ddMessageInput"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
        ></textarea>
        <button
          className="btn-primary"
          style={{ alignSelf: "flex-end" }}
          id="ddSendMessageBtn"
          onClick={handleSend}
          disabled={isSending}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#002147"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>

      <div className="surface" style={{ padding: "6px 22px" }}>
        {isLoading ? (
          <div className="py-8 text-center text-sm text-[#667085]">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="py-8 text-center text-sm text-[#667085]">
            No messages sent to this device yet.
          </div>
        ) : (
          <div className="message-list" id="ddMessageList">
            {messages.map((msg) => (
              <div className="message-row" key={msg.id}>
                <div className="msg-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div className="msg-body">
                  <div className="msg-text">{msg.message}</div>
                  <div className="msg-meta">
                    {formatMetaTime(msg.createdAt)} ·{" "}
                    <span className="msg-status delivered">Delivered</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
