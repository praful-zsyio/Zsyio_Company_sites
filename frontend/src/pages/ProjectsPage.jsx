import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { getProjects } from "../services/api";
import ProjectMarquee from "../components/projects/ProjectMarquee";
import CartAndContact from "../components/services/CartAndContact";
import { usePageSEO } from "../utils/seo";

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  usePageSEO({
    title: "Client Case Studies & Enterprise Projects",
    description: "Explore enterprise client engagements, architectural case studies, and engineering solutions delivered by Zsyio.",
    url: "/projects",
  });

  useEffect(() => {
    getProjects()
      .then((response) => {
        setProjectsData(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => console.error("Error fetching projects:", error))
      .finally(() => setLoading(false));
  }, []);

  // Derive unique industries/categories from the fetched data
  const allIndustries = [
    "All",
    ...Array.from(
      new Set(
        projectsData
          .map((p) => p.industry || p.category || p.type)
          .filter(Boolean)
      )
    ),
  ];

  const filtered =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter(
          (p) => (p.industry || p.category || p.type) === activeFilter
        );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[hsl(var(--text))]">
        <p className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold animate-pulse">
          Loading Projects...
        </p>
      </div>
    );
  }

  return (
    <main className="pt-20 md:pt-28 text-[hsl(var(--text))] min-h-screen">
      {/* ─── HERO STRIP ──────────────────────────────────────────────────────── */}
      <section className='flex flex-col lg:flex-row mt-16 lg:mt-10 px-6 md:px-10 border-b border-[hsl(var(--surface1))] pb-12'>
        <div className='flex flex-col justify-center py-12 lg:py-0 w-full lg:w-[55%] lg:pr-16'>
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-[11px] md:text-[12px] font-medium text-[hsla(var(--highlight)/0.8)] uppercase flex flex-wrap gap-3 md:gap-3 pl-1'
          >
            <span className='tracking-[.2em]'>Selected Work</span>
          </motion.h3>

          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className='font-Barlow font-[900] uppercase tracking-[-.05em] mt-6 md:mt-10 leading-[0.95]'
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
          >
            Project<br />
            <span className='text-[hsla(var(--highlight))]'>Archive.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='grid grid-cols-2 gap-x-6 gap-y-10 mt-10 md:mt-16'
          >
            <div className='flex flex-col'>
               <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--highlight))]'>{projectsData.length}</span>
               <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Featured Projects</span>
            </div>
            <div className='flex flex-col'>
               <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--highlight))]'>{allIndustries.length - 1}</span>
               <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Industries</span>
            </div>
            <div className='flex flex-col'>
               <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--highlight))]'>50+</span>
               <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Total Shipped</span>
            </div>
            <div className='flex flex-col'>
               <span className='text-3xl md:text-5xl font-bold font-Barlow text-[hsla(var(--highlight))]'>10-18</span>
               <span className='text-xs md:text-sm text-[hsla(var(--text)/0.6)] uppercase tracking-[.15em] mt-2'>Avg. Weeks</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className='flex flex-col justify-center w-full lg:w-[45%] lg:pl-12 pb-12 lg:pb-0'
        >
          <p className='font-barlow text-lg md:text-[22px] leading-relaxed md:leading-[1.6] text-[hsla(var(--text)/0.8)] max-w-lg'>
            From 0→1 launches to large-scale enterprise transformations, each
            engagement is led by senior engineers and measured against outcomes
            — not deliverables.
          </p>

          <div className='w-16 h-[2px] bg-[hsla(var(--highlight)/0.4)] mt-10 md:mt-12'></div>

          <div className='flex flex-wrap gap-3 mt-8 md:mt-10'>
            {['Cloud Migration', 'Digital Transformation', 'Platform Engineering', 'Mobile Apps'].map(tag => (
              <span key={tag} className='px-4 py-2 text-xs md:text-sm border border-[hsla(var(--highlight)/0.3)] rounded-full text-[hsla(var(--highlight))] bg-[hsla(var(--highlight)/0.05)] hover:bg-[hsla(var(--highlight)/0.1)] transition-colors duration-300 cursor-default font-barlow'>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <ProjectMarquee items={['Case Study', 'Digital Innovation', 'Strategic Execution', 'Enterprise Solution', 'Results Driven']} />

      {/* ─── MAIN CONTENT: sticky left + scrollable right ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">
        {/* LEFT: sticky sidebar */}
        <aside className="lg:sticky lg:top-24 self-start border-b lg:border-b-0 lg:border-r border-[hsl(var(--surface1))]">
          <div className="px-6 md:px-8 py-10 flex flex-col gap-8">
            {/* Filter by industry */}
            <div>
              <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-4 text-[hsl(var(--subtext1))]">
                Filter by Category
              </p>
              <div className="flex flex-col gap-0">
                {allIndustries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setActiveFilter(ind)}
                    className={`text-left py-3 border-b border-[hsl(var(--surface1))] flex items-center justify-between group transition-colors
                      ${
                        activeFilter === ind
                          ? "text-[hsl(var(--highlight))]"
                          : "text-[hsl(var(--text))] hover:text-[hsl(var(--highlight))]"
                      }`}
                  >
                    <span className="font-Barlow text-xl font-bold uppercase tracking-tight">
                      {ind}
                    </span>
                    {activeFilter === ind && (
                      <span className="w-2 h-2 bg-[hsl(var(--highlight))] flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary metrics */}
            <div className="border-t border-[hsl(var(--surface1))] pt-8">
              <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-5 text-[hsl(var(--subtext1))]">
                Showing
              </p>
              <div className="font-Barlow text-5xl font-black tracking-tight mb-1 text-[hsl(var(--text))]">
                {filtered.length}
              </div>
              <p className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--highlight))]">
                {activeFilter === "All" ? "All Projects" : activeFilter}
              </p>
            </div>

            {/* CTA */}
            <div className="border-t border-[hsl(var(--surface1))] pt-8">
              <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-4 text-[hsl(var(--subtext1))]">
                Start a Project
              </p>
              <Link
                to="/services"
                className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsl(var(--highlight))] text-[hsl(var(--highlight))] pb-0.5 hover:text-[hsl(var(--text))] hover:border-[hsl(var(--text))] transition-colors"
              >
                View Services &rarr;
              </Link>
            </div>
          </div>
        </aside>

        {/* RIGHT: project rows */}
        <main>
          {filtered.map((project, i) => (
            <ProjectRow
              key={project.id || i}
              project={project}
              index={i}
              isLast={i === filtered.length - 1}
            />
          ))}

          {filtered.length === 0 && (
            <div className="px-8 py-20">
              <p className="font-Barlow text-3xl font-black uppercase tracking-tight text-[hsl(var(--subtext1))]">
                No projects in this category.
              </p>
            </div>
          )}
        </main>
      </div>

      <ProjectMarquee items={["Let's Build Something Great", 'Ready to transform your business?', "Connect With Us"]} />


        <CartAndContact />
    </main>
  );
}

