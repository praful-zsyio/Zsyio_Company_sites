import React from "react";
import { motion } from "framer-motion";
import { PERKS } from "../../data/careersData";

const PerkCard = ({ perk, index }) => {
  const isRightCol = index % 2 !== 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: "easeOut" }}
      className={`group relative overflow-hidden p-8 md:p-14 border-b border-[hsl(var(--surface2))] transition-colors duration-300 hover:bg-[hsla(var(--highlight)/0.04)] ${
        isRightCol ? "" : "md:border-r md:border-r-[hsl(var(--surface2))]"
      }`}
    >
      <div className="relative z-10 text-sm font-semibold text-[hsl(var(--highlight))] mb-8 font-mono">
        {perk.num} —
      </div>
      <h3 className="relative z-10 text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
        {perk.title}
      </h3>
      <p className="relative z-10 text-base text-[hsl(var(--subtext1))] leading-relaxed max-w-sm">
        {perk.description}
      </p>
      <span
        aria-hidden
        className="font-Barlow font-black uppercase absolute pointer-events-none select-none z-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          fontSize: "clamp(5rem, 12vw, 14rem)",
          lineHeight: 0.85,
          right: "-0.04em",
          top: "-0.08em",
          color: "hsla(var(--highlight)/0.15)",
          letterSpacing: "-0.04em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
};

const PerksSection = () => {
  return (
    <section
      id="why-join"
      className="border-b border-[hsl(var(--highlight))] text-[hsl(var(--text))]"
    >
      <div className="px-6 md:px-14 py-12 border-b border-[hsl(var(--highlight))] grid grid-cols-1 md:grid-cols-2 items-end gap-0">
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsl(var(--highlight))]">
            Why Zsyio
          </p>
          <h2
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.025em",
            }}
            className="font-Barlow font-black uppercase text-[hsl(var(--text))]"
          >
            Why Join <span className="text-[hsl(var(--highlight))]">Us.</span>
          </h2>
        </div>
        <div className="mt-4 md:mt-0 md:pl-14">
          <p className="text-base leading-relaxed text-[hsl(var(--subtext1))] max-w-sm">
            A place to do the best work of your career — with people who care
            about craft as much as you do.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {PERKS.map((perk, i) => (
          <PerkCard key={perk.num} perk={perk} index={i} />
        ))}
      </div>
    </section>
  );
};

export default PerksSection;
