import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectImage({ finalImage, title }) {
  if (!finalImage) return null;

  return (
    <section className="border-b border-[hsl(var(--surface1))] p-6 md:p-14 bg-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="w-full h-[35vh] md:h-[60vh] p-4 md:p-8 border border-[hsl(var(--surface1))] overflow-hidden bg-transparent flex items-center justify-center"
      >
        <img
          src={finalImage}
          alt={title}
          className="max-w-full max-h-full object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        />
      </motion.div>
    </section>
  );
}
