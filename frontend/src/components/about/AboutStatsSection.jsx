import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedStat = ({ value, suffix, label }) => {
  return (
    <div className="flex flex-col p-8 md:p-12 animate-in-view h-full justify-center">
      <div className="flex items-baseline">
        <span 
          style={{ fontFamily: "var(--font-barlow, 'Barlow', sans-serif)" }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-[hsla(var(--highlight))]"
        >
          <span className="scroll-stat-counter">{value}</span>
        </span>
        {suffix && (
          <span 
            style={{ fontFamily: "var(--font-barlow, 'Barlow', sans-serif)" }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-[hsla(var(--highlight))] ml-1"
          >
            {suffix}
          </span>
        )}
      </div>
      <p className="mt-4 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold text-[hsla(var(--text)/0.5)] leading-relaxed">
        {label}
      </p>
    </div>
  );
};

const AboutStatsSection = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Exact same animation params as hero stats but triggered on scroll
    gsap.from('.scroll-stat-counter', {
      textContent: 0,
      duration: 1.5,
      ease: "power2.out",
      snap: { textContent: 1 },
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="border-b border-[hsla(var(--highlight)/0.4)] text-[hsl(var(--text))] bg-transparent">
      <div className="px-6 md:px-14 pt-12 pb-6 border-b border-[hsla(var(--highlight)/0.4)]">
        <div className="animate-in-view">
          <p className="text-[11px] tracking-[0.25em] uppercase font-medium opacity-50">By the Numbers</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="border-r border-[hsla(var(--highlight)/0.4)] border-b md:border-b-0">
          <AnimatedStat value={2} suffix="+" label="Years in Operation" />
        </div>
        <div className="border-b md:border-b-0 md:border-r border-[hsla(var(--highlight)/0.4)]">
          <AnimatedStat value={20} suffix="+" label="Clients Worldwide" />
        </div>
        <div className="border-r border-[hsla(var(--highlight)/0.4)] border-t md:border-t-0">
          <AnimatedStat value={3} suffix="" label="Countries Served" />
        </div>
        <div className="border-t md:border-t-0">
          <AnimatedStat value={15} suffix="+" label="Engineers & Consultants" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[hsla(var(--highlight)/0.4)]">
        <div className="border-r border-[hsla(var(--highlight)/0.4)] border-b md:border-b-0">
          <AnimatedStat value={20} suffix="+" label="Projects Delivered" />
        </div>
        <div className="border-b md:border-b-0 md:border-r border-[hsla(var(--highlight)/0.4)]">
          <AnimatedStat value={99} suffix=".9%" label="Avg. Uptime SLA" />
        </div>
        <div className="border-r border-[hsla(var(--highlight)/0.4)] border-t md:border-t-0">
          <AnimatedStat value={9} suffix="" label="Practice Areas" />
        </div>
        <div className="border-t md:border-t-0">
          <AnimatedStat value={24} suffix="h" label="Response SLA" />
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
