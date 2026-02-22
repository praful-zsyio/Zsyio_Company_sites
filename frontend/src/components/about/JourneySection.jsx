import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const JourneySection = () => {
  const component = useRef();
  const trackRef = useRef();

  const milestones = [
    { year: "2019", title: "Founded", desc: "Started with a focused vision — building scalable digital systems for ambitious founders who needed execution speed without compromising architecture." },
    { year: "2020", title: "First Product Launches", desc: "Designed and shipped early-stage SaaS platforms across web and mobile, establishing strong UI engineering and backend foundations." },
    { year: "2021", title: "Scaling Infrastructure", desc: "Migrated systems to cloud-native environments with CI/CD pipelines and containerized deployments." },
    { year: "2022", title: "Cloud & AI Expansion", desc: "Integrated distributed systems and AI-powered workflows for automation and intelligent orchestration." },
    { year: "2023", title: "Enterprise Architecture", desc: "Delivered multi-tenant platforms and scalable APIs supporting high-growth organizations globally." },
    { year: "2024", title: "Global Partnerships", desc: "Became long-term product engineering partner for international teams with roadmap alignment." },
    { year: "2025", title: "Agentic AI Systems", desc: "Built autonomous AI workflows and intelligent agents capable of contextual reasoning." },
    { year: "2026", title: "Platform Innovation", desc: "Evolved into a full-stack product innovation partner delivering ERP and AI-integrated ecosystems." },
  ];
  const wrapperRef = useRef();

useGSAP(
  () => {
    if (window.innerWidth < 768) return;

    const track = trackRef.current;
    const wrapper = wrapperRef.current;

    const getScrollAmount = () => {
  const totalWidth = track.scrollWidth;
  const visibleWidth = wrapper.offsetWidth;

  const overshoot = visibleWidth * 0.08; // 8% extra slide

  return totalWidth - visibleWidth + overshoot;
};

    const tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: component.current,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        scrub: 4,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  },
  { scope: component }
);

  return (
    <section
      ref={component}
      className="relative h-auto md:h-screen overflow-hidden bg-[hsl(var(--mantle))]"
    >
      <div className="container mx-auto px-[5vw] h-full flex flex-col justify-center py-16 md:py-0">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[hsl(var(--subtext0))] mb-5">
            Our Journey
          </p>

          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.1] tracking-[-0.01em] mb-6">
            A timeline of
            <br />
            <span className="bg-linear-to-r from-[hsl(var(--yellow))] to-[hsl(var(--blue))] bg-clip-text text-transparent">
              growth & evolution.
            </span>
          </h2>

          <p className="text-[hsl(var(--subtext1))] text-sm md:text-base leading-relaxed">
            From focused beginnings to global partnerships, each milestone strengthened our engineering foundation.
          </p>
        </div>

        {/* Track */}
        <div ref={wrapperRef} className="overflow-hidden w-full">
          <div
            ref={trackRef}
            className="
              flex flex-col md:flex-row
              gap-8 md:gap-[4vw]
            "
          >
            {milestones.map((item, index) => (
              <div
                key={index}
                className="
                  w-full md:w-[calc(50vw-4vw)]
                  shrink-0
                  p-8 md:p-10
                  rounded-3xl
                  border border-[hsl(var(--surface2))]
                  bg-[hsl(var(--base))]/60
                  backdrop-blur-sm
                  flex flex-col justify-between
                  transition-all duration-500
                  hover:-translate-y-3
                  hover:border-[hsl(var(--yellow))]/40
                "
              >
                <div>
                  <p className="text-[hsl(var(--yellow))] text-sm font-semibold mb-4">
                    {item.year}
                  </p>

                  <h3 className="text-xl md:text-2xl font-semibold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[hsl(var(--subtext1))] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="text-[hsl(var(--surface2))] text-xs tracking-widest uppercase mt-6">
                  Milestone
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default JourneySection;