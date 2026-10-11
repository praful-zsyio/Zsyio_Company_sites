import React from "react";
import { motion } from "framer-motion";
import { HIRING_STEPS } from "../../data/careersData";

const HiringProcessSection = () => {
  return (
    <section
      id="hiring-process"
      className="border-b border-[hsl(var(--highlight))] text-[hsl(var(--text))]"
    >
      <div className="px-6 md:px-14 py-12 border-b border-[hsl(var(--highlight))]">
        <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsl(var(--highlight))]">
          How We Hire
        </p>
        <h2
          style={{
            fontSize: "clamp(3rem, 7vw, 7rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.025em",
          }}
          className="font-Barlow font-black uppercase"
        >
          Four Steps. <span className="text-[hsl(var(--highlight))]">No Games.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {HIRING_STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
            className={`p-8 md:p-10 border-b lg:border-b-0 border-[hsl(var(--surface2))] ${
              i !== HIRING_STEPS.length - 1 ? "lg:border-r" : ""
            } ${i % 2 === 0 ? "md:border-r" : "md:border-r-0"} lg:border-r-[hsl(var(--surface2))]`}
          >
            <p
              className="font-Barlow font-black leading-none mb-8"
              style={{
                fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                color: "hsla(var(--highlight)/0.9)",
                letterSpacing: "-0.04em",
              }}
            >
              {step.num}
            </p>
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-3">
              {step.title}
            </h3>
            <p className="text-base text-[hsl(var(--subtext1))] leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HiringProcessSection;
