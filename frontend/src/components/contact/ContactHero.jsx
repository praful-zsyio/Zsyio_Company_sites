import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-6 md:px-14 border-b border-[hsl(var(--surface1))]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* Left Side: Massive Typography */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[11px] md:text-[12px] font-medium text-[hsla(var(--highlight)/0.8)] uppercase tracking-[0.2em] mb-6"
            >
              Start a Conversation
            </motion.h3>
            <motion.h3
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[12px] md:text-[16px] font-medium text-[hsla(var(--text))] uppercase tracking-[0.2em] mb-6"
            >
              Response within 24 hours.
            </motion.h3>

            <motion.h1
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-Barlow font-[900] uppercase tracking-[-.05em] leading-[0.9] text-[hsl(var(--text))]"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
            >
              Get in <br /> Touch.
            </motion.h1>
          </div>

          {/* Bottom Filler for Left Side */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block mt-16"
          >
            <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mb-4">
              Connect With Us
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/company/zsyio/" target="_blank" rel="noopener noreferrer" className="font-Barlow text-sm font-bold uppercase tracking-wider text-[hsl(var(--text))] hover:text-[hsl(var(--highlight))] transition-colors">LinkedIn</a>
              <a href="https://www.instagram.com/zsyio.official/" target="_blank" rel="noopener noreferrer" className="font-Barlow text-sm font-bold uppercase tracking-wider text-[hsl(var(--text))] hover:text-[hsl(var(--highlight))] transition-colors">Instagram</a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:w-[450px] flex flex-col justify-start lg:pt-2"
        >
          <p className="font-barlow text-lg md:text-[22px] leading-relaxed md:leading-[1.6] text-[hsla(var(--text)/0.8)]">
            Whether you’re exploring an idea, need technical guidance, or want to scale your team—we’d love to hear from you.
          </p>

          <div className="w-16 h-[2px] bg-[hsla(var(--highlight)/0.4)] my-10 md:my-12" />

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-5 group border-b border-[hsl(var(--surface1))] pb-6">
              <div className="mt-1 w-12 h-12 border border-[hsl(var(--surface1))] flex items-center justify-center bg-[hsl(var(--surface1))] group-hover:bg-[hsl(var(--highlight))] group-hover:border-[hsl(var(--highlight))] group-hover:text-[hsl(var(--base))] text-[hsl(var(--text))] transition-all duration-300 flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mb-1">Location</p>
                <p className="font-Barlow text-xl md:text-2xl font-bold text-[hsl(var(--text))]">Indore, India</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group cursor-pointer border-b border-[hsl(var(--surface1))] pb-6">
              <div className="mt-1 w-12 h-12 border border-[hsl(var(--surface1))] flex items-center justify-center bg-[hsl(var(--surface1))] group-hover:bg-[hsl(var(--highlight))] group-hover:border-[hsl(var(--highlight))] group-hover:text-[hsl(var(--base))] text-[hsl(var(--text))] transition-all duration-300 flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mb-1">Phone</p>
                <a href="tel:+919179182729" className="font-Barlow text-xl md:text-2xl font-bold text-[hsl(var(--text))] hover:text-[hsl(var(--highlight))] transition-colors">+91 9179182729</a>
              </div>
            </div>

            <div className="flex items-start gap-5 group cursor-pointer pt-2">
              <div className="mt-1 w-12 h-12 border border-[hsl(var(--surface1))] flex items-center justify-center bg-[hsl(var(--surface1))] group-hover:bg-[hsl(var(--highlight))] group-hover:border-[hsl(var(--highlight))] group-hover:text-[hsl(var(--base))] text-[hsl(var(--text))] transition-all duration-300 flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mb-1">Email</p>
                <a href="mailto:contact@zsyio.com" className="font-Barlow text-xl md:text-2xl font-bold text-[hsl(var(--text))] hover:text-[hsl(var(--highlight))] transition-colors">contact@zsyio.com</a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
