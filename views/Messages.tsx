"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

interface MessageItem {
  id: string;
  text: string;
  metaTime: string;
  status: "Read" | "Delivered";
}

const DEFAULT_MESSAGES: MessageItem[] = [
  {
    id: "msg-1",
    text: "Your device has a pending balance of ₦12,500. Please make a payment to avoid restrictions.",
    metaTime: "11 Aug, 10:00 pm",
    status: "Read",
  },
  {
    id: "msg-2",
    text: "Reminder: your monthly instalment is due in 3 days.",
    metaTime: "08 Aug, 9:00 am",
    status: "Read",
  },
  {
    id: "msg-3",
    text: "Welcome to Flentra — your device has been successfully enrolled.",
    metaTime: "01 Aug, 10:02 am",
    status: "Delivered",
  },
];

interface MessagesProps {
  deviceId?: string;
}

export default function Messages({ deviceId }: MessagesProps) {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>(DEFAULT_MESSAGES);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMsg: MessageItem = {
      id: Date.now().toString(),
      text: trimmed,
      metaTime: format(new Date(), "dd MMM, h:mm a"),
      status: "Delivered",
    };

    setMessages((prev) => [newMsg, ...prev]);
    setInputText("");
    toast.success("Message dispatched to device");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="detail-tab-panel w-full animate-in fade-in-0 duration-300">
      <div className="message-composer">
        <textarea
          placeholder="Send a message to this device..."
          id="ddMessageInput"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button
          className="btn-primary"
          style={{ alignSelf: "flex-end" }}
          id="ddSendMessageBtn"
          onClick={handleSend}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#002147" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          Send
        </button>
      </div>

      <div className="surface" style={{ padding: "6px 22px" }}>
        <div className="message-list" id="ddMessageList">
          {messages.map((msg) => (
            <div className="message-row" key={msg.id}>
              <div className="msg-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div className="msg-body">
                <div className="msg-text">{msg.text}</div>
                <div className="msg-meta">
                  {msg.metaTime} ·{" "}
                  <span className={`msg-status ${msg.status.toLowerCase()}`}>
                    {msg.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
