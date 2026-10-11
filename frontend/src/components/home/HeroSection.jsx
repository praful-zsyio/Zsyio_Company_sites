import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import ParticleText from './ParticleText'

const HeroSection = () => {
  const rootRef   = useRef(null)
  const tagRef    = useRef(null)
  const headRef   = useRef(null)
  const paraRef   = useRef(null)
  const btnRef    = useRef(null)
  const rightRef  = useRef(null)

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

      // Buttons
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
    <div ref={rootRef} className='flex flex-col lg:flex-row lg:h-screen mt-16 lg:mt-6 px-6 md:px-10'>

      {/* ── Left: text content ── */}
      <div className='flex flex-col justify-center py-12 lg:py-0 w-full lg:w-2/5 lg:pr-6'>
        <h3 ref={tagRef} className='text-[11px] md:text-[12px] font-medium text-[hsla(var(--highlight)/0.8)] uppercase flex flex-wrap gap-3 md:gap-5 pl-1'>
          <span className='tracking-[.2em]'>IT Consultancy</span>
          <span className='tracking-[.2em]'>Services</span>
          <span className='tracking-[.2em]'>Products</span>
        </h3>

        <h1
          ref={headRef}
          className='font-Barlow font-[900] uppercase tracking-[-.05em] mt-6 md:mt-10 leading-[0.95]'
          style={{ fontSize: 'clamp(3rem, 8vw, 7.8rem)' }}
        >
          Crafting the{' '}
          <span className='text-[hsla(var(--highlight))]'>Current</span>
        </h1>

        <p ref={paraRef} className='mt-6 md:mt-8 font-serif text-base md:text-lg text-[hsla(var(--text)/0.8)] max-w-lg'>
          We are a team of innovative thinkers and problem solvers dedicated to
          providing high-quality software development and technology consulting
          services to businesses worldwide.
        </p>

        <div ref={btnRef} className='flex flex-wrap gap-4 mt-6 md:mt-8'>
          <a href='/services'>
            <button className='bg-[hsla(var(--highlight))] flex justify-center items-center font-bold text-[15px] md:text-[16px] text-[hsla(var(--base))] px-5 py-3 cursor-pointer'>
              Explore Our Services
            </button>
          </a>
          <a href='/contact'>
            <button className='flex justify-center items-center font-bold text-[15px] md:text-[16px] text-[hsla(var(--highlight))] px-3 py-3 underline cursor-pointer'>
              Contact Us
            </button>
          </a>
        </div>
      </div>

      {/* ── Right: particle canvas — desktop/laptop only ── */}
      <div
        ref={rightRef}
        className='
          hidden lg:flex
          flex-1 h-auto
          relative
          border-l border-[hsla(var(--highlight))]
        '
      >
        <ParticleText text='ZSYIO' />
      </div>

    </div>
  )
}

export default HeroSection
