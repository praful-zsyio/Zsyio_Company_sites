import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SECTIONS = [
  {
    num: '01',
    title: 'General Information',
    body: 'The information provided by Zsyio ("we," "us," or "our") on this website is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.',
  },
  {
    num: '02',
    title: 'External Links Disclaimer',
    body: 'The website may contain links to third-party websites or content. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for any information offered by third-party websites linked through the platform.',
  },
  {
    num: '03',
    title: 'Professional Disclaimer',
    body: 'This website does not contain professional advice. All information is provided for general informational and educational purposes only and is not a substitute for professional consultation. Before making decisions based on such information, you should consult qualified professionals relevant to your situation.',
  },
  {
    num: '04',
    title: 'Limitation of Liability',
    body: 'Under no circumstance shall Zsyio be liable for any loss or damage incurred as a result of the use of the website or reliance on any information provided. Your use of the website and reliance on any information is solely at your own risk.',
  },
  {
    num: '05',
    title: 'No Warranties',
    body: 'The website is provided "as is" without any representations or warranties, express or implied. Zsyio makes no representations or warranties in relation to this website or the information and materials provided herein.',
  },
  {
    num: '06',
    title: 'Changes to This Disclaimer',
    body: 'We reserve the right to modify this disclaimer at any time. By continuing to use the website after any changes become effective, you agree to be bound by the revised disclaimer. We encourage you to review this page periodically.',
  },
];

export default function DisclaimerPage() {
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
                Legal · Last Updated Feb 22, 2026
              </p>
              <h1 className="font-Barlow font-[900] uppercase text-[hsl(var(--text))] tracking-[-.05em] leading-[0.9]" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
                DISCLAIMER.
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
              Please read this disclaimer carefully before using our website and services. By accessing Zsyio, you acknowledge and agree to these terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTENT ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-[hsl(var(--surface1))]">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="border-b border-[hsl(var(--surface1))] last:border-b-0 grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] px-6 md:px-14"
          >
            <div className="py-10 border-r border-[hsl(var(--surface1))] pr-6 md:pr-10">
              <span className="font-barlow text-[11px] tracking-[0.3em] uppercase font-bold text-[hsla(var(--text)/0.3)]">{s.num}</span>
            </div>
            <div className="py-10 pl-6 md:pl-14">
              <h2 className="font-Barlow text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-[hsl(var(--text))]">
                {s.title}
              </h2>
              <p className="font-barlow text-[17px] leading-[1.7] text-[hsla(var(--text)/0.8)] max-w-2xl">
                {s.body}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ─── CONTACT CTA ──────────────────────────────────────────────────────── */}
      <section className="border-b border-[hsl(var(--surface1))] px-6 md:px-14 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="font-barlow text-[15px] text-[hsla(var(--text)/0.6)] max-w-md">
          Questions about this disclaimer? Our legal team responds within 2 business days.
        </p>
        <Link
          to="/contact"
          className="bg-[hsl(var(--highlight))] flex justify-center items-center font-bold text-[14px] md:text-[15px] text-[hsl(var(--base))] px-8 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--highlight)/0.25)] flex-shrink-0"
        >
          Contact Legal Team →
        </Link>
      </section>

    </main>
  );
}