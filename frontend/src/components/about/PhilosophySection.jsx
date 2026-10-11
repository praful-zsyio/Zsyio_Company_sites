import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHIES = [
  {
    num: "01",
    title: "Function Dictates Form.",
    desc: "Aesthetics are meaningless if the underlying architecture is fragile. We engineer for absolute scale and performance first, then we polish for the award."
  },
  {
    num: "02",
    title: "Zero Abstraction Bloat.",
    desc: "In an era of endless frameworks and bloated libraries, we prefer to stay close to the metal. We choose the right tool for the job, not the hyped tool."
  },
  {
    num: "03",
    title: "Radical Transparency.",
    desc: "No black boxes. No hidden hours. No account managers acting as firewalls. We build in the open with you, treating your product exactly as if it were our own."
  }
];

const PhilosophySection = () => {
  const comp = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: comp.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".phil-title", {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.05,
    })
    .from(".phil-divider", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.4,
      ease: "power3.inOut",
    }, "-=0.3")
    .from(".phil-item", {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "power3.out",
    }, "-=0.2");

  }, { scope: comp });

  return (
    <section ref={comp} className="relative py-24 md:py-32 bg-transparent text-[hsl(var(--text))] overflow-hidden border-b border-[hsla(var(--highlight)/0.4)]">

      <div className="container mx-auto px-6 md:px-14 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
          
          {/* Left: Heading */}
          <div className="flex flex-col justify-start">
            <div className="overflow-hidden mb-6">
              <p className="phil-title text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))]">
                Our Philosophy
              </p>
            </div>
            <div className="overflow-hidden">
              <h2 
                style={{ fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 0.9 }}
                className="phil-title text-[clamp(3rem,6vw,6rem)] font-black uppercase tracking-tight"
              >
                We Don't <span className="text-[hsl(var(--highlight))] inline-block ">Just</span><br />Write <span className="text-[hsl(var(--highlight))]">Code.</span>
              </h2>
            </div>
            <div className="overflow-hidden mt-6">
              <p className="phil-title text-lg md:text-xl text-[hsl(var(--subtext1))] leading-relaxed max-w-md">
                Engineering is an art form. It requires discipline, brutal honesty, and a refusal to settle for "good enough." This is how we think.
              </p>
            </div>
          </div>

          {/* Right: Items */}
          <div className="flex flex-col">
            <div className="phil-divider w-full h-[1px] bg-[hsla(var(--highlight)/0.4)] mb-12 hidden lg:block" />
            
            <div className="flex flex-col space-y-16">
              {PHILOSOPHIES.map((p, i) => (
                <div key={p.num} className="phil-item group relative">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    <span 
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      className="text-5xl md:text-7xl font-black text-[hsl(var(--highlight))] opacity-30 group-hover:opacity-100 transition-opacity duration-500 leading-none"
                    >
                      {p.num}
                    </span>
                    <div>
                      <h3 
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4"
                      >
                        {p.title}
                      </h3>
                      <p className="text-base md:text-lg text-[hsl(var(--subtext1))] leading-relaxed max-w-xl">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
