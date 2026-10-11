import React from "react";
import { motion } from "framer-motion";

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const MissionVisionSection = () => {
  return (
    <section className="border-b border-[hsla(var(--highlight)/0.4)] text-[hsl(var(--text))] bg-transparent py-20 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2 items-start mb-16">
          <FadeUp delay={0} className="md:pr-8 md:border-r border-[hsla(var(--highlight)/0.4)]">
            <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-6 opacity-50">
              Why we exist
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-[hsl(var(--highlight))] mb-6" style={{ fontFamily: "var(--font-barlow, 'Barlow', sans-serif)" }}>
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed opacity-70">
              To design and deliver innovative, scalable technology products that empower businesses to operate smarter, grow faster, and excel in an ever-evolving digital ecosystem.
            </p>
          </FadeUp>

          <FadeUp delay={0.2} className="md:pl-8">
            <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-6 opacity-50">
              Where we&apos;re going
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-[hsl(var(--highlight))] mb-6" style={{ fontFamily: "var(--font-barlow, 'Barlow', sans-serif)" }}>
              Our Vision
            </h2>
            <p className="text-lg leading-relaxed opacity-70">
              To be a global leader in innovative technology products, delivering scalable, high-impact digital solutions that empower businesses worldwide and set new standards for quality, performance, and customer experience.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.4} className="pt-12 border-t border-[hsla(var(--highlight)/0.4)] grid gap-8 md:grid-cols-3 text-sm">
          <div className="md:pr-6 md:border-r border-[hsla(var(--highlight)/0.4)] last:border-r-0">
            <p className="text-[11px] tracking-[0.2em] uppercase font-medium opacity-40 mb-3 text-[hsl(var(--highlight))]">
              Outcomes
            </p>
            <p className="opacity-70 leading-relaxed">
              We map each initiative back to clear product and business goals.
            </p>
          </div>
          <div className="md:px-6 md:border-r border-[hsla(var(--highlight)/0.4)] last:border-r-0">
            <p className="text-[11px] tracking-[0.2em] uppercase font-medium opacity-40 mb-3 text-[hsl(var(--highlight))]">
              Long-term
            </p>
            <p className="opacity-70 leading-relaxed">
              We prioritize strong architecture, smooth developer experience, and high product quality.
            </p>
          </div>
          <div className="md:pl-6">
            <p className="text-[11px] tracking-[0.2em] uppercase font-medium opacity-40 mb-3 text-[hsl(var(--highlight))]">
              Embedded
            </p>
            <p className="opacity-70 leading-relaxed">
              Our designers and engineers work directly with your team, side by side.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default MissionVisionSection;
