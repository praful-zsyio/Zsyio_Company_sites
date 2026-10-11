import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCategorizedTechnologies } from "../../services/api";

const TechnologiesGrid = ({ isInView = true }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategorizedTechnologies()
      .then((res) => {
        if (res && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      })
      .catch((err) => console.error("Error fetching technologies:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-24 px-6 md:px-10 text-center text-[hsl(var(--subtext1))]">
        <p className="font-barlow text-sm uppercase tracking-widest animate-pulse">Loading Technologies...</p>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="mt-0 border-t border-[hsl(var(--surface1))] px-6 md:px-10 pb-24">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="border-b border-[hsl(var(--surface1))] py-10 md:py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
      >
        <div>
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsl(var(--highlight))]">
            Our Stack
          </p>
          <h2 className="font-Barlow text-[2.5rem] md:text-[4rem] font-black uppercase tracking-tight leading-none text-[hsl(var(--text))]">
            Technologies
          </h2>
        </div>
        <p className="font-barlow hidden md:block text-sm text-[hsl(var(--subtext1))] max-w-xs text-right leading-relaxed">
          Battle-tested tools chosen for reliability,<br/> not trend chasing.
        </p>
      </motion.div>

      {/* ── Tech category grid ── */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 + ci * 0.08, ease: [0.4, 0, 0.2, 1] }}
            className="break-inside-avoid mb-6 border border-[hsl(var(--surface1))] rounded-xl px-7 py-8 group hover:bg-[hsla(var(--highlight)/0.03)] hover:border-[hsla(var(--highlight)/0.3)] transition-all duration-300"
          >
            <p className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold mb-6 text-[hsl(var(--highlight))]">
              {cat.category}
            </p>
            <ul className="flex flex-col">
              {cat.items && cat.items.map((tech, ti) => {
                const techName = typeof tech === 'object' ? tech.name : tech;
                return (
                  <li
                    key={techName}
                    className={`flex items-center justify-between py-3 ${
                      ti < cat.items.length - 1
                        ? "border-b border-[hsl(var(--surface1))]"
                        : ""
                    }`}
                  >
                    <span className="font-Barlow text-lg md:text-xl font-bold uppercase tracking-tight text-[hsl(var(--text))] group-hover:text-[hsl(var(--highlight))] transition-colors duration-200">
                      {techName}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highlight))] opacity-30 shrink-0" />
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechnologiesGrid;
