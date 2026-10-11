import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const REGIONS = ['India', 'Asia Pacific', 'Middle East', 'Europe', 'North America'];

const AboutSection = () => {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const elements = section.querySelectorAll(".animate-item");
      gsap.from(elements, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* About text */}
        <div className="px-6 md:px-10 lg:px-14 py-14  md:border-r border-[hsla(var(--highlight))]">
          <p className="font-Barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-8 text-[hsla(var(--highlight)/0.8)] animate-item">
            About ZSYIO
          </p>
          <h2 className="font-Barlow text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-8 leading-none animate-item">
            Born in <span className="text-[hsla(var(--highlight))]">India.</span><br />Built for the <span className="text-[hsla(var(--highlight))]">World.</span>
          </h2>
          <div className="space-y-6 max-w-md animate-item">
            <p className="font-Barlow text-sm md:text-base leading-relaxed text-[hsla(var(--text)/0.75)] tracking-wide">
              ZSYIO was founded in India with a global mandate — combining
              world-class engineering talent, battle-tested methodologies, and
              an uncompromising focus on outcomes.
            </p>
            <p className="font-Barlow text-sm md:text-base leading-relaxed text-[hsla(var(--text)/0.75)] tracking-wide">
              As both a consultancy and a product company, we don't just
              advise. We build, ship, and stand behind everything we make —
              from seed-stage platforms to Fortune-500 transformations.
            </p>
            <p className="font-Barlow text-sm md:text-base leading-relaxed text-[hsla(var(--text)/0.75)] tracking-wide">
              Every engagement is led by senior technologists, structured
              around your business goals, and delivered with the precision the
              name ZSYIO has come to mean.
            </p>
          </div>
          <div className="mt-12 animate-item">
            <Link
              to="/about"
              className="bg-[hsla(var(--highlight))] inline-flex justify-center items-center font-bold text-[15px] md:text-[16px] text-[hsla(var(--base))] px-5 py-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--highlight)/0.25)]"
            >
              Discover More About Us
            </Link>
          </div>
        </div>

        {/* Global reach */}
        <div className="px-6 md:px-10 lg:px-14 py-14">
          <p className="font-Barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-8 text-[hsla(var(--highlight)/0.8)] animate-item">
            Global Reach
          </p>
          <div className="flex flex-col">
            {REGIONS.map((region, i) => (
              <div key={region} className="animate-item">
                <div
                  className="flex items-center justify-between py-6 border-b border-[hsla(var(--highlight))] group hover:px-3 transition-all duration-300 cursor-default text-[hsla(var(--text))] hover:text-[hsla(var(--highlight))]"
                >
                  <span className="font-Barlow text-2xl md:text-3xl font-bold uppercase tracking-tight ">
                    {region}
                  </span>
                  {region === 'India' && (
                    <span className="text-[10px] tracking-[0.18em] uppercase font-medium border border-[hsla(var(--highlight))] text-[hsla(var(--highlight))] px-3 py-1">
                      HQ
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

