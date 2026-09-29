import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

const ServiceHero = () => {
  const rootRef = useRef(null)
  const tagRef = useRef(null)
  const headRef = useRef(null)
  const paraRef = useRef(null)
  const btnRef = useRef(null)
  const rightRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Tag line — fade + slide up
      tl.from(tagRef.current.children, {
        opacity: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.6,
      })

      // Headline words — clip reveal upward
      tl.from(headRef.current, {
        opacity: 0,
        y: 48,
        duration: 0.8,
      }, '-=0.3')

      // Paragraph
      tl.from(paraRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
      }, '-=0.4')

      // Stats / Buttons
      tl.from(btnRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
      }, '-=0.35')

      // Right panel — fade in from right
      tl.from(rightRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.9,
        ease: 'power2.out',
      }, '-=0.6')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className='flex flex-col lg:flex-row lg:h-screen mt-16 lg:mt-10 px-6 md:px-10'>
      <div className='flex flex-col justify-center py-12 lg:py-0 w-full lg:w-[55%] lg:pr-16'>
        <h3 ref={tagRef} className='text-[11px] md:text-[12px] font-medium text-[hsla(var(--lavender)/0.8)] uppercase flex flex-wrap gap-3 md:gap-3 pl-1'>
          <span className='tracking-[.2em]'>Our Services</span>
        </h3>

        <h1
          ref={headRef}
          className='font-Barlow font-[900] uppercase tracking-[-.05em] mt-6 md:mt-10 leading-[0.95]'
          style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
        >
          We{' '}Are{' '}
          <span className='bg-gradient-to-b from-[hsla(var(--text))] to-[hsla(var(--lavender))] bg-clip-text text-transparent'><br />Digital</span>
          <span className='text-[hsla(var(--lavender))]'><br />Partners.</span>
        </h1>

        <div ref={btnRef} className='grid grid-cols-2 gap-x-6 gap-y-10 mt-10 md:mt-16'>
          <div className='flex flex-col'>
            <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--lavender))]'>20+</span>
            <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Projects Delivered</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--lavender))]'>15+</span>
            <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Startup Partners</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--lavender))]'>99.9%</span>
            <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Success Rate</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--lavender))]'>24/7</span>
            <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Availability</span>
          </div>
        </div>
      </div>

      <div ref={rightRef} className='flex flex-col justify-center w-full lg:w-[45%] lg:pl-12 pb-12 lg:pb-0'>
        <p ref={paraRef} className='font-barlow text-lg md:text-[22px] leading-relaxed md:leading-[1.6] text-[hsla(var(--text)/0.8)] max-w-lg'>
          We help businesses embrace change and unlock their full potential through
          innovative technology solutions. From custom software development to
          cloud services and digital transformation, we deliver results that
          matter.
        </p>

        <div className='w-16 h-[2px] bg-[hsla(var(--lavender)/0.4)] mt-10 md:mt-12'></div>

        <div className='flex flex-wrap gap-3 mt-8 md:mt-10'>
          {['Web Development', 'UI/UX Design', 'Cloud Architecture', 'App Development', 'Digital Strategy', 'SEO Optimization'].map(tag => (
            <span key={tag} className='px-4 py-2 text-xs md:text-sm border border-[hsla(var(--lavender)/0.3)] rounded-full text-[hsla(var(--lavender))] bg-[hsla(var(--lavender)/0.05)] hover:bg-[hsla(var(--lavender)/0.1)] transition-colors duration-300 cursor-default font-barlow'>
              {tag}
            </span>
          ))}
        </div>

        <div className='mt-10 md:mt-14'>
          <a href='/contact'>
            <button className='font-barlow bg-[hsla(var(--lavender))] flex justify-center items-center font-bold text-[15px] md:text-[17px] text-[hsla(var(--base))] px-8 py-4 cursor-pointer rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg shadow-[hsla(var(--lavender)/0.2)]'>
              Start a Project
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ServiceHero