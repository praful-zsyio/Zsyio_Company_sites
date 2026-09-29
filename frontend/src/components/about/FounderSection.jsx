import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import img from "../../assets/founder_placeholder.jpg"

gsap.registerPlugin(ScrollTrigger);

const FounderSection = () => {
  const comp = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".founder-anim", 
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: comp.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: comp });

  return (
    <section ref={comp} className="border-b border-[hsla(var(--lavender)/0.4)] text-[hsl(var(--text))] ">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Founder Image */}
        <div className="relative border-b lg:border-b-0 lg:border-r border-[hsla(var(--lavender)/0.4)] lg:col-span-5 flex items-center justify-center p-10 md:p-16 lg:p-20 bg-[hsla(var(--base))]">
          <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] overflow-hidden group border border-[hsla(var(--lavender)/0.4)] bg-[hsla(var(--lavender)/0.02)]">
            <img
              src= {img}
              alt="Ayan Magardey"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: 'contrast(1.15)' }}
            />
            
            {/* Subtle gradient overlay to make text readable */}
            <div className="absolute inset-0 bg-linear-to-t from-[hsl(var(--base))] via-transparent to-transparent opacity-90" />
            
            <div className="founder-anim absolute bottom-6 left-6 border-l-4 border-[hsl(var(--lavender))] pl-5">
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif" }} className="text-2xl font-black uppercase text-[hsl(var(--text))] tracking-tight mb-1">
                Ayan Magardey
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold opacity-60 text-[hsl(var(--lavender))]">
                CEO & Co-Founder
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quotation and Belief */}
        <div className="lg:col-span-7 p-10 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-center relative overflow-hidden">
          
          {/* Huge quote mark watermark */}
          <div 
            style={{ fontFamily: "serif" }} 
            className="absolute top-10 right-10 md:right-20 text-[15rem] md:text-[20rem] leading-none text-[hsl(var(--lavender))] opacity-[0.03] select-none pointer-events-none"
          >
            "
          </div>

          <div className="relative z-10 max-w-2xl xl:max-w-3xl">
            <p className="founder-anim text-[11px] tracking-[0.25em] uppercase font-medium mb-10 md:mb-14 text-[hsl(var(--lavender))] opacity-50">
              The Zsyio Standard
            </p>
            
            <h2 
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              className="founder-anim text-2xl md:text-3xl lg:text-4xl font-black uppercase italic leading-[1.1] tracking-tight mb-12 md:mb-16 text-[hsl(var(--lavender))] opacity-90"
            >
              "We don't build software to check boxes. We build it to move the needle."
            </h2>

            <div className="founder-anim w-16 h-[2px] bg-[hsl(var(--lavender))] mb-12 md:mb-16 opacity-40"></div>

            <p className="founder-anim text-base md:text-lg text-[hsl(var(--text))] opacity-70 leading-relaxed max-w-xl">
              We take absolute ownership of your outcomes. No excuses, no padded timelines—just uncompromised delivery.
            </p>

            {/* Impactful pull-quote */}
            <div className="founder-anim mt-12 md:mt-16 border-l-2 border-[hsl(var(--lavender))] pl-6 py-1 max-w-xl">
              <p
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="text-xl md:text-2xl font-bold uppercase italic leading-snug text-[hsl(var(--text))] opacity-90"
              >
                "Mediocrity ships on time. Excellence ships on purpose."
              </p>
              <span className="mt-3 inline-block text-[10px] tracking-[0.2em] uppercase font-semibold text-[hsl(var(--lavender))] opacity-60">
                — Ayan Magardey, CEO
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderSection;
