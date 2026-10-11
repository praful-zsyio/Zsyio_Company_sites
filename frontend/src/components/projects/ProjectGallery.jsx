import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectGallery({ images, title }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="border-b border-[hsl(var(--surface1))] p-6 md:p-14 bg-transparent">
      <div className="mb-12">
        <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
          Visual Identity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:pb-16">
        {images.map((imgUrl, idx) => {
          // Dynamic classes to create a scattered, non-static editorial look
          const scatterClasses = [
            "md:translate-y-0 md:-rotate-2",
            "md:translate-y-16 md:rotate-3",
            "md:-translate-y-4 md:rotate-1",
            "md:translate-y-12 md:-rotate-2",
            "md:translate-y-4 md:rotate-2",
            "md:translate-y-20 md:-rotate-1",
          ];
          const dynamicClass = scatterClasses[idx % scatterClasses.length];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className={`relative z-0 w-full h-[30vh] md:h-[40vh] p-4 md:p-8  bg-transparent flex items-center justify-center hover:z-10 transition-transform duration-500 hover:shadow-2xl ${dynamicClass}`}
            >
              <img
                src={imgUrl}
                alt={`${title} view ${idx + 1}`}
                className="max-w-full max-h-full object-contain grayscale opacity-90 hover:grayscale-0 hover:scale-105 lg:hover:scale-150 hover:opacity-100 transition-all duration-700"
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
