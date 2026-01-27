import React from "react";
import { techStackGroups } from "../../data/aboutData/aboutTechStack";

const TechStackGroup = ({ title, items }) => {
  return (
    <article
      className="
        group relative
        rounded-2xl border border-[hsl(var(--surface2))]
        bg-[hsl(var(--mantle))]/75
        backdrop-blur-xl
        p-6 md:p-7
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:border-[hsl(var(--blue))]
        hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]
        animate-in-view
      "
    >
      {/* Hover glow */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_65%)]
        "
        aria-hidden="true"
      />

      <div className="relative">
        <header className="flex items-center justify-between gap-3 mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-[hsl(var(--text))]">
            {title}
          </h3>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--subtext0))]">
            {items.length} tools
          </span>
        </header>

        <div className="flex flex-wrap gap-2.5 md:gap-3">
          {items.map((item) => (
            <span
              key={item}
              className="
                inline-flex items-center gap-1.5
                rounded-full border border-[hsl(var(--surface2))]
                bg-[hsl(var(--base))]/80
                px-3 py-1.5
                text-xs md:text-sm
                text-[hsl(var(--subtext0))]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

const TechStackSection = () => {
  // Try to find "Data / AI" group by title (Data + AI/ML in name)
  const highlightGroup = techStackGroups.find((group) =>
    /data/i.test(group.title) && /(ai|ml)/i.test(group.title)
  );

  const remainingGroups = highlightGroup
    ? techStackGroups.filter((g) => g !== highlightGroup)
    : techStackGroups;

  return (
    <section className="relative py-20 md:py-24">
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_60%)]
        "
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)]
          bg-[size:22px_22px]
          opacity-40
        "
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading */}
        <header className="text-center mb-12 md:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs md:text-sm text-[hsl(var(--subtext1))] animate-in-view">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            <span>The tools we ship with</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold animate-in-view">
            Our Technology Stack
          </h2>

          <p className="text-[hsl(var(--subtext1))] max-w-4xl mx-auto text-sm md:text-base leading-relaxed text-center animate-in-view">
            We leverage a modern, robust technology stack to build scalable,
            high-performance solutions. Our expertise spans the tools and
            platforms that actually stand up in production.
          </p>
        </header>

        {/* Tech groups with DS/AI in the middle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* First two normal groups */}
          {remainingGroups.slice(0, 2).map((group) => (
            <TechStackGroup
              key={group.id}
              title={group.title}
              items={group.items}
            />
          ))}

          {/* Middle full-width DS/AI group */}
          {highlightGroup && (
            <div className="md:col-span-2">
              <TechStackGroup
                title={highlightGroup.title}
                items={highlightGroup.items}
              />
            </div>
          )}

          {/* Remaining groups */}
          {remainingGroups.slice(2).map((group) => (
            <TechStackGroup
              key={group.id}
              title={group.title}
              items={group.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
