import React from "react";
import AbstractShape3D from "./AbstractShape3D";
import { STUDIO_STATS } from "../../data/aboutData/aboutStats";

const AboutHero = () => {
  return (
    <div className="flex flex-col lg:flex-row pt-28 lg:pt-16 pb-16 px-6 md:px-10 text-[hsl(var(--text))]">
      
      {/* Left Column */}
      <div className="flex flex-col justify-center w-full lg:w-[55%] lg:pr-16 py-12 lg:py-12 hero-content border-b lg:border-b-0 lg:border-r border-[hsla(var(--lavender)/0.4)]">
        <h3 className='text-[11px] md:text-[12px] font-medium font-barlow text-[hsla(var(--lavender)/0.8)] uppercase flex flex-wrap gap-3 md:gap-5 pl-1'>
          <span className='tracking-[.2em]'>Established 2025</span>
          <span className='tracking-[.2em]'>Indore</span>
          <span className='tracking-[.2em]'>India</span>
        </h3>
        
        <h1 className="font-Barlow text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-6 mt-4 leading-none">
            Vision. <br /><span className="text-[hsla(var(--lavender))]">Connection.</span><br /> Impact.
        </h1>
        
        <p className="font-barlow text-lg md:text-xl text-[hsla(var(--text)/0.7)] max-w-xl leading-relaxed">
            We believe technology is more than just code. It is the bridge between human ambition and real-world change. Rooted in India, we partner with global visionaries to architect digital solutions that inspire and endure.
        </p>

        <div className="flex gap-3 flex-wrap max-w-md mt-8">
          {['Web Development', 'UI/UX Design', 'Cloud Architecture', 'App Development', 'Digital Strategy'].map((tag) => (
            <span key={tag} className="font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border border-[hsl(var(--surface1))] text-[hsl(var(--text))] px-4 py-2">
              {tag}
            </span>
          ))}
        </div>
      </div> 

      {/* Right Column: 3D Element & Stats */}
      <div className="flex flex-col flex-1 relative mt-12 lg:mt-0 lg:py-3 hero-stats lg:pl-16">
         
         <div className="hidden lg:block flex-1 w-full relative min-h-[350px]">
            <AbstractShape3D />
         </div>

         <div className="flex justify-around items-center border-t border-b lg:border-b-0 border-[hsla(var(--lavender)/0.4)] py-6 px-4 bg-[hsla(var(--lavender)/0.02)] flex-wrap gap-4 w-full">
            {STUDIO_STATS.map((stat) => (
              <div key={stat.id} className='flex flex-col items-center'>
                <span className='text-3xl xl:text-4xl font-bold font-Barlow text-[hsla(var(--lavender))] stat-number'>{stat.value}</span>
                <span className='text-[9px] md:text-[10px] text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] font-bold mt-2 text-center max-w-[100px] leading-relaxed'>{stat.label}</span>
              </div>
            ))}
         </div>

      </div>

    </div>
  )
}

export default AboutHero;