import React from "react";
import { Link } from "react-router-dom";

export default function ProductsSidebar({
  allCategories,
  activeFilter,
  setActiveFilter,
  filteredCount,
}) {
  return (
    <aside className="lg:sticky lg:top-24 self-start border-b lg:border-b-0 lg:border-r border-[hsl(var(--surface1))]">
      <div className="px-6 md:px-8 py-10 flex flex-col gap-8">
        <div>
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-4 text-[hsl(var(--subtext1))]">
            Filter by Category
          </p>
          <div className="flex flex-col gap-0">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-left py-3 border-b border-[hsl(var(--surface1))] flex items-center justify-between group transition-colors ${
                  activeFilter === cat
                    ? "text-[hsl(var(--lavender))]"
                    : "text-[hsl(var(--text))] hover:text-[hsl(var(--lavender))]"
                }`}
              >
                <span className="font-Barlow text-xl font-bold uppercase tracking-tight">
                  {cat}
                </span>
                {activeFilter === cat && (
                  <span className="w-2 h-2 bg-[hsl(var(--lavender))] flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[hsl(var(--surface1))] pt-8">
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-5 text-[hsl(var(--subtext1))]">
            Showing
          </p>
          <div className="font-Barlow text-5xl font-black tracking-tight mb-1 text-[hsl(var(--text))]">
            {filteredCount}
          </div>
          <p className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--lavender))]">
            {activeFilter === "All" ? "All Products" : activeFilter}
          </p>
        </div>

        <div className="border-t border-[hsl(var(--surface1))] pt-8">
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-4 text-[hsl(var(--subtext1))]">
            Need a Custom Build?
          </p>
          <Link
            to="/contact"
            className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsl(var(--lavender))] text-[hsl(var(--lavender))] pb-0.5 hover:text-[hsl(var(--text))] hover:border-[hsl(var(--text))] transition-colors"
          >
            Talk to Us →
          </Link>
        </div>
      </div>
    </aside>
  );
}
