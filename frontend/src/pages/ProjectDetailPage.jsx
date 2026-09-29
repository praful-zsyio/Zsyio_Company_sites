import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectById } from "../services/api";

// Subcomponents
import ProjectHero from "../components/projects/ProjectHero";
import ProjectImage from "../components/projects/ProjectImage";
import ProjectOverview from "../components/projects/ProjectOverview";
import ProjectSidebar from "../components/projects/ProjectSidebar";
import ProjectTestimonial from "../components/projects/ProjectTestimonial";
import ProjectGallery from "../components/projects/ProjectGallery";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    getProjectById(projectId)
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        console.error("Failed to load project details:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[hsl(var(--text))]">
        <p className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold animate-pulse">
          Loading Project...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[hsl(var(--text))]">
        <div className="text-center">
          <p className="font-Barlow font-black text-4xl uppercase tracking-tight mb-4 text-[hsl(var(--text))]">
            Project Not Found
          </p>
          <Link
            to="/projects"
            className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsl(var(--lavender))] text-[hsl(var(--lavender))] pb-0.5 hover:text-[hsl(var(--text))] transition-colors"
          >
            &larr; Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  const {
    title = "Untitled Project",
    category,
    type,
    industry = "General",
    scope = "Development",
    summary,
    description,
    image,
    img,
    thumbnail,
    live_url,
    liveUrl,
    duration = "3 Months",
    teamSize = "5 Engineers",
    outcome,
    highlight,
    challenges,
    solutions,
    testimonial,
  } = project;

  const finalImage = image || img || thumbnail;
  const finalLiveUrl = live_url || liveUrl;
  const finalOutcome = outcome || highlight || "Successfully Delivered";
  
  // Deliverables mapping
  let deliverables = project.deliverables || [];
  if (typeof deliverables === "string") {
    deliverables = deliverables.split("\n").filter((d) => d.trim());
  } else if (!Array.isArray(deliverables) || deliverables.length === 0) {
    deliverables = ["Architecture Design", "Development & Testing", "Deployment & Support"];
  }

  // Tech stack mapping
  let stack = project.stack || project.tech_stack || project.techStack || project.tags || [];
  if (typeof stack === "string") {
    stack = stack.split(",").map((s) => s.trim());
  } else if (!Array.isArray(stack) || stack.length === 0) {
    stack = ["React", "Node.js", "PostgreSQL"];
  }

  const year = project.year || project.date?.substring(0, 4) || "2024";

  return (
    <main className="pt-20 md:pt-28 text-[hsl(var(--text))] min-h-screen flex flex-col">
      <ProjectHero
        title={title}
        duration={duration}
        teamSize={teamSize}
        year={year}
        industry={industry}
        summary={summary}
        stack={stack}
        scope={scope}
        finalLiveUrl={finalLiveUrl}
      />

      <ProjectImage finalImage={finalImage} title={title} />

      <section className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_320px]">
        <ProjectOverview
          description={description}
          summary={summary}
          challenges={challenges}
          deliverables={deliverables}
        />
        
        <ProjectSidebar
          finalOutcome={finalOutcome}
          stack={stack}
          duration={duration}
          teamSize={teamSize}
        />
      </section>

      <ProjectTestimonial testimonial={testimonial} finalOutcome={finalOutcome} />

      <ProjectGallery finalImage={finalImage} title={title} />

      {/* ─── FOOTER STRIP ────────────────────────────────────────────────────── */}
      <footer className="border-t border-[hsl(var(--surface1))] px-6 md:px-14 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link
          to="/projects"
          className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--text))] hover:text-[hsl(var(--lavender))] transition-colors"
        >
          &larr; Back to All Projects
        </Link>
      </footer>
    </main>
  );
}
