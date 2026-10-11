import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductDetailHero({
  name,
  category,
  status,
  tagline,
  accent,
  liveUrl,
  price,
  statusStyles,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="px-6 md:px-12 lg:px-20 pt-10 pb-12 border-b border-[hsl(var(--surface1))]"
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
        <div className="max-w-3xl overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
              {category}
            </span>
            <span
              className={`font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border px-2 py-0.5 ${
                statusStyles[status] ?? statusStyles["Coming Soon"]
              }`}
            >
              {status}
            </span>
          </div>

          <h1
            className="font-Barlow font-[900] uppercase tracking-[-0.05em] leading-[0.9] mb-4 truncate"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            {name}
          </h1>

          {tagline && (
            <p
              className="font-Barlow font-bold uppercase text-xl md:text-2xl italic opacity-85 truncate"
              style={{ color: accent }}
            >
              {tagline}
            </p>
          )}
        </div>

        {/* Right: key actions */}
        <div className="flex flex-col gap-3 lg:min-w-[200px]">
          <a
            href={liveUrl || "#"}
            target={liveUrl ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`font-barlow text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3 text-center transition-colors duration-300 ${
              liveUrl
                ? "bg-[hsl(var(--text))] text-[hsl(var(--base))] hover:bg-[hsl(var(--highlight))]"
                : "bg-[hsl(var(--surface1))] text-[hsl(var(--subtext1))] cursor-not-allowed opacity-50"
            }`}
          >
            Live Link ↗
          </a>
          {price != null && Number(price) > 0 && (
            <div className="border border-[hsl(var(--surface1))] px-6 py-3 text-center">
              <span className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] block mb-1">
                Starting at
              </span>
              <span
                className="font-Barlow text-2xl font-black"
                style={{ color: accent }}
              >
                ₹{Number(price).toLocaleString("en-IN")}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
