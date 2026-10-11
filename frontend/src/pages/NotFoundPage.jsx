import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Compass, Briefcase, Mail, Users } from "lucide-react";
import { usePageSEO } from "../utils/seo";

export default function NotFoundPage() {
  const navigate = useNavigate();

  usePageSEO({
    title: "404 - Page Not Found",
    description: "The requested page could not be found on Zsyio.",
    url: "/404",
  });

  const quickLinks = [
    { label: "Home", path: "/", icon: Home, desc: "Return to the main overview" },
    { label: "Services", path: "/services", icon: Compass, desc: "Explore technical capabilities" },
    { label: "Projects", path: "/projects", icon: Briefcase, desc: "View our delivered portfolio" },
    { label: "Careers", path: "/careers", icon: Users, desc: "Join our engineering team" },
    { label: "Contact", path: "/contact", icon: Mail, desc: "Get in touch directly" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-14 flex flex-col justify-between text-[hsl(var(--text))] bg-[hsl(var(--base))] selection:bg-[hsl(var(--highlight))] selection:text-[hsl(var(--base))]">
      {/* ── Top Header bar ── */}
      <div className="max-w-7xl mx-auto w-full pt-4 md:pt-8 flex items-center justify-between border-b border-[hsla(var(--highlight)/0.25)] pb-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
          <span className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
            ERR_HTTP_404 · Route Not Resolved
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--highlight))] hover:text-[hsl(var(--text))] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Go Back
        </button>
      </div>

      {/* ── Center Hero ── */}
      <div className="max-w-7xl mx-auto w-full my-12 md:my-20 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
        {/* Left Side: Massive Display */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs md:text-sm text-[hsl(var(--highlight))] tracking-widest uppercase font-semibold">
              404 // RESOURCE_UNAVAILABLE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-Barlow font-black text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight uppercase leading-[0.85] my-4 select-none"
          >
            Lost in <br />
            <span className="text-[hsl(var(--highlight))]">Orbit.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-barlow text-lg md:text-xl text-[hsla(var(--text)/0.75)] max-w-xl leading-relaxed mt-6 mb-10"
          >
            The route or coordinate you navigated to doesn’t exist or has migrated
            to another quadrant of our architecture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-[hsl(var(--text))] text-[hsl(var(--base))] font-barlow font-bold text-xs px-8 py-4 uppercase tracking-[0.2em] hover:bg-[hsl(var(--highlight))] transition-colors duration-300"
            >
              Return Home →
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-[hsl(var(--surface2))] hover:border-[hsl(var(--highlight))] text-[hsl(var(--text))] hover:text-[hsl(var(--highlight))] font-barlow font-bold text-xs px-8 py-4 uppercase tracking-[0.2em] transition-colors duration-300"
            >
              Contact Support
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Quick Routing Directory */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="border border-[hsla(var(--highlight)/0.3)] bg-[hsla(var(--highlight)/0.02)] p-6 md:p-8"
        >
          <div className="flex items-center justify-between border-b border-[hsl(var(--surface1))] pb-4 mb-6">
            <span className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
              Available Directories
            </span>
            <span className="font-mono text-[10px] text-[hsl(var(--highlight))] uppercase">
              Index Ready
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[hsl(var(--surface1))]">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group py-4.5 flex items-center justify-between transition-colors hover:text-[hsl(var(--highlight))]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 border border-[hsl(var(--surface1))] flex items-center justify-center text-[hsl(var(--subtext1))] group-hover:border-[hsl(var(--highlight))] group-hover:text-[hsl(var(--highlight))] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-Barlow font-bold text-lg uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="font-barlow text-xs text-[hsla(var(--text)/0.55)]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-sm text-[hsl(var(--surface2))] group-hover:text-[hsl(var(--highlight))] group-hover:translate-x-1 transition-all duration-200">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-[hsl(var(--surface1))] flex flex-col sm:flex-row items-center justify-between gap-4 font-barlow text-xs text-[hsla(var(--text)/0.5)]">
        <span>Zsyio System Architecture · Indore, India</span>
        <span className="font-mono text-[11px] text-[hsl(var(--highlight))]">
          HOST_OK // 200 ON OTHER CLUSTERS
        </span>
      </div>
    </div>
  );
}
