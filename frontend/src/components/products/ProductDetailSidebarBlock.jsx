import React from "react";

export default function ProductDetailSidebarBlock({ label, children }) {
  return (
    <div className="border-b border-[hsl(var(--surface1))] pb-6">
      <p className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold mb-3 text-[hsl(var(--subtext1))]">
        {label}
      </p>
      {children}
    </div>
  );
}
