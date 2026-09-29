import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    year: "OCT '25",
    title: "The Inception",
    body: "Founded with a singular vision: to strip away agency bloat and deliver pure, high-impact engineering. Two engineers, zero overhead, and an obsession with quality.",
  },
  {
    year: "NOV '25",
    title: "First Client Onboarded",
    body: "Secured our first major contract just weeks after launch. We demonstrated immediately that our agile, no-nonsense approach could outmaneuver traditional agencies.",
  },
  {
    year: "JAN '26",
    title: "The First Wave",
    body: "Successfully architected and deployed our first three major web platforms, setting the structural baseline for our engineering methodology.",
  },
  {
    year: "MAR '26",
    title: "Expanding the Core",
    body: "Brought on specialized UI/UX talent. We refused to compromise on aesthetics, ensuring our robust technical architecture was matched by world-class, premium design.",
  },
  {
    year: "MAY '26",
    title: "Digital Excellence",
    body: "Hit a major milestone: successfully delivering 10 bespoke, high-performance websites for global clients, setting a new standard for modern web architecture.",
  },
  {
    year: "JUL '26",
    title: "Strategic Scaling",
    body: "Formed key infrastructure partnerships. We adopted advanced cloud-native practices to ensure the platforms we were building could scale to millions of users seamlessly.",
  },
  {
    year: "AUG '26",
    title: "Product Engineering",
    body: "Transitioned from web presence to core business infrastructure. We engineered and launched 5 complex digital products, including scalable SaaS platforms and robust AI integrations.",
  },
  {
    year: "SEP '26",
    title: "Global Reach",
    body: "Expanded our operational capacity to support international clients across 3 different countries, proving our remote-first execution model on a global scale.",
  },
  {
    year: "OCT '26",
    title: "One Year Strong",
    body: "Twelve months of relentless execution. With 10 world-class websites and 5 enterprise products shipped, we solidified our methodology into the foundation we stand on today.",
  },
  {
    year: "FUTURE",
    title: "The Next Era",
    body: "The momentum only accelerates. We are expanding our focus into next-generation AI systems and immersive cloud experiences, building the digital tools of tomorrow.",
  },
];

const JourneySection = () => {
  const comp = useRef(null);

  useGSAP(() => {
    gsap.from(".journey-header-fade", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".journey-header",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });

    gsap.from(".journey-row", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".journey-list",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: comp });

  return (
    <section ref={comp} className="border-b border-[hsla(var(--lavender)/0.4)] text-[hsl(var(--text))] bg-transparent">
      <div className="journey-header px-6 md:px-14 py-12 border-b border-[hsla(var(--lavender)/0.4)]">
        <div className="journey-header-fade flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsl(var(--lavender))]">A Great Future</p>
            <h2
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.9, letterSpacing: '-0.025em' }}
              className="font-black uppercase"
            >
              Our Journey.
            </h2>
          </div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[hsl(var(--lavender))] opacity-60 font-medium hidden md:block">OCT '25 — FUTURE</span>
        </div>
      </div>

      <div className="journey-list">
        {TIMELINE.map((t, i) => (
          <div key={t.year} className="journey-row border-b border-[hsla(var(--lavender)/0.4)] last:border-b-0 grid grid-cols-[160px_1fr] md:grid-cols-[280px_1fr] group hover:bg-[hsla(var(--lavender)/0.03)] transition-colors">
            <div className="py-10 px-6 md:px-12 border-r border-[hsla(var(--lavender)/0.4)] flex flex-col items-start justify-center">
              <span
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="text-2xl md:text-5xl font-black text-[hsl(var(--lavender))] opacity-40 group-hover:opacity-80 transition-opacity whitespace-nowrap"
              >
                {t.year}
              </span>
            </div>
            <div className="py-10 px-6 md:px-14">
              <h3
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="text-xl md:text-3xl font-black uppercase tracking-tight mb-3"
              >
                {t.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-[hsl(var(--subtext1))]">{t.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JourneySection;