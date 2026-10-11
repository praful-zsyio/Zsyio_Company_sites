import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ImageSplitSection = () => {
  const comp = useRef(null);

  useGSAP(() => {
    gsap.from(".split-image-container", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: comp.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: comp });

  return (
    <section ref={comp} className="border-b border-[hsla(var(--highlight)/0.4)] grid grid-cols-1 md:grid-cols-2 text-[hsl(var(--text))] bg-transparent">
      {/* Left Image */}
      <div className="split-image-container relative overflow-hidden border-b md:border-b-0 md:border-r border-[hsla(var(--highlight)/0.4)] min-h-[400px] md:min-h-[560px]">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=700&fit=crop&auto=format"
          alt="Team Collaboration"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(100%) contrast(1.1)' }}
        />
        {/* Overlay caption */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[hsla(var(--highlight)/0.4)] bg-[hsl(var(--base))] px-6 py-4">
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))]">Our Culture</p>
        </div>
      </div>

      {/* Right Image */}
      <div className="split-image-container relative overflow-hidden min-h-[400px] md:min-h-[560px]">
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=700&fit=crop&auto=format"
          alt="Office Space"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(100%) contrast(1.1)' }}
        />
        {/* Overlay caption */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[hsla(var(--highlight)/0.4)] bg-[hsl(var(--base))] px-6 py-4">
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))]">Innovation</p>
        </div>
      </div>
    </section>
  );
};

export default ImageSplitSection;
