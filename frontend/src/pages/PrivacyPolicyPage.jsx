import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { submitPrivacyConsent } from '../services/api';

const SECTIONS = [
  {
    num: '01',
    title: 'Introduction',
    body: 'Welcome to Zsyio. We are committed to protecting your personal data and ensuring transparency in how information is handled. This policy explains what data we collect, why we collect it, how we use it, and your rights as a data subject under applicable law including GDPR (EU), India\'s DPDP Act 2023, and the UK Data Protection Act 2018.',
  },
  {
    num: '02',
    title: 'Data We Collect',
    items: [
      'Identity data: name, job title, company name',
      'Contact data: email address, phone number, postal address',
      'Technical data: IP address, browser type, device identifiers, cookies',
      'Usage data: pages visited, time on site, interaction events',
      'Communication data: messages sent via our contact forms',
      'Contractual data: engagement scope, deliverable records, billing information',
    ],
    body: 'We collect information you provide directly to us, such as when filling in forms, subscribing to communications, requesting a demo, or contacting our team. We also collect limited technical data automatically through standard web analytics.',
  },
  {
    num: '03',
    title: 'How We Use Your Data',
    items: [
      'To respond to your inquiries and service requests',
      'To deliver contracted technology services',
      'To send the Zsyio Brief newsletter (with your consent)',
      'To improve our website and product offerings',
      'To comply with legal obligations and protect our rights',
    ],
    body: 'We process your personal data only where we have a lawful basis: your consent, a contractual obligation, a legitimate interest, or a legal requirement.',
  },
  {
    num: '04',
    title: 'Cookies & Tracking',
    body: 'We use cookies and similar technologies to enhance user experience, analyze site traffic, and improve performance. Essential cookies are always active. Analytics and preference cookies are only set with your consent via our cookie banner. You may withdraw consent at any time by clearing your browser cookies or adjusting your browser settings.',
  },
  {
    num: '05',
    title: 'Data Sharing & Transfers',
    body: 'We do not sell, trade, or rent your personal data to third parties. We may share data with trusted service providers who assist in operating our website and delivering services — all bound by confidentiality obligations. Where data is transferred outside India or the EEA, we apply appropriate safeguards under DPDP Act and GDPR Chapter V respectively.',
  },
  {
    num: '06',
    title: 'Data Retention',
    body: 'We retain personal data for as long as necessary to fulfil the purpose for which it was collected, satisfy contractual obligations, or comply with legal requirements. Contact form submissions are retained for 24 months. Contractual records are retained for 7 years as required by Indian financial law.',
  },
  {
    num: '07',
    title: 'Your Rights',
    items: [
      'Right to access your personal data',
      'Right to rectify inaccurate or incomplete data',
      'Right to erasure ("right to be forgotten")',
      'Right to restrict or object to processing',
      'Right to data portability',
      'Right to withdraw consent at any time',
    ],
    body: 'To exercise any of these rights, contact our Data Protection Officer at privacy@zsyio.com. We will respond within 30 days.',
  },
];

