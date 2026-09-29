import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ProductsHero({ products, allCategories }) {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".products-hero-anim",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="flex flex-col lg:flex-row mt-16 lg:mt-10 px-6 md:px-10 border-b border-[hsl(var(--surface1))] pb-12"
    >
      <div className="flex flex-col justify-center py-12 lg:py-0 w-full lg:w-[55%] lg:pr-16">
        <p className="products-hero-anim text-[11px] md:text-[12px] font-medium text-[hsla(var(--lavender)/0.8)] uppercase tracking-[.2em] pl-1 mb-6">
          Zsyio Products
        </p>

        <h1
          className="products-hero-anim font-Barlow font-[900] uppercase tracking-[-0.05em] leading-[0.95]"
          style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
        >
          Built By
          <br />
          <span className="text-[hsla(var(--lavender))]">Engineers.</span>
        </h1>

        <div className="products-hero-anim grid grid-cols-2 gap-x-6 gap-y-10 mt-10 md:mt-16">
          {[
            { val: products.length, label: "Products" },
            {
              val: products.filter((p) => p.status === "Live").length,
              label: "Live Now",
            },
            { val: allCategories.length - 1, label: "Categories" },
            { val: "∞", label: "Possibilities" },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col">
              <span className="text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--lavender))]">
                {val}
              </span>
              <span className="text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="flex flex-col justify-center w-full lg:w-[45%] lg:pl-12 pb-12 lg:pb-0"
      >
        <p className="font-barlow text-lg md:text-[22px] leading-relaxed md:leading-[1.6] text-[hsla(var(--text)/0.8)] max-w-lg">
          Every Zsyio product is born from a real pain point encountered while
          shipping client work. Opinionated, production-tested, and built to
          remove entire categories of complexity.
        </p>

        <div className="w-16 h-[2px] bg-[hsla(var(--lavender)/0.4)] mt-10 md:mt-12" />

        <div className="flex flex-wrap gap-3 mt-8 md:mt-10">
          {["Developer-first", "SOC 2 Ready", "Self-hostable", "API-native"].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-xs md:text-sm border border-[hsla(var(--lavender)/0.3)] rounded-full text-[hsla(var(--lavender))] bg-[hsla(var(--lavender)/0.05)] hover:bg-[hsla(var(--lavender)/0.1)] transition-colors duration-300 cursor-default font-barlow"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
