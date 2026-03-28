"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return {
    toast: context.addToast,
    dismiss: context.removeToast,
  };
}

/* ─── Toast Container & Item ─── */
function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: string) => void;
}) {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2 md:right-8 md:bottom-8">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, toast.duration || 5000);
    return () => clearTimeout(timer);
  }, [toast.duration, onRemove]);

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    error: <AlertCircle className="h-5 w-5 text-red-600" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-600" />,
    info: <Info className="h-5 w-5 text-blue-600" />,
  };

  const styles = {
    success: "bg-white border-emerald-100 dark:border-emerald-900/20",
    error: "bg-white border-red-100 dark:border-red-900/20",
    warning: "bg-white border-amber-100 dark:border-amber-900/20",
    info: "bg-white border-blue-100 dark:border-blue-900/20",
  };

  return (
    <div
      className={cn(
        "animate-in slide-in-from-right-full fade-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10",
        styles[toast.type]
      )}
    >
      <div className="shrink-0">{icons[toast.type]}</div>
      <div className="flex-1 pt-0.5">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{toast.title}</h4>
        {toast.message && <p className="text-muted-foreground mt-1 text-sm">{toast.message}</p>}
      </div>
      <button
        onClick={onRemove}
        className="text-muted-foreground hover:text-foreground shrink-0 rounded-md p-0.5 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
