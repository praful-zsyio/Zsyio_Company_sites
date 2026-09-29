import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SECTIONS = [
  {
    num: '01',
    title: 'Acceptance of Terms',
    body: 'By accessing or using the Zsyio website and services, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.',
  },
  {
    num: '02',
    title: 'Use License',
    body: 'Permission is granted to temporarily download one copy of the materials (information or software) on Zsyio\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.',
  },
  {
    num: '03',
    title: 'Disclaimer of Warranties',
    body: 'The materials on Zsyio\'s website are provided on an \'as is\' basis. Zsyio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.',
  },
  {
    num: '04',
    title: 'Limitations of Liability',
    body: 'In no event shall Zsyio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Zsyio\'s website, even if Zsyio or a Zsyio authorized representative has been notified orally or in writing of the possibility of such damage.',
  },
  {
    num: '05',
    title: 'Accuracy of Materials',
    body: 'The materials appearing on Zsyio\'s website could include technical, typographical, or photographic errors. Zsyio does not warrant that any of the materials on its website are accurate, complete, or current. Zsyio may make changes to the materials contained on its website at any time without notice.',
  },
  {
    num: '06',
    title: 'Modifications',
    body: 'Zsyio may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.',
  },
];

export default function TermsAndConditionsPage() {
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
                TERMS &<br />CONDITIONS.
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
              These terms and conditions outline the rules and regulations for the use of Zsyio's Website and Services. By accessing this website we assume you accept these terms and conditions.
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
          Questions about our Terms and Conditions? Our legal team responds within 2 business days.
        </p>
        <Link
          to="/contact"
          className="bg-[hsl(var(--lavender))] flex justify-center items-center font-bold text-[14px] md:text-[15px] text-[hsl(var(--base))] px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--lavender)/0.25)] flex-shrink-0"
        >
          Contact Legal Team →
        </Link>
      </section>

    </main>
  );
}
