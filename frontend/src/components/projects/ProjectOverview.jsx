import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectOverview({ description, summary, challenges, deliverables }) {
  return (
    <div className="border-b lg:border-b-0 lg:border-r border-[hsl(var(--surface1))]">
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-14 py-12 md:py-16 border-b border-[hsl(var(--surface1))]"
      >
        <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-6 text-[hsl(var(--subtext1))]">
          Project Overview
        </p>
        <p className="font-barlow text-base md:text-xl leading-relaxed text-[hsl(var(--text))] max-w-4xl whitespace-pre-line">
          {description || summary || "No description provided."}
        </p>
      </motion.div>

      {/* Grid: Challenges & Deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-6 md:px-14 py-12 border-b md:border-b-0 md:border-r border-[hsl(var(--surface1))]"
        >
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-6 text-[hsl(var(--subtext1))]">
            The Challenge
          </p>
          <p className="font-barlow text-sm md:text-base leading-relaxed text-[hsl(var(--text))] opacity-80">
            {challenges || "Navigating strict timelines and complex integrations to deliver a seamless experience."}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-6 md:px-14 py-12"
        >
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-6 text-[hsl(var(--subtext1))]">
            What We Delivered
          </p>
          <ul className="flex flex-col gap-3">
            {deliverables.map((d, idx) => (
              <li
                key={idx}
                className="font-barlow flex items-start gap-3 text-sm md:text-base leading-snug text-[hsl(var(--text))] opacity-80"
              >
                <span className="mt-1.5 w-1.5 h-1.5 flex-shrink-0 bg-[hsl(var(--highlight))]" />
                {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
