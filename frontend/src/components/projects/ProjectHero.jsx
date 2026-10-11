import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectHero({ title, duration, teamSize, year, industry, summary, stack, scope, finalLiveUrl }) {
  return (
    <section className='flex flex-col lg:flex-row mt-16 lg:mt-10 px-6 md:px-10 border-b border-[hsl(var(--surface1))] pb-12'>
      <div className='flex flex-col justify-center py-12 lg:py-0 w-full lg:w-[55%] lg:pr-16'>
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-[11px] md:text-[12px] font-medium text-[hsla(var(--highlight)/0.8)] uppercase flex flex-wrap gap-3 md:gap-3 pl-1'
        >
          <span className='tracking-[.2em]'>Project Details</span>
        </motion.h3>

        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className='font-Barlow font-[900] uppercase tracking-[-.05em] mt-6 md:mt-10 leading-[0.95]'
          style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='grid grid-cols-2 gap-x-6 gap-y-10 mt-10 md:mt-16'
        >
          <div className='flex flex-col'>
             <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--highlight))]'>{duration.split(' ')[0] || duration}</span>
             <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Duration</span>
          </div>
          <div className='flex flex-col'>
             <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--highlight))]'>{teamSize.split(' ')[0] || teamSize}</span>
             <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Team Size</span>
          </div>
          <div className='flex flex-col'>
             <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--highlight))]'>{year}</span>
             <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Year</span>
          </div>
          <div className='flex flex-col'>
             <span className='text-xl md:text-3xl font-bold font-Barlow text-[hsla(var(--highlight))] max-w-[150px] truncate'>{industry}</span>
             <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Industry</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className='flex flex-col justify-center w-full lg:w-[45%] lg:pl-12 pb-12 lg:pb-0'
      >
        <p className='font-barlow text-lg md:text-[22px] leading-relaxed md:leading-[1.6] text-[hsla(var(--text)/0.8)] max-w-lg'>
          {summary}
        </p>

        <div className='w-16 h-[2px] bg-[hsla(var(--highlight)/0.4)] mt-10 md:mt-12'></div>

        <div className='flex flex-wrap gap-3 mt-8 md:mt-10'>
          {[scope, ...stack.slice(0, 3)].filter(Boolean).map((tag, i) => (
            <span key={i} className='px-4 py-2 text-xs md:text-sm border border-[hsla(var(--highlight)/0.3)] rounded-full text-[hsla(var(--highlight))] bg-[hsla(var(--highlight)/0.05)] hover:bg-[hsla(var(--highlight)/0.1)] transition-colors duration-300 cursor-default font-barlow'>
              {tag}
            </span>
          ))}
        </div>

        {finalLiveUrl && (
          <div className='mt-10 md:mt-14'>
             <a href={finalLiveUrl} target="_blank" rel="noopener noreferrer">
               <button className='font-barlow bg-[hsla(var(--highlight))] flex justify-center items-center font-bold text-[15px] md:text-[17px] text-[hsla(var(--base))] px-8 py-4 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg shadow-[hsla(var(--highlight)/0.2)]'>
                 Visit Live Site &rarr;
               </button>
             </a>
          </div>
        )}
      </motion.div>
    </section>
  );
}
