import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectSidebar({ finalOutcome, stack, duration, teamSize }) {
  return (
    <aside className="bg-[hsla(var(--lavender)/0.02)] border-t lg:border-t-0 lg:border-l border-[hsl(var(--surface1))] lg:-ml-px relative z-10">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        {/* Outcome Block */}
        <div className="px-6 md:px-10 py-12 border-b border-[hsl(var(--surface1))]">
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-4 text-[hsl(var(--subtext1))]">
            Primary Outcome
          </p>
          <p className="font-Barlow font-black uppercase text-3xl md:text-4xl tracking-tight leading-[0.9] text-[hsl(var(--lavender))]">
            {finalOutcome}
          </p>
        </div>

        {/* Stack */}
        <div className="px-6 md:px-10 py-10 border-b border-[hsl(var(--surface1))]">
          <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold mb-4 text-[hsl(var(--subtext1))]">
            Technologies Used
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((t) => (
              <span
                key={t}
                className="font-barlow text-[10px] tracking-[0.1em] uppercase font-bold border border-[hsl(var(--surface1))] bg-[hsl(var(--base))] px-3 py-1.5 text-[hsl(var(--text))]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Duration & Team */}
        <div className="grid grid-cols-2">
          <div className="px-6 md:px-10 py-8 border-r border-[hsl(var(--surface1))]">
            <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold mb-2 text-[hsl(var(--subtext1))]">
              Duration
            </p>
            <p className="font-Barlow text-xl font-bold uppercase tracking-tight text-[hsl(var(--text))]">
              {duration}
            </p>
          </div>
          <div className="px-6 md:px-10 py-8">
            <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold mb-2 text-[hsl(var(--subtext1))]">
              Team Size
            </p>
            <p className="font-Barlow text-xl font-bold uppercase tracking-tight text-[hsl(var(--text))]">
              {teamSize}
            </p>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
