import React, { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import { getProjects } from "../services/api"; // Or implement getProject(id)

gsap.registerPlugin(ScrollTrigger);

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const container = useRef(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all and find by ID (simplest for now without specific endpoint)
    getProjects()
      .then((res) => {
        const found = res.data.find((p) => String(p.id) === String(projectId));
        setProject(found);
      })
      .catch((err) => console.error("Error fetching project:", err))
      .finally(() => setLoading(false));
  }, [projectId]);

  useGSAP(
    () => {
      if (!container.current || loading || !project) return;
      // ... (animations remain same)
      const tl = gsap.timeline();

      tl.from(".pd-hero-animate", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      const sections = container.current.querySelectorAll(".pd-section-animate");
      sections.forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    },
    { scope: container, dependencies: [loading, project] }
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--base))] text-[hsl(var(--text))]">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--base))] text-[hsl(var(--text))]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Project not found</h2>
          <Link to="/projects" className="text-[hsl(var(--blue))] hover:underline">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  // Destructure content from project object (adjust fields as per your Django model serializer)
  const {
    title,
    category,
    description, // or summary?
    summary,
    techStack = [],
    tags = [],
    liveUrl,
    repoUrl,
    image, // handle image URL
    // Add other fields you might have added to the model
  } = project;

  // Fallbacks if your model fields differ slightly from static data
  const technologies = techStack.length ? techStack : tags;
  const displayDesc = description || summary || "A digital product designed to bring clarity, focus, and measurable impact.";
  const displayCategory = category || tags?.[0] || "Case Study";
  const displaySummary = summary || description || "A digital product designed to bring clarity, focus, and measurable impact.";

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[hsl(var(--base))] text-[hsl(var(--text))]"
    >
      {/* HEADER / HERO */}
      <header
        className="
          border-b border-[hsl(var(--surface1))]
          px-6 md:px-16
          pt-32 md:pt-40
          pb-12
        "
      >
        {/* Breadcrumb */}
        <div className="project-detail-animate mb-5 flex items-center gap-2 text-xs md:text-sm text-[hsl(var(--subtext0))]">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 hover:text-[hsl(var(--blue))] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to projects</span>
          </Link>
          <span className="mx-1 text-[hsl(var(--overlay1))]">/</span>
          <span className="uppercase tracking-wide">{category}</span>
        </div>

        {/* Title + Summary */}
        <h1 className="project-detail-animate text-3xl md:text-5xl lg:text-6xl font-light leading-tight max-w-4xl">
          {project.title}
          <span className="block text-[hsl(var(--subtext1))] text-base md:text-xl mt-3 font-normal">
            {shortSummary}
          </span>
        </h1>

        {/* Tag pills */}
        {project.tags && project.tags.length > 0 && (
          <div className="project-detail-animate flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[11px] rounded-full border border-[hsl(var(--surface1))] text-[hsl(var(--subtext1))]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="px-6 md:px-16 py-16 grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] max-w-7xl mx-auto">
        {/* LEFT COLUMN */}
        <section className="space-y-16">
          {/* Intro */}
          <section className="project-detail-animate">
            <p className="text-base md:text-lg text-[hsl(var(--subtext1))] leading-relaxed">
              {project.description ||
                "This project focuses on building a product that reduces noise, highlights what matters, and empowers teams to work with clarity. Every screen is crafted to support deep work and fast decision-making."}
            </p>
          </section>

          {/* Research */}
          <section className="project-detail-animate">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Research & Problem Space
            </h2>
            <p className="text-sm md:text-base text-[hsl(var(--subtext1))] leading-relaxed">
              We discovered that existing tools often overwhelm users with color,
              icons, and noisy layouts. People weren&apos;t lacking features—
              they were lacking hierarchy and calm. Our aim was to remove
              friction, reduce cognitive load, and let the product breathe.
            </p>
          </section>

          {/* Impact */}
          <section className="project-detail-animate">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Impact & Outcomes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-[hsl(var(--surface1))] rounded-xl p-6">
                <p className="text-3xl md:text-4xl font-bold">+33%</p>
                <p className="text-[11px] md:text-xs text-[hsl(var(--subtext0))] mt-2">
                  Increase in task completion rate
                </p>
              </div>
              <div className="border border-[hsl(var(--surface1))] rounded-xl p-6">
                <p className="text-3xl md:text-4xl font-bold">-51%</p>
                <p className="text-[11px] md:text-xs text-[hsl(var(--subtext0))] mt-2">
                  Decrease in drop-off during onboarding
                </p>
              </div>
            </div>
          </section>

          {/* Key Decisions */}
          <section className="project-detail-animate">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Key Design & Product Decisions
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-[hsl(var(--subtext1))]">
              <li>• Reduced visual noise with strong typographic hierarchy.</li>
              <li>• Simplified navigation to reduce cognitive friction.</li>
              <li>• Limited color palette for calm + clarity.</li>
              <li>• Components built as scalable tokens & patterns.</li>
            </ul>
          </section>
        </section>

        {/* RIGHT COLUMN / SIDEBAR */}
        <aside className="space-y-6 lg:sticky lg:top-28 self-start">
          <div className="project-detail-animate border border-[hsl(var(--surface1))] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Project Details</h3>
            <dl className="space-y-3 text-sm text-[hsl(var(--subtext1))]">
              <div>
                <dt className="text-[hsl(var(--subtext0))]">Category</dt>
                <dd>{category}</dd>
              </div>

              {techStack.length > 0 && (
                <div>
                  <dt className="text-[hsl(var(--subtext0))]">Tech Stack</dt>
                  <dd>{techStack.join(", ")}</dd>
                </div>
              )}

              <div>
                <dt className="text-[hsl(var(--subtext0))]">Status</dt>
                <dd>Completed</dd>
              </div>
            </dl>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-5 block w-full text-center text-sm font-semibold
                  bg-[hsl(var(--blue))] text-[hsl(var(--base))]
                  py-2.5 rounded-full
                  hover:bg-[hsl(var(--sapphire))]
                  transition-colors
                "
              >
                View Live Experience ↗
              </a>
            )}
          </div>

          <div className="project-detail-animate border border-[hsl(var(--surface1))] rounded-xl p-6 text-sm text-[hsl(var(--subtext1))]">
            <p>
              Approach:
              <br />
              Continuous discovery, weekly reviews, and a scalable design-token
              system kept the product aligned across surfaces & teams.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
