import React from "react";

export default function SubHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-2 space-y-1">
      <h5 className="text-[14px] font-bold text-[var(--text-1)]">{title}</h5>
      {subtitle && <p className="text-xs font-normal text-[var(--text-3)]">{subtitle}</p>}
    </div>
  );
}
