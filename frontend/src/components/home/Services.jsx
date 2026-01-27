import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { services, technologies } from "../../data/servicesData";

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 bg-[hsl(var(--base))]"
    >
      {/* background grid */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)]
          bg-[size:24px_24px]
        "
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 px-4 py-1 text-xs text-[hsl(var(--subtext1))]">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
            What we do
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--text))]">
            Our Services
          </h2>

          <p className="text-[hsl(var(--subtext1))] max-w-3xl mx-auto text-sm md:text-base">
            End-to-end product, design, and engineering capabilities focused on
            shipping reliable, scalable digital systems.
          </p>
        </motion.header>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={index}
                variants={item}
                className="
                  group relative h-full
                  rounded-2xl border border-[hsl(var(--surface1))]
                  bg-[hsl(var(--mantle))]/80
                  backdrop-blur-xl
                  p-6
                  transition-all duration-300
                  hover:-translate-y-1.5
                  hover:border-[hsl(var(--blue))]
                  hover:shadow-[0_0_28px_rgba(56,189,248,0.22)]
                  flex flex-col
                "
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(var(--blue))]/15 border border-[hsl(var(--blue))]/30 mb-4">
                  <Icon className="w-6 h-6 text-[hsl(var(--blue))]" />
                </div>

                <h3 className="text-lg font-semibold text-[hsl(var(--text))] mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-[hsl(var(--subtext1))] leading-relaxed grow">
                  {service.description}
                </p>

                <div className="mt-4 h-[2px] w-0 bg-[hsl(var(--blue))] group-hover:w-full transition-all duration-300 rounded-full" />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Technologies */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-[hsl(var(--subtext1))] text-2xl md:text-3xl font-bold text-center mb-4">
            Technologies We Work With
          </h3>

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
                <h4 className="text-lg font-semibold text-[hsl(var(--blue))] mb-5 text-center">
                  {tech.category}
                </h4>

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

        {/* ✅ Get Estimation Button */}
        <div className="mt-20 flex justify-center">
          <Link
            to="/services"
            className="
              inline-flex items-center justify-center
              rounded-xl border border-[hsl(var(--blue))]
              px-8 py-3
              text-sm font-semibold
              text-[hsl(var(--blue))]
              hover:bg-[hsl(var(--blue))]/10
              transition
            "
          >
            Get Estimation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
