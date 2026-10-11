import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

export default function ProductRow({ product, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Normalise fields — MongoDB docs use flexible field names
  const num = String(index + 1).padStart(2, "0");
  const name = product.name || product.title || "Untitled";
  const tagline = product.tagline || "";
  const category = product.category || "General";
  const status = product.status || "Live";
  const description = product.description || "";
  const highlights = Array.isArray(product.features)
    ? product.features
    : Array.isArray(product.highlights)
    ? product.highlights
    : [];
  const solutions = Array.isArray(product.solutions) ? product.solutions : [];
  const tech = Array.isArray(product.tech)
    ? product.tech
    : Array.isArray(product.tech_stack)
    ? product.tech_stack
    : [];
  const statValue = product.stat_value || product.stat?.value || "";
  const statLabel = product.stat_label || product.stat?.label || "";
  const accent = product.accent || "hsl(259, 72%, 70%)";
  const image = product.image || product.cloudinary_image || null;
  const liveUrl = product.live_url || product.liveUrl || null;
  const productId = product.id || product._id || null;

  const statusStyles = {
    Live: "text-green-500 border-green-500",
    Beta: "text-yellow-500 border-yellow-500",
    "Coming Soon": "text-[hsl(var(--subtext1))] border-[hsl(var(--surface1))]",
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className={`relative overflow-hidden ${
        !isLast ? "border-b border-[hsl(var(--surface1))]" : ""
      } bg-[hsla(var(--highlight)/0.02)] hover:bg-[hsla(var(--highlight)/0.04)] transition-colors duration-500`}
    >
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale opacity-20 transition-all duration-700 hover:grayscale-0 hover:opacity-60"
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[hsl(var(--base))]/80" />
        </div>
      )}

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <div className="px-8 md:px-12 pt-10 pb-0">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-baseline gap-4">
              <span className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
                {num}
              </span>
              <span className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
                {category}
              </span>
            </div>
            <span
              className={`font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border px-2 py-1 ${
                statusStyles[status] ?? statusStyles["Coming Soon"]
              }`}
            >
              {status}
            </span>
          </div>

          <h2 className="font-Barlow font-black uppercase text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.9] tracking-tight mb-2 text-[hsl(var(--text))]">
            {name}
          </h2>

          {tagline && (
            <p
              className="font-Barlow font-bold uppercase text-xl md:text-2xl italic mb-8"
              style={{ color: accent, opacity: 0.85 }}
            >
              {tagline}
            </p>
          )}
        </div>

        {/* Accent rule */}
        <div
          className="mx-8 md:mx-12 h-[3px] mt-4 mb-6 opacity-40"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />

        {/* Body */}
        <div className="px-8 md:px-12 pb-0">
          <p className="font-barlow text-sm md:text-base leading-relaxed text-[hsl(var(--text))] max-w-2xl mb-8 opacity-90 drop-shadow-md">
            {description}
          </p>

          {/* Two-col: features + solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-[hsl(var(--surface1))]/50">
            {highlights.length > 0 && (
              <div className="py-6 md:border-r border-[hsl(var(--surface1))]/50 md:pr-8 bg-[hsl(var(--base))]/30 backdrop-blur-sm p-4 rounded-xl mt-4">
                <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-4 text-[hsl(var(--text))] drop-shadow-md">
                  Key Features
                </p>
                <ul className="flex flex-col gap-2">
                  {highlights.map((h) => (
                    <li
                      key={h}
                      className="font-barlow flex items-start gap-3 text-sm leading-snug text-[hsl(var(--text))] drop-shadow-sm font-medium"
                    >
                      <span
                        className="mt-1.5 w-1 h-1 flex-shrink-0"
                        style={{ background: accent }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {solutions.length > 0 && (
              <div className="py-6 border-t md:border-t-0 border-[hsl(var(--surface1))]/50 md:pl-8 bg-[hsl(var(--base))]/30 backdrop-blur-sm p-4 rounded-xl mt-4 md:ml-4">
                <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-4 text-[hsl(var(--text))] drop-shadow-md">
                  Solutions
                </p>
                <ul className="flex flex-col gap-2">
                  {solutions.map((s) => (
                    <li
                      key={s}
                      className="font-barlow flex items-start gap-3 text-sm leading-snug text-[hsl(var(--text))] drop-shadow-sm font-medium"
                    >
                      <span
                        className="mt-1.5 w-1 h-1 flex-shrink-0 rounded-full"
                        style={{ background: accent }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {statValue && (
              <div className="py-6 border-t md:border-t-0 border-[hsl(var(--surface1))]/50 md:pl-8">
                <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-2 text-[hsl(var(--text))] drop-shadow-md">
                  Headline Result
                </p>
                <span
                  className="font-Barlow text-[3.5rem] font-black leading-none tracking-tight block drop-shadow-lg"
                  style={{ color: accent }}
                >
                  {statValue}
                </span>
                <p className="font-barlow text-xs tracking-[0.2em] uppercase font-bold mt-2 text-[hsl(var(--text))] drop-shadow-md">
                  {statLabel}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer meta row */}
        <div className="px-8 md:px-12 py-6 border-t border-[hsl(var(--surface1))]/50 grid grid-cols-2 md:grid-cols-3 gap-0 mt-6 bg-[hsl(var(--base))]/60 backdrop-blur-md">
          {/* Tech stack */}
          <div className="md:border-r border-[hsl(var(--surface1))]/50 md:pr-6 col-span-2 md:col-span-1 border-b md:border-b-0 pb-4 md:pb-0">
            <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--text))] mb-2">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span
                  key={t}
                  className="font-barlow text-[10px] tracking-[0.1em] uppercase font-bold border border-[hsl(var(--surface1))] px-2 py-0.5 text-[hsl(var(--text))] bg-[hsl(var(--base))]/50 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="md:border-r border-[hsl(var(--surface1))]/50 md:px-6 pt-4 md:pt-0 border-b md:border-b-0 pb-4 md:pb-0">
            <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--text))] mb-2">
              Category
            </p>
            <p className="font-Barlow text-xl font-bold uppercase tracking-tight text-[hsl(var(--text))] drop-shadow-sm">
              {category}
            </p>
          </div>

          {/* CTA */}
          <div className="md:pl-6 pt-4 md:pt-0 flex flex-col gap-2 items-stretch">
            {productId && (
              <Link
                to={`/products/${productId}`}
                className="font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border border-[hsl(var(--surface1))] text-[hsl(var(--text))] px-4 py-2 hover:bg-[hsla(var(--surface1)/0.8)] bg-[hsl(var(--base))]/50 backdrop-blur-sm transition-colors text-center drop-shadow-sm"
              >
                View Details →
              </Link>
            )}
            <a
              href={liveUrl || "#"}
              target={liveUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border px-4 py-2 text-center transition-colors drop-shadow-sm ${
                liveUrl
                  ? "border-[hsl(var(--highlight))] text-[hsl(var(--highlight))] hover:bg-[hsla(var(--highlight)/0.2)] bg-[hsla(var(--highlight)/0.1)] backdrop-blur-sm"
                  : "border-[hsl(var(--surface1))] text-[hsl(var(--subtext1))] cursor-not-allowed opacity-50 bg-[hsl(var(--base))]/50 backdrop-blur-sm"
              }`}
            >
              Live Link ↗
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
