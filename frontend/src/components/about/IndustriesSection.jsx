import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Globe2,
  HeartPulse,
  Banknote,
  ShoppingBag,
  Cpu,
  Building2,
  BookOpen,
} from "lucide-react";
import { industries } from "../../data/aboutData/aboutIndustries";

gsap.registerPlugin(ScrollTrigger);

const getIndustryIcon = (id) => {
  switch (id) {
    case "healthcare":
      return HeartPulse;
    case "fintech":
      return Banknote;
    case "ecommerce":
      return ShoppingBag;
    case "saas":
      return Cpu;
    case "realestate":
      return Building2;
    case "education":
      return BookOpen;
    default:
      return Globe2;
  }
};

const getIndustryTagline = (id) => {
  switch (id) {
    case "healthcare":
      return "Patient-first digital experiences.";
    case "fintech":
      return "Secure, real-time systems.";
    case "ecommerce":
      return "Conversion-focused buying journeys.";
    case "saas":
      return "Scalable modern platforms.";
    case "realestate":
      return "Operational clarity & visibility.";
    case "education":
      return "Engaging learning ecosystems.";
    case "ai":
      return "Intelligent automation & analysis.";
    case "logistics":
      return "Efficiency via real-time data.";
    default:
      return "Specialized digital solutions.";
  }
};

const IndustriesSection = () => {
  const comp = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    // Scroll-driven spy: updates activeIndex when an item reaches the center of the viewport
    industries.forEach((_, i) => {
      ScrollTrigger.create({
        trigger: `.ind-item-${i}`,
        start: "top 60%",
        end: "bottom 60%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveIndex(i);
          }
        }
      });
    });
  }, { scope: comp });

  // Animate the right side icon when activeIndex changes
  useEffect(() => {
    gsap.fromTo(".sticky-icon-anim",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, [activeIndex]);

  const activeIndustry = industries[activeIndex] || industries[0];
  const ActiveIcon = getIndustryIcon(activeIndustry.id);

  return (
    <section ref={comp} className="relative border-b border-[hsla(var(--lavender)/0.4)] text-[hsl(var(--text))] bg-transparent">
      
      <div className="container mx-auto max-w-6xl relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] items-start gap-12 lg:gap-20">
          
          {/* Left Side: Scrolling List */}
          <div className="flex flex-col pt-16 pb-24">
            
            <div className="mb-16 border-b border-[hsla(var(--lavender)/0.4)] pb-8">
              <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsl(var(--lavender))] opacity-50">
                Where We Build
              </p>
              <h2
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="text-4xl md:text-5xl font-black uppercase tracking-tight"
              >
                Industries.
              </h2>
            </div>

            <div className="flex flex-col">
              {industries.map((industry, i) => {
                const isActive = activeIndex === i;
                const Icon = getIndustryIcon(industry.id);
                const tagline = getIndustryTagline(industry.id);
                const sectorNumber = String(i + 1).padStart(2, "0");

                return (
                  <div 
                    key={industry.id} 
                    className={`ind-item-${i} flex flex-col transition-all duration-300 border-b border-[hsla(var(--lavender)/0.4)] last:border-b-0 py-8 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--lavender))] opacity-60">
                        Sector {sectorNumber}
                      </span>
                      {/* Mobile icon */}
                      <div className="w-6 h-6 flex items-center justify-center text-[hsl(var(--lavender))] lg:hidden">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <h3 
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }} 
                      className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[hsl(var(--text))] mb-2"
                    >
                      {industry.name}
                    </h3>
                    
                    <p className="text-sm text-[hsl(var(--subtext1))] leading-relaxed max-w-sm">
                      {tagline}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Sticky Display */}
          <div className="hidden lg:flex sticky top-0 h-screen items-center justify-center">
             
             <div className="w-full max-w-[320px] aspect-[4/5] border border-[hsla(var(--lavender)/0.4)] bg-[hsl(var(--base))] flex flex-col p-8 relative group overflow-hidden">
                
                {/* Background Watermark Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none">
                  <ActiveIcon key={`bg-${activeIndustry.id}`} className="sticky-icon-anim w-full h-full text-[hsl(var(--lavender))] opacity-[0.04]" />
                </div>
                
                {/* Header */}
                <div className="w-full flex justify-between items-start mb-auto z-10">
                   <div className="w-12 h-12 border border-[hsla(var(--lavender)/0.4)] bg-[hsl(var(--base))] flex items-center justify-center text-[hsl(var(--lavender))]">
                      <ActiveIcon key={`fg-${activeIndustry.id}`} className="sticky-icon-anim w-6 h-6" />
                   </div>
                   <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--lavender))] opacity-50 sticky-icon-anim mt-2">
                     {String(activeIndex + 1).padStart(2, "0")}
                   </span>
                </div>
                
                {/* Footer */}
                <div className="w-full pt-4 z-10">
                   <span style={{ fontFamily: "'Barlow Condensed', sans-serif" }} className="text-2xl font-black uppercase text-[hsl(var(--text))] sticky-icon-anim block tracking-tight">
                     {activeIndustry.name}
                   </span>
                </div>
                
             </div>
             
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
