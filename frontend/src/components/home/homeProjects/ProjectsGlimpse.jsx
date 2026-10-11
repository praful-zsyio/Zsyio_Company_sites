import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjects } from "../../../services/api";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   ProjectRow — single accordion row
───────────────────────────────────────────── */
const ProjectRow = ({ project, index, isOpen, onToggle, isLast }) => {
  const panelRef    = useRef(null);
  const contentRef  = useRef(null);
  const tweenRef    = useRef(null);

  // GSAP height animation for smooth open/close
  useEffect(() => {
    if (!panelRef.current || !contentRef.current) return;
    tweenRef.current?.kill();

    if (isOpen) {
      gsap.set(panelRef.current, { display: "block" });
      tweenRef.current = gsap.fromTo(
        panelRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      // Stagger content items in
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.15 }
      );
    } else {
      tweenRef.current = gsap.to(panelRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => gsap.set(panelRef.current, { display: "none" }),
      });
    }
  }, [isOpen]);

  return (
    <div className={`border-t border-[hsl(var(--highlight))] ${isLast ? "border-b" : ""}`}>

      {/* ── Collapsed trigger row ── */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`
          w-full text-left px-6 md:px-14 py-4 lg:py-5
          flex items-center gap-4 md:gap-8
          transition-all duration-300 cursor-pointer group
          ${isOpen
            ? "bg-[hsl(var(--inversion))] text-[hsl(var(--textInversion))]"
            : "hover:bg-[hsl(var(--inversion))]/8 text-[hsl(var(--text))]"}
        `}
      >
        {/* Index */}
        <span className="font-Barlow text-[10px] tracking-[0.3em] uppercase font-medium flex-shrink-0 w-7 opacity-30 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Title */}
        <span className="font-Barlow text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight flex-1 leading-none">
          {project.title}
        </span>

        {/* Category — hidden on mobile */}
        <span className="hidden md:block font-Barlow text-[10px] tracking-[0.22em] uppercase font-medium flex-shrink-0 w-40 opacity-40">
          {project.category || (project.tags?.[0]) || "—"}
        </span>

        {/* First tag pill — hidden on small */}
        {project.tags?.[1] && (
          <span className={`
            hidden lg:block font-Barlow text-[9px] tracking-[0.18em] uppercase font-medium
            border px-2.5 py-1 flex-shrink-0 transition-colors duration-300
            border-[hsl(var(--highlight))]
            ${isOpen
              ? "text-[hsl(var(--textInversion))]"
              : "text-[hsl(var(--text))]/80"}
          `}>
            {project.tags[1]}
          </span>
        )}

        {/* Highlight accent line — grows on hover */}
        <span className="hidden md:block h-px flex-shrink-0 w-0 group-hover:w-12 transition-all duration-300 bg-[hsl(var(--highlight))]" />

        {/* Toggle */}
        <span
          className="flex-shrink-0 text-xl leading-none select-none font-light"
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
            display: "inline-block",
            color: isOpen ? "hsl(var(--textInversion))" : "hsl(var(--highlight))",
          }}
        >
          +
        </span>
      </button>

      {/* ── Expanded panel (GSAP-animated) ── */}
      <div ref={panelRef} style={{ display: "none", overflow: "hidden" }}>
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-[5fr_7fr] bg-black text-white group"
        >
          {/* Left — image */}
          <div className="relative" style={{ minHeight: "260px" }}>
            <div className="absolute inset-4 md:inset-6 lg:inset-8 overflow-hidden rounded-2xl md:rounded-[2rem]">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 grayscale opacity-[0.55] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <span
                    className="font-Barlow font-black uppercase select-none pointer-events-none"
                    style={{ fontSize: "clamp(5rem, 15vw, 12rem)", lineHeight: 1, color: "rgba(255,255,255,0.06)" }}
                  >
                    {(project.category || project.title || "").charAt(0)}
                  </span>
                </div>
              )}
              {/* Highlight tint overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
                style={{ background: "linear-gradient(135deg, hsla(var(--highlight)/0.18) 0%, transparent 60%)" }}
              />
              <div className="absolute bottom-4 left-5 transition-opacity duration-500 group-hover:opacity-0 z-10">
                <span className="font-Barlow text-[10px] tracking-[0.3em] uppercase font-medium opacity-30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Right — details */}
          <div className="px-8 md:px-12 py-10 flex flex-col justify-between gap-6 relative overflow-hidden">
            {/* Ghost number */}
            <span
              aria-hidden
              className="font-Barlow font-black uppercase absolute pointer-events-none select-none"
              style={{
                fontSize: "clamp(5rem, 12vw, 14rem)",
                lineHeight: 0.85,
                right: "-0.04em",
                top: "-0.08em",
                color: "hsla(var(--highlight)/0.2)",
                letterSpacing: "-0.04em",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Meta + title + desc */}
            <div className="relative">
              <p className="font-Barlow text-[10px] tracking-[0.28em] uppercase font-medium mb-3"
                style={{ color: "hsl(var(--highlight))" }}>
                {project.category || "Digital Product"}
                {project.tags?.[0] ? ` — ${project.tags[0]}` : ""}
              </p>
              <h3 className="font-Barlow text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-5 leading-none"
                style={{ color: "white" }}>
                {project.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed max-w-lg"
                style={{ color: "rgba(255,255,255,0.7)" }}>
                {project.description || "A focused build that aligns UX, performance, and long-term maintainability."}
              </p>
            </div>

            {/* Tags + CTA */}
            <div className="relative border-t pt-5 flex flex-wrap items-end justify-between gap-4"
              style={{ borderColor: "hsl(var(--highlight))" }}>
              <div className="flex flex-wrap gap-2">
                {(project.tags || []).slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-Barlow text-[9px] tracking-[0.18em] uppercase border px-2.5 py-1"
                    style={{ borderColor: "hsl(var(--highlight))", color: "white" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/projects/${project.id}`}
                className="bg-[hsla(var(--highlight))] flex justify-center items-center font-bold text-[14px] md:text-[15px] text-[hsla(var(--base))] px-5 py-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--highlight)/0.25)] w-max"
              >
                View Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ProjectsGlimpse — main component
───────────────────────────────────────────── */
const ProjectsGlimpse = () => {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const rowsRef     = useRef(null);
  const [projectsData, setProjectsData] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [open,         setOpen]         = useState(0);

  useEffect(() => {
    getProjects()
      .then((res) => setProjectsData(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false));
  }, []);

  // ── Scroll-triggered entrance animations ──
  useEffect(() => {
    if (loading || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header — tag + title + subtitle stagger up
      gsap.from(headerRef.current?.children || [], {
        opacity: 0,
        y: 36,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      // Rows — stagger slide up from bottom
      const rows = gsap.utils.toArray(rowsRef.current?.querySelectorAll(".project-row") || []);
      gsap.from(rows, {
        opacity: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading || !projectsData.length) return null;

  const preview = projectsData.slice(0, 5);

  return (
    <section
      ref={sectionRef}
      className="mt-16 lg:mt-24 px-6 md:px-10 w-full"
    >
      {/* ── Section header — same as Services ── */}
      <div ref={headerRef} className="flex justify-between lg:items-center flex-col lg:flex-row mb-8 lg:mb-12">
        <div>
          <h3 className="text-[11px] md:text-[12px] font-medium text-[hsla(var(--highlight)/0.8)] uppercase flex flex-wrap gap-3 md:gap-5 pl-1 mb-2">
            <span className="tracking-[.2rem]">Selected </span>
            <span className="tracking-[.2rem]">Work</span>
          </h3>
          <h1 className="text-[2.5rem] lg:text-[5rem] font-black font-Barlow uppercase leading-none">
            Projects
          </h1>
        </div>
        <h6 className="text-[0.8rem] font-Barlow uppercase mt-3 lg:mt-0 max-w-xs text-right">
          Real products. Real impact.<br />everything built as a <span className="text-[hsl(var(--highlight))] font-medium">masterpiece</span>.
        </h6>
      </div>

      {/* ── Accordion rows ── */}
      <div ref={rowsRef} className="flex flex-col mb-12">
        {preview.map((project, i) => (
          <div key={project.id} className="project-row">
            <ProjectRow
              project={project}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
              isLast={i === preview.length - 1}
            />
          </div>
        ))}
      </div>

      {/* ── View all — same as Services ── */}
      <div className="flex justify-center mb-16">
        <a
          href="/projects"
          className="text-[0.8rem] font-Barlow uppercase tracking-[.15rem] text-[hsl(var(--highlight))] underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          View All Projects
        </a>
      </div>

    </section>
  );
};

export default ProjectsGlimpse;
