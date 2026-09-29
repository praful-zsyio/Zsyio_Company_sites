import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectGallery({ finalImage, title }) {
  if (!finalImage) return null;

  // Since we only have one main image from the DB in most cases,
  // we'll create a stylistic 2x2 grid by reusing it with different 
  // aspect ratios and zoom levels to make the page feel editorial and robust.
  const galleryItems = [
    { height: 'h-[40vh] md:h-[60vh]', scale: 'scale-100', grayscale: 'grayscale' },
    { height: 'h-[30vh] md:h-[40vh]', scale: 'scale-110', grayscale: 'grayscale-0' },
    { height: 'h-[30vh] md:h-[40vh]', scale: 'scale-125', grayscale: 'grayscale' },
    { height: 'h-[40vh] md:h-[60vh]', scale: 'scale-100', grayscale: 'grayscale-0' },
  ];

  return (
    <section className="border-b border-[hsl(var(--surface1))] p-6 md:p-14 bg-[hsla(var(--lavender)/0.02)]">
      <div className="mb-12">
        <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
          Visual Identity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {galleryItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`w-full ${item.height} border border-[hsl(var(--surface1))] overflow-hidden bg-[hsl(var(--mantle))]`}
          >
            <img
              src={finalImage}
              alt={`${title} view ${idx + 1}`}
              className={`w-full h-full object-cover ${item.scale} ${item.grayscale} opacity-90 hover:grayscale-0 hover:scale-105 hover:opacity-100 transition-all duration-700`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
