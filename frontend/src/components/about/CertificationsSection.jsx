import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
  { code: 'ISO 27001', label: 'Information Security Management' },
  { code: 'SOC 2 Type II', label: 'Service Organisation Controls' },
  { code: 'AWS Advanced', label: 'Consulting Partner' },
  { code: 'GDPR', label: 'Compliant Practices' },
  { code: 'DPDP 2023', label: 'India Data Protection Act' },
  { code: 'PCI DSS', label: 'Payment Card Industry Standards' },
];

const CertificationsSection = () => {
  const comp = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".cert-header-fade", 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-header-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );

    gsap.fromTo(".cert-card", 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: comp });

  return (
    <section ref={comp} className="border-b border-[hsla(var(--lavender)/0.4)] text-[hsl(var(--text))] bg-transparent">
      {/* Header */}
      <div className="cert-header-container px-6 md:px-14 py-16 border-b border-[hsla(var(--lavender)/0.4)]">
        <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-10">
          <div className="cert-header-fade">
            <p className="text-[11px] tracking-[0.25em] uppercase font-bold mb-3 text-[hsl(var(--lavender))]">
              Trust & Standards
            </p>
            <h2
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.9, letterSpacing: '-0.025em' }}
              className="font-black uppercase"
            >
              Certified<br />Quality.
            </h2>
          </div>
          <div className="cert-header-fade md:pl-14">
            <p className="text-base md:text-lg leading-relaxed text-[hsl(var(--subtext1))] max-w-md">
              We work with the tools that fit the problem — not the tools we sell. Our certifications reflect real practice and strict global compliance, not marketing fluff.
            </p>
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="cert-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((c, i) => (
          <div 
            key={c.code} 
            className={`cert-card px-8 md:px-12 py-12 md:py-16 border-b border-[hsla(var(--lavender)/0.4)] group hover:bg-[hsl(var(--lavender))] hover:text-[hsl(var(--base))] transition-all duration-300 cursor-default md:border-r ${i % 2 === 1 ? 'md:border-r-0 lg:border-r' : ''} ${i % 3 === 2 ? 'lg:border-r-0' : ''}`}
          >
            <div className="flex flex-col justify-between h-full min-h-[140px]">
              {/* Little box icon that fills on hover */}
              <div className="w-4 h-4 border-2 border-[hsl(var(--lavender))] group-hover:border-[hsl(var(--base))] group-hover:bg-[hsl(var(--base))] transition-colors mb-8" />
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif" }} className="text-3xl md:text-5xl font-black uppercase mb-3 tracking-tight">
                  {c.code}
                </div>
                <div className="text-[11px] tracking-[0.2em] uppercase font-bold opacity-60 group-hover:opacity-90">
                  {c.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