export default function PrivacyPolicyPage() {
  const [consent, setConsent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleConsent = async (consentStatus) => {
    setLoading(true);
    setMessage("");

    try {
      await submitPrivacyConsent(consentStatus);
      setConsent(consentStatus);
      setMessage(
        consentStatus === "accepted"
          ? "Thank you for accepting our Privacy Policy."
          : "You have rejected the Privacy Policy."
      );
    } catch (error) {
      console.error("Error submitting consent:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                Legal · Last Updated Oct 26, 2025
              </p>
              <h1 className="font-Barlow font-[900] uppercase text-[hsl(var(--text))] tracking-[-.05em] leading-[0.9]" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
                PRIVACY<br />POLICY.
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
              Your privacy matters. This policy describes how Zsyio collects, uses, and safeguards your personal information — in plain language, without the legalese.
            </p>
            <div className="flex gap-3 mt-8 flex-wrap">
              {['GDPR Compliant', 'DPDP Act 2023', 'SOC 2 Certified'].map((badge) => (
                <span key={badge} className="font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border border-[hsl(var(--surface1))] text-[hsl(var(--text))] px-4 py-2">
                  {badge}
                </span>
              ))}
            </div>
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
            viewport={{ once: true, amount: 0.08 }}
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
              {'items' in s && s.items && (
                <ul className="mb-6 space-y-0">
                  {s.items.map((item) => (
                    <li key={item} className="border-t border-[hsl(var(--surface1))] py-3 flex items-start gap-4">
                      <span className="text-[hsl(var(--lavender))] flex-shrink-0 mt-0.5 font-black">✦</span>
                      <span className="font-barlow text-[15px] leading-relaxed text-[hsla(var(--text)/0.8)]">{item}</span>
                    </li>
                  ))}
                  <li className="border-t border-[hsl(var(--surface1))]" />
                </ul>
              )}
              <p className="font-barlow text-[17px] leading-[1.7] text-[hsla(var(--text)/0.8)] max-w-2xl">
                {s.body}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ─── CONSENT SECTION ──────────────────────────────────────────────────── */}
      <section className="border-b border-[hsl(var(--surface1))] px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr]"
        >
          <div className="py-10 border-r border-[hsl(var(--surface1))] pr-6 md:pr-10">
            <span className="font-barlow text-[11px] tracking-[0.3em] uppercase font-bold text-[hsla(var(--text)/0.3)]">08</span>
          </div>
          <div className="py-10 pl-6 md:pl-14">
            <h2 className="font-Barlow text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 text-[hsl(var(--text))]">
              Consent
            </h2>

            {consent === null && (
              <>
                <p className="font-barlow text-[17px] leading-[1.7] text-[hsla(var(--text)/0.8)] max-w-xl mb-8">
                  By using our website, you consent to this Privacy Policy. If you do not agree, please discontinue use. You may also formally record your consent below.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => handleConsent('accepted')}
                    disabled={loading}
                    className="bg-[hsl(var(--lavender))] flex justify-center items-center font-bold text-[14px] md:text-[15px] text-[hsl(var(--base))] px-8 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--lavender)/0.25)] disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Accept Policy'}
                  </button>
                  <button
                    onClick={() => handleConsent('rejected')}
                    disabled={loading}
                    className="bg-transparent border border-[hsl(var(--surface1))] flex justify-center items-center font-bold text-[14px] md:text-[15px] text-[hsl(var(--text))] px-8 py-3 rounded-xl transition-all duration-300 hover:bg-[hsl(var(--surface1))] disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Decline'}
                  </button>
                </div>
                {message && (
                  <p className="font-barlow text-sm text-[hsl(var(--red))] font-bold tracking-wider uppercase mt-4">
                    {message}
                  </p>
                )}
              </>
            )}

            {consent === 'accepted' && (
              <div className="border border-[hsl(var(--surface1))] bg-[hsla(var(--surface1)/0.2)] p-6 max-w-md">
                <p className="font-Barlow text-2xl font-black uppercase mb-2 text-[hsl(var(--text))]">Policy Accepted.</p>
                <p className="font-barlow text-[15px] leading-relaxed text-[hsla(var(--text)/0.8)] mb-4">
                  Your consent has been recorded. Thank you for taking the time to review our Privacy Policy.
                </p>
                <button onClick={() => setConsent(null)} className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsl(var(--text))] pb-0.5 hover:text-[hsl(var(--lavender))] hover:border-[hsl(var(--lavender))] transition-colors">
                  Review Again
                </button>
              </div>
            )}

            {consent === 'rejected' && (
              <div className="border border-[hsl(var(--surface1))] bg-[hsla(var(--surface1)/0.2)] p-6 max-w-md">
                <p className="font-Barlow text-2xl font-black uppercase mb-2 text-[hsl(var(--text))]">Policy Declined.</p>
                <p className="font-barlow text-[15px] leading-relaxed text-[hsla(var(--text)/0.8)] mb-4">
                  Some features may be limited. You can change your decision at any time, or contact us to request data deletion.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setConsent(null)} className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsl(var(--text))] pb-0.5 hover:text-[hsl(var(--lavender))] hover:border-[hsl(var(--lavender))] transition-colors">
                    Review Again
                  </button>
                  <Link to="/contact" className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsla(var(--text)/0.3)] pb-0.5 hover:text-[hsl(var(--lavender))] hover:border-[hsl(var(--lavender))] transition-colors text-[hsla(var(--text)/0.6)]">
                    Request Deletion
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* ─── CONTACT CTA ──────────────────────────────────────────────────────── */}
      <section className="border-b border-[hsl(var(--surface1))] px-6 md:px-14 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-barlow text-[15px] text-[hsla(var(--text)/0.6)] max-w-md mb-1">
            Questions about how we handle your data?
          </p>
          <p className="font-barlow text-[15px] font-bold text-[hsl(var(--text))]">
            Contact our Data Protection Officer:{' '}
            <a href="mailto:privacy@zsyio.com" className="border-b border-[hsl(var(--text))] hover:text-[hsl(var(--lavender))] hover:border-[hsl(var(--lavender))] transition-colors pb-0.5">
              privacy@zsyio.com
            </a>
          </p>
        </div>
        <Link
          to="/contact"
          className="bg-[hsl(var(--lavender))] flex justify-center items-center font-bold text-[14px] md:text-[15px] text-[hsl(var(--base))] px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--lavender)/0.25)] flex-shrink-0"
        >
          Contact Us →
        </Link>
      </section>

    </main>
  );
}