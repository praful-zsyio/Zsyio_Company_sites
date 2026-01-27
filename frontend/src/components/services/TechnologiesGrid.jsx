import { motion } from "framer-motion";
import { technologies } from "../../data/servicesData";

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const TechnologiesGrid = ({ isInView }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-[hsl(var(--subtext1))] text-2xl md:text-3xl font-bold text-center mb-4">
        Technologies We Work With
      </h2>

      <p className="text-[hsl(var(--subtext1))] text-center max-w-3xl mx-auto mb-12 text-sm md:text-base">
        Proven tools and platforms chosen for reliability, performance, and
        long-term maintainability.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {technologies.map((tech, idx) => (
          <motion.div
            key={idx}
            variants={item}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 + idx * 0.08 }}
            className="
              rounded-2xl border border-[hsl(var(--surface1))]
              bg-[hsl(var(--mantle))]/80
              p-6
              transition-all duration-300
              hover:border-[hsl(var(--blue))]
              hover:shadow-soft
            "
          >
            <h3 className="text-lg font-semibold text-[hsl(var(--blue))] mb-5 text-center">
              {tech.category}
            </h3>

            <div className="space-y-3">
              {tech.items.map((item, i) => {
                const TechIcon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-[hsl(var(--subtext1))]"
                  >
                    <TechIcon className="w-4 h-4 text-[hsl(var(--subtext0))]" />
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TechnologiesGrid;
