import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { CAREERS_STATS } from "../../data/careersData";

const CareersHero = ({ onViewRoles, openCount = null }) => {
  const stats = [
    { value: openCount === null ? "—" : String(openCount), label: "Open Roles" },
    ...CAREERS_STATS,
  ];

  return (
    <section
      id="careers-hero"
      className="flex flex-col lg:flex-row pt-28 lg:pt-24 pb-16 px-6 md:px-10 text-[hsl(var(--text))]"
    >
      {/* Left Column */}
      <div className="flex flex-col justify-center w-full lg:w-[60%] lg:pr-16 py-10 border-b lg:border-b-0 lg:border-r border-[hsla(var(--highlight)/0.4)]">
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] md:text-[12px] font-medium font-barlow text-[hsla(var(--highlight)/0.8)] uppercase flex flex-wrap gap-3 md:gap-5 pl-1"
        >
          <span className="tracking-[.2em]">Careers</span>
          <span className="tracking-[.2em]">Indore</span>
          <span className="tracking-[.2em]">Remote-Friendly</span>
        </motion.h3>

        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-Barlow text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-6 mt-4 leading-none"
        >
          Build <br />
          <span className="text-[hsla(var(--highlight))]">What's</span>
          <br /> Next.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-barlow text-lg md:text-xl text-[hsla(var(--text)/0.7)] max-w-xl leading-relaxed"
        >
          We're a small, senior-led technology studio that designs and engineers
          digital products for clients around the world. If you like owning your
          work and shipping things that matter — you'll feel at home here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center gap-6 flex-wrap mt-10"
        >
          <button
            id="careers-view-roles"
            type="button"
            onClick={onViewRoles}
            className="group inline-flex items-center justify-center gap-3 bg-[hsl(var(--text))] text-[hsl(var(--base))] font-barlow font-bold text-[11px] md:text-xs px-10 py-4 uppercase tracking-[0.2em] hover:bg-[hsl(var(--highlight))] transition-colors duration-300 cursor-pointer"
          >
            View Open Roles
            <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
          </button>
          <p className="font-barlow text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-bold text-[hsla(var(--text)/0.5)] leading-relaxed">
            No role that fits? <br /> Send an open application.
          </p>
        </motion.div>
      </div>

      {/* Right Column */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="flex flex-col flex-1 mt-12 lg:mt-0 lg:pl-16 justify-between gap-12"
      >
        <div className="relative flex-1 min-h-[260px] border border-[hsla(var(--highlight)/0.8)] overflow-hidden bg-[hsla(var(--highlight)/0.03)]">
          {/* Decorative concentric rings */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="absolute rounded-full border border-[hsla(var(--highlight))]"
                style={{ width: `${(i + 1) * 22}%`, aspectRatio: "1 / 1" }}
                animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
            <span className="relative w-3 h-3 rounded-full bg-[hsl(var(--highlight))]" />
          </div>
          <p className="absolute bottom-4 left-5 font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsla(var(--highlight)/0.8)]">
            Join the Crew
          </p>
        </div>

        <div className="flex justify-around items-center border-t border-b lg:border-b-0 border-[hsla(var(--highlight)/0.4)] py-6 px-4 bg-[hsla(var(--highlight)/0.02)] flex-wrap gap-4 w-full">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl xl:text-4xl font-bold font-Barlow text-[hsla(var(--highlight))]">
                {stat.value}
              </span>
              <span className="text-[9px] md:text-[10px] text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] font-bold mt-2 text-center max-w-[100px] leading-relaxed">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CareersHero;
