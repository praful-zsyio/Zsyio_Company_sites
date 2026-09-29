import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectImage({ finalImage, title }) {
  if (!finalImage) return null;

  return (
    <section className="border-b border-[hsl(var(--surface1))] p-6 md:p-14 bg-[hsla(var(--lavender)/0.02)]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="w-full h-[40vh] md:h-[70vh] border border-[hsl(var(--surface1))] overflow-hidden bg-[hsl(var(--mantle))]"
      >
        <img
          src={finalImage}
          alt={title}
          className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        />
      </motion.div>
    </section>
  );
}
