import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import AboutHero from "../components/about/AboutHero";

import StorySection from "../components/about/StorySection";
import AboutStatsSection from "../components/about/AboutStatsSection";
import MissionVisionSection from "../components/about/MissionVisionSection";
import ValuesSection from "../components/about/ValuesSection";
import ProcessSection from "../components/about/ProcessSection";
import IndustriesSection from "../components/about/IndustriesSection";
import CtaSection from "../components/about/CtaSection";
import AboutMarquee from "../components/about/AboutMarquee";
import ImageSplitSection from "../components/about/ImageSplitSection";
import JourneySection from "../components/about/JourneySection";
import PhilosophySection from "../components/about/PhilosophySection";
import CertificationsSection from "../components/about/CertificationsSection";
import FounderSection from "../components/about/FounderSection";
import { usePageSEO } from "../utils/seo";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const comp = useRef(null);

  usePageSEO({
    title: "About Us | Engineering Excellence & Vision",
    description: "Learn about Zsyio's mission, engineering principles, leadership, and our commitment to building mission-critical enterprise systems.",
    url: "/about",
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // --- SCROLL-BASED ANIMATIONS (after hero sequence) ---
          const animateIn = (selector, vars = {}) => {
            gsap.utils.toArray(selector).forEach((el) => {
              gsap.from(el, {
                opacity: 0,
                y: 40,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
                ...vars,
              });
            });
          };
          animateIn(".animate-in-view");
        },
      });

      // 1. Animate hero text content
      tl.from(".hero-content > *", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
      });

      // 2. Animate numbers after hero text
      tl.from(".stat-number", {
        textContent: 0,
        duration: 1.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.2,
      }, "-=0.5"); // Overlap with hero animation slightly
    },
    { scope: comp }
  );

  return (
    <div
      ref={comp}
    >
      <AboutHero />
      <AboutMarquee
        items={['Crafting the Current', 'Since 2025', 'Indore, India', 'Globally Delivered', '20+ Clients', '3 Countries', 'Senior-Led', 'Outcome-Driven']}
        dark={true}
        speed={8}
      />
      <StorySection />
      <AboutStatsSection />
      <MissionVisionSection />
      <ValuesSection />
      <AboutMarquee
        items={['UI/UX Design', 'Web Development', 'Mobile Applications', 'Cloud Architecture', 'E-Commerce Solutions', 'AI & Machine Learning', 'DevOps & Scaling', 'Product Strategy']}
        dark={false}
        speed={45}
      />
      <ProcessSection />
      <ImageSplitSection />
      <JourneySection />
      <PhilosophySection />
      <CertificationsSection />
      <IndustriesSection />
      <AboutMarquee
        items={['India', 'United States', 'United Kingdom', 'Germany', 'Japan', 'South Korea', 'Singapore', 'Israel', 'Canada', 'France', 'Australia','New Zealand', 'Netherlands', 'Sweden', 'Switzerland', 'Finland', 'Taiwan', 'Ireland', 'Denmark', 'Norway', 'Estonia']}
        dark={true}
        speed={55}
      />
      {/* <FounderSection /> */}
      <CtaSection />
    </div>
  );
};

export default AboutUs;
