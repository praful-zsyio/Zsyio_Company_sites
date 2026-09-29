import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { VALUES } from "../../data/aboutData/aboutValues";

gsap.registerPlugin(ScrollTrigger);

const ValueCard = ({ v, index }) => {
  // Checkerboard alternating borders
  const isRightCol = index % 2 !== 0;

  return (
    <div className={`value-card relative overflow-hidden p-8 md:p-14 border-b border-[hsl(var(--surface2))] ${isRightCol ? "" : "md:border-r md:border-r-[hsl(var(--surface2))]"}`}>
      <div className="relative z-10 text-sm font-semibold text-[hsl(var(--lavender))] mb-8 font-mono">
        {v.num} —
      </div>
      <h3 className="relative z-10 text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
        {v.title}
      </h3>
      <p className="relative z-10 text-base text-[hsl(var(--subtext1))] leading-relaxed max-w-sm">
        {v.description}
      </p>
      <span
        aria-hidden
        className="font-Barlow font-black uppercase absolute pointer-events-none select-none z-0"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(5rem, 12vw, 14rem)",
          lineHeight: 0.85,
          right: "-0.04em",
          top: "-0.08em",
          color: "hsla(var(--lavender)/0.15)",
          letterSpacing: "-0.04em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
};

const ValuesSection = () => {
  const comp = useRef(null);

  useGSAP(() => {
    // Header animation
    gsap.from(".values-header-fade-up", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".values-header-container",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });

    // Cards animation
    gsap.from(".value-card", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".values-grid",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: comp });

  return (
    <section ref={comp} className="border-b border-[hsl(var(--lavender))] text-[hsl(var(--text))]">
      {/* Header */}
      <div className="values-header-container px-6 md:px-14 py-12 border-b border-[hsl(var(--lavender))] grid grid-cols-1 md:grid-cols-2 items-end gap-0">
        <div className="values-header-fade-up">
          <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsl(var(--lavender))]">
            How We Work
          </p>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(3rem, 7vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.025em",
            }}
            className="font-black uppercase text-[hsl(var(--text))]"
          >
            Core{' '}
            <span className="text-[hsl(var(--lavender))]">Values.</span>
          </h2>
        </div>
        <div className="values-header-fade-up mt-4 md:mt-0 md:pl-14">
          <p className="text-base leading-relaxed text-[hsl(var(--subtext1))] max-w-sm">
            Six non-negotiable commitments — to our clients, our team, and the
            quality of our work.
          </p>
        </div>
      </div>

      {/* 2-col checkerboard grid */}
      <div className="values-grid grid grid-cols-1 md:grid-cols-2">
        {VALUES.map((v, i) => (
          <ValueCard key={v.num} v={v} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ValuesSection;
