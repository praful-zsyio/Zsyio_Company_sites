import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
} from "lucide-react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { Icon: Github, label: "GitHub", href: "https://github.com/ZSYIO" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/zsyio-technology-0b0005391/" },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/zsyio_tech/" },
];

const Footer = () => {
  const container = useRef(null);
  const currentYear = new Date().getFullYear();

  useGSAP(
    () => {
      if (!container.current) return;

      const elements = container.current.querySelectorAll(".footer-animate");

      gsap.from(elements, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 95%",
          once: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <footer
      ref={container}
      className="overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* ─── Column 1: Brand & About (6 cols on lg) ─── */}
        <div className="lg:col-span-5 px-6 md:px-10 lg:px-14 py-14 lg:border-r border-b lg:border-b-0 border-[hsla(var(--lavender))]">
          <p className="font-Barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-8 text-[hsla(var(--lavender)/0.8)] footer-animate">
            ZSYIO Technology
          </p>
          
          <h2 className="font-Barlow text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 leading-none footer-animate">
            Zsyio<span className="text-[hsla(var(--lavender))]">™</span>
          </h2>
          
          <div className="space-y-6 max-w-sm footer-animate">
            <p className="font-Barlow text-sm md:text-base leading-relaxed text-[hsla(var(--text)/0.75)] tracking-wide">
              Building scalable digital systems - from intelligent web platforms 
              to high-performance mobile and enterprise software.
            </p>
            <p className="font-Barlow text-sm md:text-base leading-relaxed text-[hsla(var(--text)/0.75)] tracking-wide">
              Headquartered in India. Partnering with global teams to engineer
              reliable, future-ready technology.
            </p>
          </div>

          <div className="mt-12 flex gap-4 footer-animate">
            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                target="_blank"
                href={href}
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  group
                  flex items-center justify-center
                  w-12 h-12 rounded-xl
                  bg-[hsla(var(--lavender))] text-[hsla(var(--base))]
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--lavender)/0.25)]
                "
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* ─── Column 2: Navigation (3 cols on lg) ─── */}
        <div className="lg:col-span-3 px-6 md:px-10 lg:px-10 py-14 border-b lg:border-b-0 lg:border-r border-[hsla(var(--lavender))]">
          <p className="font-Barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-8 text-[hsla(var(--lavender)/0.8)] footer-animate">
            Navigation
          </p>
          <ul className="space-y-0 flex flex-col">
            {[
              { name: "About Us", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Projects", path: "/projects" },
              { name: "Products", path: "/products" },
              { name: "Contact", path: "/contact" }
            ].map((link) => (
              <li key={link.name} className="footer-animate">
                <Link
                  to={link.path}
                  className="group flex items-center justify-between py-5 border-b border-[hsla(var(--lavender)/0.3)] hover:px-2 transition-all duration-300 text-[hsla(var(--text))] hover:text-[hsla(var(--lavender))]"
                >
                  <span className="font-Barlow text-lg font-bold uppercase tracking-wide">
                    {link.name}
                  </span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Column 3: Legal & Standards (4 cols on lg) ─── */}
        <div className="lg:col-span-4 px-6 md:px-10 lg:px-14 py-14">
          <p className="font-Barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-8 text-[hsla(var(--lavender)/0.8)] footer-animate">
            Legal & Standards
          </p>
          
          <ul className="space-y-4 mb-12 footer-animate">
            {[
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Terms & Conditions", path: "/terms" },
              { name: "Disclaimer", path: "/disclaimer" },
              { name: "Trademarks", path: "/trademarks" }
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="font-Barlow text-sm text-[hsla(var(--text)/0.75)] hover:text-[hsla(var(--lavender))] transition-colors duration-200 tracking-wide"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <p className="font-Barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-6 text-[hsla(var(--lavender)/0.8)] footer-animate">
            Engineering Principles
          </p>
          <div className="flex flex-wrap gap-3 footer-animate">
            {["ISO-Ready", "Secure Pipelines", "Cloud-Native", "Performance Optimized"].map((tag) => (
              <span key={tag} className="font-Barlow text-[10px] tracking-[0.18em] uppercase font-medium border border-[hsla(var(--lavender)/0.5)] text-[hsla(var(--text)/0.8)] px-3 py-1.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="bg-[hsla(var(--lavender)/0.02)] px-6 md:px-8 lg:px-14 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 footer-animate">
          
          <div className="text-center lg:text-left space-y-1.5 flex-1">
            <p className="font-Barlow text-[13px] text-[hsla(var(--text)/0.8)] tracking-wide">
              © {currentYear} <span className="font-bold text-[hsla(var(--text))]">Zsyio™</span>. All rights reserved.
            </p>
            <p className="font-Barlow text-[11px] text-[hsla(var(--text)/0.4)] tracking-wide max-w-xl">
              Registered technology brand. All product names, logos, and trademarks are property of their respective owners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 border border-[hsla(var(--lavender)/0.3)] bg-[hsla(var(--surface0)/0.5)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-Barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsla(var(--text)/0.8)]">
                All Systems Operational
              </span>
            </div>
            
            <div className="font-Barlow text-[10px] tracking-[0.2em] uppercase font-medium text-[hsla(var(--lavender)/0.8)]">
              Engineered in India • v2.1.1
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;

