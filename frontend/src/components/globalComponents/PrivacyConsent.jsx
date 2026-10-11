import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { submitPrivacyConsent } from "../../services/api";

const STORAGE_KEY = "zsyio_privacy_consent";

export default function PrivacyConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a privacy selection
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Delay display slightly for smooth page entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDecision = async (status) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ status, timestamp: new Date().toISOString() }));
    setIsVisible(false);

    try {
      await submitPrivacyConsent(status);
    } catch (err) {
      // Silently log; local storage already stores preference
      console.warn("Could not log privacy consent to server:", err);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="region"
          aria-label="Privacy and Preference Settings"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 sm:bottom-6 inset-x-4 sm:left-auto sm:right-6 sm:max-w-md z-50"
        >
          <div className="bg-[hsl(var(--base))/0.92] backdrop-blur-xl border border-[hsla(var(--highlight)/0.4)] p-6 shadow-2xl text-[hsl(var(--text))] flex flex-col gap-4 relative overflow-hidden">
            {/* Top decorative line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-linear-to-r from-[hsl(var(--highlight))] via-[hsl(var(--sapphire))] to-transparent" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[hsl(var(--highlight))] shrink-0" />
                <span className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--highlight))]">
                  Privacy & Telemetry
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleDecision("rejected")}
                aria-label="Close and use essential only"
                className="text-[hsl(var(--subtext1))] hover:text-[hsl(var(--text))] transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-barlow text-xs md:text-sm text-[hsla(var(--text)/0.75)] leading-relaxed">
              We utilize essential technical cookies to ensure site reliability, remember appearance preferences,
              and measure anonymized traffic. See our{" "}
              <Link to="/privacy-policy" className="underline hover:text-[hsl(var(--highlight))] text-[hsl(var(--text))]">
                Privacy Policy
              </Link>{" "}
              for full terms.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleDecision("accepted")}
                className="flex-1 bg-[hsl(var(--text))] text-[hsl(var(--base))] hover:bg-[hsl(var(--highlight))] font-barlow font-bold text-[11px] uppercase tracking-[0.15em] py-2.5 px-4 transition-colors duration-200 cursor-pointer text-center"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => handleDecision("rejected")}
                className="flex-1 border border-[hsl(var(--surface2))] hover:border-[hsl(var(--highlight))] text-[hsl(var(--text))] hover:text-[hsl(var(--highlight))] font-barlow font-bold text-[11px] uppercase tracking-[0.15em] py-2.5 px-4 transition-colors duration-200 cursor-pointer text-center"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