// ─── PROJECT ROW ──────────────────────────────────────────────────────────────

function ProjectRow({ project, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const num = String(index + 1).padStart(2, "0");
  const year = project.year || project.date?.substring(0, 4) || "2024";
  const industry = project.industry || project.category || project.type || "General";
  const scope = project.scope || "Development";
  const title = project.title || "Untitled Project";
  const outcome = project.outcome || project.highlight || "Delivered successfully";
  const image = project.img || project.image || project.thumbnail;
  const summary = project.summary || project.description || "Project summary goes here.";
  const challenge = project.challenge || "Complex requirements and strict timeline.";
  
  // Deliverables might be an array or string
  let deliverables = project.deliverables || [];
  if (typeof deliverables === "string") {
    deliverables = deliverables.split("\n").filter((d) => d.trim());
  } else if (!Array.isArray(deliverables) || deliverables.length === 0) {
    deliverables = ["Architecture Design", "Development & Testing", "Deployment & Support"];
  }

  // Tech stack
  let stack = project.stack || project.techStack || project.tags || [];
  if (typeof stack === "string") {
    stack = stack.split(",").map((s) => s.trim());
  } else if (!Array.isArray(stack) || stack.length === 0) {
    stack = ["React", "Node.js", "PostgreSQL"];
  }

  const duration = project.duration || project.timeline || "3 Months";
  const teamSize = project.teamSize || "5 Engineers";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className={`${!isLast ? "border-b border-[hsl(var(--surface1))]" : ""} bg-[hsla(var(--highlight)/0.02)] hover:bg-[hsla(var(--highlight)/0.04)] transition-colors duration-500`}
    >
      {/* Row header — always visible */}
      <div className="px-8 md:px-12 pt-10 pb-0">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-4">
            <span className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
              {num}
            </span>
            <span className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
              {year}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <span className="font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border border-[hsl(var(--surface1))] px-2 py-1 text-[hsl(var(--text))]">
              {industry}
            </span>
            <span className="font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border border-[hsl(var(--surface1))] px-2 py-1 text-[hsl(var(--text))]">
              {scope}
            </span>
          </div>
        </div>

        <h2 className="font-Barlow font-black uppercase text-[clamp(2rem,5vw,4.5rem)] leading-[0.9] tracking-tight mb-4 text-[hsl(var(--text))]">
          {title}
        </h2>

        {/* Outcome — key stat */}
        <div className="mb-8">
          <span className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mr-3">
            Outcome
          </span>
          <span className="font-Barlow text-2xl font-black uppercase tracking-tight text-[hsl(var(--highlight))]">
            {outcome}
          </span>
        </div>
      </div>

      {/* Image */}
      {image ? (
        <div
          className="mx-8 md:mx-12 border border-[hsl(var(--surface1))] overflow-hidden bg-[hsl(var(--mantle))]"
          style={{ height: "280px" }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          />
        </div>
      ) : (
        <div
          className="mx-8 md:mx-12 border border-[hsl(var(--surface1))] bg-[hsla(var(--highlight)/0.05)] flex items-end p-6"
          style={{ height: "180px" }}
        >
          <span
            aria-hidden
            className="font-Barlow font-black uppercase text-[clamp(3rem,8vw,8rem)] leading-[0.85] tracking-tight text-[hsla(var(--highlight)/0.1)] select-none"
          >
            {scope}
          </span>
        </div>
      )}

      {/* Body */}
      <div className="px-8 md:px-12 pt-8 pb-0">
        {/* Summary */}
        <p className="font-barlow text-sm md:text-base leading-relaxed text-[hsl(var(--text))] max-w-2xl mb-8">
          {summary}
        </p>

        {/* Two-column: challenge + deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-[hsl(var(--surface1))]">
          <div className="py-6 md:border-r border-[hsl(var(--surface1))] md:pr-8">
            <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-4 text-[hsl(var(--subtext1))]">
              The Challenge
            </p>
            <p className="font-barlow text-sm leading-relaxed text-[hsl(var(--text))] opacity-80">
              {challenge}
            </p>
          </div>
          <div className="py-6 border-t md:border-t-0 border-[hsl(var(--surface1))] md:pl-8">
            <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-4 text-[hsl(var(--subtext1))]">
              What We Delivered
            </p>
            <ul className="flex flex-col gap-2">
              {deliverables.slice(0, 5).map((d) => (
                <li
                  key={d}
                  className="font-barlow flex items-start gap-3 text-sm leading-snug text-[hsl(var(--text))] opacity-80"
                >
                  <span className="mt-1.5 w-1 h-1 flex-shrink-0 bg-[hsl(var(--highlight))]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer meta row */}
      <div className="px-8 md:px-12 py-6 border-t border-[hsl(var(--surface1))] grid grid-cols-2 md:grid-cols-4 gap-0">
        {/* Stack */}
        <div className="md:border-r border-[hsl(var(--surface1))] md:pr-6 col-span-2 md:col-span-1 border-b md:border-b-0 pb-4 md:pb-0">
          <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mb-2">
            Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {stack.slice(0, 5).map((t) => (
              <span
                key={t}
                className="font-barlow text-[10px] tracking-[0.1em] uppercase font-bold border border-[hsl(var(--surface1))] px-2 py-0.5 text-[hsl(var(--text))]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="md:border-r border-[hsl(var(--surface1))] md:px-6 pt-4 md:pt-0 border-b md:border-b-0 pb-4 md:pb-0">
          <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mb-2">
            Duration
          </p>
          <p className="font-Barlow text-xl font-bold uppercase tracking-tight text-[hsl(var(--text))]">
            {duration}
          </p>
        </div>

        <div className="md:border-r border-[hsl(var(--surface1))] md:px-6 pt-4 md:pt-0 border-b md:border-b-0 pb-4 md:pb-0">
          <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mb-2">
            Team
          </p>
          <p className="font-Barlow text-xl font-bold uppercase tracking-tight text-[hsl(var(--text))]">
            {teamSize}
          </p>
        </div>

        <div className="md:pl-6 pt-4 md:pt-0 flex items-end">
          <Link
            to={`/projects/${project.id || project.slug}`}
            className="font-barlow text-[10px] tracking-[0.15em] uppercase font-bold bg-[hsl(var(--text))] text-[hsl(var(--base))] px-4 py-2 hover:bg-[hsl(var(--highlight))] transition-colors w-full text-center"
          >
            Read Full Study &rarr;
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
