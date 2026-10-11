import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ParticleText from './ParticleText'

gsap.registerPlugin(ScrollTrigger)

const EnggExcell = () => {
    const rootRef = useRef(null)
    const rightRef = useRef(null)

    useGSAP(() => {
        const section = rootRef.current;
        if (!section) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
            },
            defaults: { ease: 'power3.out' }
        })

        const elements = section.querySelectorAll(".animate-item");
        tl.from(elements, {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
        })
        
        if (rightRef.current) {
            tl.from(rightRef.current, {
                opacity: 0,
                x: 40,
                duration: 0.9,
                ease: 'power2.out',
            }, '-=0.6')
        }
    }, { scope: rootRef })

    return (
        <section ref={rootRef} className='flex flex-col lg:flex-row lg:h-screen mt-8 lg:mt-6 px-6 md:px-10 justify-evenly overflow-hidden'>

            {/* ── Left: text content ── */}
            <div className='flex flex-col py-6 lg:py-0 w-full lg:w-2/5 lg:pr-6 justify-center lg:justify-evenly gap-6 lg:gap-0'>
                <h3 className='animate-item text-[11px] md:text-[12px] font-medium text-[hsla(var(--highlight)/0.8)] uppercase flex flex-wrap gap-3 md:gap-5 pl-1'>
                    <span className='tracking-[.2em]'>Engineering</span>
                    <span className='tracking-[.2em]'>Excellence</span>
                </h3>

                <h1 className='animate-item font-Barlow font-[900] uppercase tracking-[-.05em] leading-[0.95] flex flex-col gap-4 md:gap-6 lg:gap-8 text-6xl md:text-7xl lg:text-8xl'>
                    <span>Precision.</span>
                    <span className='bg-gradient-to-b from-[hsla(var(--text))] to-[hsla(var(--highlight))] bg-clip-text text-transparent'>Complexity.</span>
                    <span className='text-[hsla(var(--highlight))]'>Resolved.</span>
                </h1>

                <p className='animate-item font-serif text-base md:text-lg text-[hsla(var(--text)/0.8)] max-w-lg mt-6 lg:mt-0'>
                    Building enterprise-grade digital infrastructure that drives growth, optimizes performance, and adapts to tomorrow's challenges.
                </p>
            </div>

            {/* ── Right: particle canvas ── */}
            <div
                ref={rightRef}
                className='
          hidden lg:flex
          lg:flex-1 h-auto
          relative
          border-l border-[hsla(var(--highlight))]
        '
            >
                <ParticleText text='System'/>
            </div>

        </section>
    )
}

export default EnggExcell