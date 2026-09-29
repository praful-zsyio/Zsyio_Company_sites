import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServicesGrid from '../services/ServicesGrid';

gsap.registerPlugin(ScrollTrigger);


const Services = () => {
  const sectionRef = useRef(null);
  const tagRef     = useRef(null);
  const headRef    = useRef(null);
  const subRef     = useRef(null);
  const linkRef    = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          // play on scroll down, stay visible, reverse only on scroll back up
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // Tag spans stagger in
      tl.from(tagRef.current.children, {
        opacity: 0,
        y: 16,
        stagger: 0.07,
        duration: 0.5,
      })

      // "Services" headline
      .from(headRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.7,
      }, '-=0.3')

      // Subtitle
      .from(subRef.current, {
        opacity: 0,
        x: 24,
        duration: 0.5,
      }, '-=0.4')

      // "View All" link
      .from(linkRef.current, {
        opacity: 0,
        y: 12,
        duration: 0.4,
      }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='mt-16 lg:mt-24 px-6 md:px-10 w-full'>

      {/* ── Section header ── */}
      <div className='flex justify-between lg:items-center flex-col lg:flex-row mb-8 lg:mb-12'>
        <div>
          <h3 ref={tagRef} className='text-[11px] md:text-[12px] font-medium text-[hsla(var(--lavender)/0.8)] uppercase flex flex-wrap gap-3 md:gap-5 pl-1 mb-2'>
            <span className='tracking-[.2rem]'>What </span>
            <span className='tracking-[.2rem]'>we </span>
            <span className='tracking-[.2rem]'>do</span>
          </h3>
          <h1 ref={headRef} className='text-[2.5rem] lg:text-[5rem] font-black font-Barlow uppercase leading-none'>
            Services
          </h1>
        </div>
        <h6 ref={subRef} className='text-[0.8rem] font-Barlow uppercase mt-3 lg:mt-0 max-w-xs text-right'>
          Multiple disciplines. One team.<br />everything built as a <span className='text-[hsl(var(--lavender))] font-medium'>masterpiece</span>.
        </h6>
      </div>

      {/* ── Responsive services grid — self-animates with GSAP stagger ── */}
      <ServicesGrid limit={6} />

      {/* ── View all link ── */}
      <div ref={linkRef} className='flex justify-center mb-16'>
        <a
          href='/services'
          className='text-[0.8rem] font-Barlow uppercase tracking-[.15rem] text-[hsl(var(--lavender))] underline underline-offset-4 hover:opacity-70 transition-opacity'
        >
          View All Services
        </a>
      </div>

    </section>
  );
};

export default Services;