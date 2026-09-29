import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PERMITTED = [
  'Reference Zsyio by name in editorial, journalistic, or academic contexts',
  'Use our name to accurately describe a product or service integration',
  'Include our name in factual client lists or case studies with our written approval',
];

const PROHIBITED = [
  'Alter, distort, rotate, or combine our trademarks with other elements',
  'Imply partnership, endorsement, or affiliation without written consent',
  'Register domains, social handles, or accounts using our brand name',
  'Use our marks in misleading, derogatory, or unlawful contexts',
  'Apply our name to non-Zsyio products or services',
  'Use our marks in ways that dilute or damage brand reputation',
];

export default function TrademarksPage() {
  return (
    <main className="pt-20 md:pt-28 text-[hsl(var(--text))] min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-24 px-6 md:px-14 border-b border-[hsl(var(--surface1))]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <p className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-6">
                Legal · Brand & IP
              </p>
              <h1 className="font-Barlow font-[900] uppercase text-[hsl(var(--text))] tracking-[-.05em] leading-[0.9]" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
                TRADE<br />MARKS.
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:w-[450px] flex flex-col justify-start lg:pt-12"
          >
            <p className="font-barlow text-lg md:text-[22px] leading-relaxed md:leading-[1.6] text-[hsla(var(--text)/0.8)]">
              Our brand identity and intellectual property are protected under applicable law across multiple jurisdictions. Review these guidelines before using any Zsyio assets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── OWNERSHIP ────────────────────────────────────────────────────────── */}
      <section className="border-b border-[hsl(var(--surface1))] grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-10 border-r border-[hsl(var(--surface1))] pr-6 md:pr-10"
        >
          <span className="font-barlow text-[11px] tracking-[0.3em] uppercase font-bold text-[hsla(var(--text)/0.3)]">01</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="py-10 pl-6 md:pl-14"
        >
          <h2 className="font-Barlow text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-[hsl(var(--text))]">
            Ownership of Trademarks
          </h2>
          <p className="font-barlow text-[17px] leading-[1.7] text-[hsla(var(--text)/0.8)] max-w-2xl mb-4">
            The <strong className="text-[hsl(var(--text))]">Zsyio</strong> name, logo, brand visuals, product names (including Zsyio Monitor, Zsyio Shield, Zsyio Flow), taglines, and all related identifiers are the exclusive property of Zsyio and are protected under applicable intellectual property laws.
          </p>
          <p className="font-barlow text-[17px] leading-[1.7] text-[hsla(var(--text)/0.8)] max-w-2xl">
            These trademarks may be registered or unregistered across multiple jurisdictions including India, the United Kingdom, and the European Union. Unauthorized use may result in legal action.
          </p>
        </motion.div>
      </section>

      {/* ─── THIRD PARTY ──────────────────────────────────────────────────────── */}
      <section className="border-b border-[hsl(var(--surface1))] grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] px-6 md:px-14">
        <div className="py-10 border-r border-[hsl(var(--surface1))] pr-6 md:pr-10">
          <span className="font-barlow text-[11px] tracking-[0.3em] uppercase font-bold text-[hsla(var(--text)/0.3)]">02</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="py-10 pl-6 md:pl-14"
        >
          <h2 className="font-Barlow text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-[hsl(var(--text))]">
            Third-Party Trademarks
          </h2>
          <p className="font-barlow text-[17px] leading-[1.7] text-[hsla(var(--text)/0.8)] max-w-2xl">
            All other trademarks, service marks, logos, and trade names appearing on this website are the property of their respective owners. Reference to third-party brands does not imply endorsement or affiliation unless explicitly stated in writing by Zsyio.
          </p>
        </motion.div>
      </section>

      {/* ─── USAGE GUIDELINES ─────────────────────────────────────────────────── */}
      <section className="border-b border-[hsl(var(--surface1))] grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] px-6 md:px-14">
        <div className="py-10 border-r border-[hsl(var(--surface1))] pr-6 md:pr-10">
          <span className="font-barlow text-[11px] tracking-[0.3em] uppercase font-bold text-[hsla(var(--text)/0.3)]">03</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="py-10 pl-6 md:pl-14"
        >
          <h2 className="font-Barlow text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 text-[hsl(var(--text))]">
            Usage Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Permitted */}
            <div className="md:border-r border-[hsl(var(--surface1))] md:pr-14">
              <p className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-6">
                Permitted Uses
              </p>
              <ul className="space-y-0">
                {PERMITTED.map((item) => (
                  <li key={item} className="border-t border-[hsl(var(--surface1))] py-4 flex items-start gap-4">
                    <span className="text-[hsl(var(--lavender))] flex-shrink-0 mt-0.5 font-bold">✓</span>
                    <span className="font-barlow text-[15px] leading-relaxed text-[hsla(var(--text)/0.8)]">{item}</span>
                  </li>
                ))}
                <li className="border-t border-[hsl(var(--surface1))]" />
              </ul>
            </div>

            {/* Prohibited */}
            <div className="mt-8 md:mt-0 md:pl-14 border-t md:border-t-0 border-[hsl(var(--surface1))] pt-8 md:pt-0">
              <p className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-6">
                Prohibited Uses
              </p>
              <ul className="space-y-0">
                {PROHIBITED.map((item) => (
                  <li key={item} className="border-t border-[hsl(var(--surface1))] py-4 flex items-start gap-4">
                    <span className="text-[hsl(var(--red))] flex-shrink-0 mt-0.5 font-bold">✗</span>
                    <span className="font-barlow text-[15px] leading-relaxed text-[hsla(var(--text)/0.8)]">{item}</span>
                  </li>
                ))}
                <li className="border-t border-[hsl(var(--surface1))]" />
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── ENFORCEMENT ──────────────────────────────────────────────────────── */}
      <section className="border-b border-[hsl(var(--surface1))] grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] px-6 md:px-14">
        <div className="py-10 border-r border-[hsl(var(--surface1))] pr-6 md:pr-10">
          <span className="font-barlow text-[11px] tracking-[0.3em] uppercase font-bold text-[hsla(var(--text)/0.3)]">04</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="py-10 pl-6 md:pl-14"
        >
          <h2 className="font-Barlow text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-[hsl(var(--text))]">
            Enforcement & Protection
          </h2>
          <p className="font-barlow text-[17px] leading-[1.7] text-[hsla(var(--text)/0.8)] max-w-2xl mb-4">
            Zsyio actively monitors for and pursues unauthorized use of its intellectual property. We reserve the right to pursue all available legal remedies against misuse, infringement, or dilution of our trademarks, including injunctive relief and damages.
          </p>
          <p className="font-barlow text-[17px] leading-[1.7] text-[hsla(var(--text)/0.8)] max-w-2xl">
            Reports of potential trademark infringement are taken seriously and reviewed within 5 business days. Submit reports to legal@zsyio.com.
          </p>
        </motion.div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-[hsl(var(--surface1))] grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] px-6 md:px-14">
        <div className="py-10 border-r border-[hsl(var(--surface1))] pr-6 md:pr-10">
          <span className="font-barlow text-[11px] tracking-[0.3em] uppercase font-bold text-[hsla(var(--text)/0.3)]">05</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="py-10 pl-6 md:pl-14"
        >
          <h2 className="font-Barlow text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-[hsl(var(--text))]">
            Licensing & Inquiries
          </h2>
          <p className="font-barlow text-[17px] leading-[1.7] text-[hsla(var(--text)/0.8)] max-w-2xl mb-8">
            For brand licensing requests, press kit access, or legal inquiries regarding trademark use, contact our legal team. We respond within 2 business days.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:legal@zsyio.com" className="bg-[hsl(var(--surface1))] flex justify-center items-center font-bold text-[14px] md:text-[15px] text-[hsl(var(--text))] px-8 py-3 rounded-xl transition-all duration-300 hover:bg-[hsl(var(--surface2))]">
              legal@zsyio.com
            </a>
            <Link to="/contact" className="bg-[hsl(var(--lavender))] flex justify-center items-center font-bold text-[14px] md:text-[15px] text-[hsl(var(--base))] px-8 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--lavender)/0.25)]">
              Contact Form →
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
