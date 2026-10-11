import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROCESS } from "../../data/aboutData/aboutProcess";

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const comp = useRef(null);

  useGSAP(() => {
    // Header animation
    gsap.from(".process-header-fade-up", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".process-header-container",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });

    // Rows animation
    gsap.from(".process-row", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".process-list",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: comp });

  return (
    <section ref={comp} className="border-b border-[hsla(var(--highlight)/0.4)] text-[hsl(var(--text))] bg-transparent">
      {/* Header */}
      <div className="process-header-container px-6 md:px-14 py-12 border-b border-[hsla(var(--highlight)/0.4)]">
        <div className="process-header-fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-0">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsl(var(--highlight))]">
                Our Methodology
              </p>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(3rem, 7vw, 7rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.025em",
                }}
                className="font-black uppercase"
              >
                How We<br />Work.
              </h2>
            </div>
            <div className="mt-6 md:mt-0 md:pl-14">
              <p className="text-base leading-relaxed text-[hsl(var(--subtext1))] max-w-md">
                Five phases. No exceptions. We've delivered the same methodology for 2 years because it works — not because we haven't thought to change it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process steps */}
      <div className="process-list">
        {PROCESS.map((p, i) => (
          <div
            key={p.num}
            className="process-row border-b border-[hsla(var(--highlight)/0.4)] last:border-b-0 grid grid-cols-[160px_1fr] md:grid-cols-[280px_1fr] hover:bg-[hsla(var(--highlight)/0.03)] transition-colors group"
          >
            {/* Left: number + phase label */}
            <div className="border-r border-[hsla(var(--highlight)/0.4)] px-6 md:px-12 py-10 flex flex-col justify-between">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-[hsl(var(--highlight))] opacity-80">{p.num}</span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
                className="text-xs tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))] opacity-60 mt-4 self-end rotate-180 hidden md:block"
              >
                {p.label}
              </span>
            </div>

            {/* Right: content */}
            <div className="px-6 md:px-14 py-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  className="text-2xl md:text-4xl font-black uppercase tracking-tight"
                >
                  {p.title}
                </h3>
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium border border-[hsla(var(--highlight)/0.4)] text-[hsl(var(--highlight))] px-2 py-1 md:hidden">
                  {p.label}
                </span>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-[hsl(var(--subtext1))] max-w-2xl">
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;