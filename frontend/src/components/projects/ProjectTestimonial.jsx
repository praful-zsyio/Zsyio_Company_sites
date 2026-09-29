import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectTestimonial({ testimonial, finalOutcome }) {
  const quote = testimonial || finalOutcome || "Transforming operations through scalable digital architecture.";
  
  return (
    <section className="border-t border-b border-[hsl(var(--surface1))] bg-[hsla(var(--lavender)/0.03)] px-6 md:px-14 py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <span className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--lavender))] mb-8 block">
          The Impact
        </span>
        <h2 className="font-Barlow font-black uppercase text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] tracking-tight text-[hsl(var(--text))]">
          "{quote}"
        </h2>
      </motion.div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(10rem,30vw,30rem)] font-Barlow font-black text-[hsla(var(--lavender)/0.02)] select-none pointer-events-none whitespace-nowrap leading-none tracking-tighter">
        IMPACT
      </div>
    </section>
  );
}
