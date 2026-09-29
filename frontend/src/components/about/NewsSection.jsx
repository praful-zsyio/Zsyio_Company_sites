import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const NewsSection = () => {
  const comp = useRef(null);

  useGSAP(() => {
    gsap.from(".news-header", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: comp.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });

    gsap.from(".news-item", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".news-grid",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: comp });

  const newsData = [
    {
      id: 1,
      category: "Company News",
      date: "October 12, 2026",
      title: "Zsyio Expands Global Footprint with New Hub",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      excerpt: "To better serve our growing international client base, we're expanding our focus on AI-driven enterprise solutions across borders."
    },
    {
      id: 2,
      category: "Insights",
      date: "September 28, 2026",
      title: "The Future of Scalable Architecture",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      excerpt: "Our engineering team dives deep into the next evolution of backend systems and how we are preparing our clients for the shift."
    }
  ];

  return (
    <section ref={comp} className="border-b border-[hsla(var(--lavender)/0.4)] bg-transparent text-[hsl(var(--text))] py-20">
      <div className="container mx-auto px-6 md:px-14 max-w-6xl">
        {/* Header */}
        <div className="news-header flex flex-col md:flex-row md:items-end justify-between border-b border-[hsla(var(--lavender)/0.4)] pb-8 mb-12">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsl(var(--lavender))]">
              Latest Updates
            </p>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(3rem, 5vw, 5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.025em",
              }}
              className="font-black uppercase"
            >
              News &<br />Insights.
            </h2>
          </div>
          <a href="#" className="mt-6 md:mt-0 text-xs tracking-[0.15em] uppercase font-bold text-[hsl(var(--lavender))] border-b border-[hsla(var(--lavender)/0.4)] hover:border-[hsl(var(--lavender))] hover:text-white transition-colors pb-1">
            View All Articles
          </a>
        </div>

        {/* 2-Part Grid */}
        <div className="news-grid grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {newsData.map((item) => (
            <article key={item.id} className="news-item group cursor-pointer flex flex-col h-full">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden border border-[hsla(var(--lavender)/0.4)] mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-4 text-[10px] tracking-[0.2em] uppercase font-medium text-[hsl(var(--lavender))] opacity-80">
                <span>{item.category}</span>
                <span className="w-1 h-1 rounded-full bg-[hsl(var(--lavender))] opacity-50" />
                <span>{item.date}</span>
              </div>

              {/* Content */}
              <h3 
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 group-hover:text-[hsl(var(--lavender))] transition-colors"
              >
                {item.title}
              </h3>
              <p className="text-base text-[hsl(var(--subtext1))] leading-relaxed mt-auto">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
