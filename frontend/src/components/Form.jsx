import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { submitContact } from '../services/api';

const OFFICES = [
  {
    city: 'Indore',
    label: 'HQ',
    address: ['123 Innovation Drive', 'Tech Park, Indore 452010', 'Madhya Pradesh, India'],
    email: 'indore@zsyio.com',
    phone: '+91 917 918 2729'
  },
  {
    city: 'Mumbai',
    label: 'Studio',
    address: ['45 Creative Block', 'Bandra West, Mumbai 400050', 'Maharashtra, India'],
    email: 'mumbai@zsyio.com',
    phone: '+91 987 654 3210'
  }
];

const INPUT_CLASS = "w-full bg-transparent border-b border-[hsl(var(--surface1))] focus:border-[hsl(var(--lavender))] focus:outline-none py-3 text-lg md:text-xl text-[hsl(var(--text))] font-Barlow transition-colors placeholder:text-[hsl(var(--surface2))]";

const DEFAULT_SERVICES = ['Web Development', 'Cloud Migration', 'UI/UX Design', 'App Development', 'IT Consulting', 'Other'];

export default function Form() {
  const location = useLocation();
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '', services: [] });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const msg = params.get('message');
    const svc = params.get('service');
    
    if (msg || svc) {
      setForm(prev => {
        const updates = { ...prev };
        if (msg) updates.message = msg;
        if (svc && !prev.services.includes(svc)) {
          updates.services = [...prev.services, svc];
        }
        return updates;
      });
    }
  }, [location.search]);

  const toggleService = (service) => {
    setForm(prev => {
      if (prev.services.includes(service)) {
        return { ...prev, services: prev.services.filter(s => s !== service) };
      }
      return { ...prev, services: [...prev.services, service] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContact(form);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="border-[hsl(var(--surface1))] grid grid-cols-1 lg:grid-cols-[3fr_2fr] max-w-7xl mx-auto w-full">
      
      {/* Left: Form Area */}
      <div className="px-6 md:px-14 py-16 md:py-24 lg:border-r border-[hsl(var(--surface1))] relative">
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center h-full py-12"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase font-bold text-[hsl(var(--lavender))] mb-6">
              Message Received
            </div>
            <h2 className="font-Barlow text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 text-[hsl(var(--text))] leading-none">
              We'll Be In <br /> Touch.
            </h2>
            <p className="font-barlow text-lg text-[hsla(var(--text)/0.7)] max-w-md mb-12">
              A consultant from our team will review your message and respond within 24 hours with a personal reply.
            </p>
            <button
              onClick={() => { setStatus('idle'); setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '', services: [] }) }}
              className="self-start font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsl(var(--text))] pb-1 hover:text-[hsl(var(--lavender))] hover:border-[hsl(var(--lavender))] transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-12">
              Project Inquiry
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {status === 'error' && (
                <div className="bg-[hsla(var(--red)/0.1)] text-[hsl(var(--red))] px-4 py-3 text-sm font-bold tracking-wider uppercase border border-[hsla(var(--red)/0.2)]">
                  Failed to send. Please try again.
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <label className="block font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-2">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ravi Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className="block font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-2">Company</label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className="block font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-2">Work Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="ravi@acme.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className="block font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label className="block font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-4">Services of Interest</label>
                <div className="flex flex-wrap gap-3">
                  {Array.from(new Set([...DEFAULT_SERVICES, ...form.services])).map(service => {
                    const isSelected = form.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`font-barlow text-[13px] md:text-[14px] font-bold px-4 py-2 rounded-xl transition-all duration-300 ${isSelected ? 'bg-[hsl(var(--lavender))] text-[hsl(var(--base))] shadow-md' : 'bg-[hsla(var(--surface1)/0.5)] text-[hsl(var(--subtext1))] hover:bg-[hsl(var(--surface2))] hover:text-[hsl(var(--text))]'}`}
                      >
                        {service}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="App Development, Cloud Migration..."
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label className="block font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-2">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your project, timeline, and goals..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${INPUT_CLASS} resize-none`}
                />
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <p className="font-barlow text-[10px] tracking-[0.1em] uppercase text-[hsla(var(--text)/0.4)] font-bold max-w-[200px] leading-relaxed">
                  Your information is kept strictly confidential.
                </p>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[hsl(var(--lavender))] flex justify-center items-center font-bold text-[15px] md:text-[16px] text-[hsl(var(--base))] px-8 py-4 cursor-pointer rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--lavender)/0.25)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>

      {/* Right: Offices & Links */}
      <div className="px-6 md:px-14 py-16 md:py-24 border-t lg:border-t-0 border-[hsl(var(--surface1))] flex flex-col justify-between">
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-10">
            Our Offices
          </p>
          
          <div className="flex flex-col">
            {OFFICES.map((office, i) => (
              <div key={office.city} className={`pb-8 mb-8 ${i !== OFFICES.length - 1 ? 'border-b border-[hsl(var(--surface1))]' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-Barlow text-2xl font-black uppercase tracking-tight text-[hsl(var(--text))]">{office.city}</span>
                  <span className="font-barlow text-[9px] tracking-[0.2em] uppercase font-bold border border-[hsl(var(--surface1))] px-2 py-0.5 text-[hsl(var(--subtext1))]">{office.label}</span>
                </div>
                <div className="space-y-1 mb-6">
                  {office.address.map((line) => (
                    <p key={line} className="font-barlow text-sm text-[hsla(var(--text)/0.6)]">{line}</p>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <a href={`mailto:${office.email}`} className="font-barlow text-sm font-bold text-[hsl(var(--text))] hover:text-[hsl(var(--lavender))] transition-colors self-start">{office.email}</a>
                  <p className="font-barlow text-sm text-[hsla(var(--text)/0.6)]">{office.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="pt-8 border-t border-[hsl(var(--surface1))]">
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-6">
            Quick Links
          </p>
          <div className="flex flex-col gap-4">
            <Link to="/services" className="flex items-center justify-between group">
              <span className="font-barlow text-sm font-bold text-[hsla(var(--text)/0.7)] group-hover:text-[hsl(var(--text))] transition-colors uppercase tracking-wider">View Our Services</span>
              <span className="text-[hsl(var(--surface2))] group-hover:text-[hsl(var(--lavender))] transition-colors">→</span>
            </Link>
            <Link to="/projects" className="flex items-center justify-between group">
              <span className="font-barlow text-sm font-bold text-[hsla(var(--text)/0.7)] group-hover:text-[hsl(var(--text))] transition-colors uppercase tracking-wider">See Our Work</span>
              <span className="text-[hsl(var(--surface2))] group-hover:text-[hsl(var(--lavender))] transition-colors">→</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
