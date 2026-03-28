import React from "react";

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      {children}
    </div>
  );
}
