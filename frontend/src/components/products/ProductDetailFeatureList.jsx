import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ProductDetailFeatureList({ title, items, accent, bullet }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-10"
    >
      <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-5 text-[hsl(var(--subtext1))]">
        {title}
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="font-barlow flex items-start gap-3 text-sm leading-snug text-[hsl(var(--text))] opacity-80"
          >
            <span
              className={`mt-1.5 w-1.5 h-1.5 flex-shrink-0 ${
                bullet === "circle" ? "rounded-full" : ""
              }`}
              style={{ background: accent, opacity: bullet === "circle" ? 0.7 : 1 }}
            />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
