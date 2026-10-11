import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowLeft, Clock, DollarSign, ArrowUpRight, CheckCircle2, Cpu } from "lucide-react";
import { getServiceBySlug, getServices } from "../services/api";
import { usePageSEO } from "../utils/seo";

// Default delivery blueprint phases
const BLUEPRINT_PHASES = [
  {
    step: "01",
    phase: "Discovery & Architectural Audit",
    timeline: "Week 1 - 2",
    description: "Deep dive into existing workflows, legacy bottlenecks, compliance constraints, and security postures to map clear target objectives.",
  },
  {
    step: "02",
    phase: "Design System & Prototyping",
    timeline: "Week 3 - 4",
    description: "Architectural blueprints, API contracts, interactive UX wireframes, and validation spikes to de-risk high-complexity modules.",
  },
  {
    step: "03",
    phase: "Agile Production Sprints",
    timeline: "Week 5 - 12",
    description: "Iterative full-stack delivery with continuous integration, automated test suites, code reviews, and weekly stakeholder demos.",
  },
  {
    step: "04",
    phase: "Verification, Hardening & Launch",
    timeline: "Week 12+",
    description: "Load testing, penetration auditing, disaster recovery rehearsal, and white-glove cloud deployment with telemetry monitoring.",
  },
];

// Deliverables fallback mapping by category/slug keyword
const getDeliverables = (service) => {
  const title = (service?.title || "").toLowerCase();
  if (title.includes("cloud") || title.includes("infrastructure") || title.includes("devops")) {
    return [
      "Multi-Region Infrastructure as Code (Terraform / Pulumi)",
      "Zero-downtime CI/CD deployment pipelines",
      "Auto-scaling Kubernetes / serverless container orchestration",
      "24/7 observability, logging & Prometheus alerting setups",
      "Cost optimization & cloud security compliance audit",
    ];
  }
  if (title.includes("ai") || title.includes("machine learning")) {
    return [
      "Custom Retrieval-Augmented Generation (RAG) vector pipelines",
      "Fine-tuned LLM inference endpoints & prompt chains",
      "Low-latency streaming AI chat & completion interfaces",
      "Automated evaluation harnesses & hallucination guardrails",
      "Enterprise data privacy & on-premise model deployment",
    ];
  }
  if (title.includes("mobile") || title.includes("app")) {
    return [
      "Cross-platform iOS & Android production build assets",
      "60fps gesture-driven animations & modern UI components",
      "Offline-first sync engine & local encrypted caching",
      "Push notification integration & deep-linking handlers",
      "App Store & Google Play submission management",
    ];
  }
  if (title.includes("design") || title.includes("ui")) {
    return [
      "Comprehensive multi-platform Figma design token system",
      "Responsive interactive prototypes & component documentation",
      "User journey mapping & usability validation testing",
      "Accessibility audit conforming to WCAG 2.1 AA standards",
      "Developer handoff specs with CSS variable integration",
    ];
  }
  return [
    "Production-grade scalable architecture specification",
    "Modular, maintainable code with high test coverage",
    "RESTful & GraphQL API integrations with auto-generated docs",
    "Comprehensive security, vulnerability, and performance auditing",
    "Post-launch technical support & operational documentation",
  ];
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(false);

    // Fetch active service
    getServiceBySlug(slug)
      .then((res) => {
        setService(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch service detail:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    // Also fetch all services to show related recommendations
    getServices()
      .then((res) => {
        setAllServices(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {});
  }, [slug]);

  // Dynamic SEO
  usePageSEO({
    title: service ? `${service.title} Services` : "Service Capabilities",
    description: service?.description || "Explore our specialized software engineering and technology architecture services.",
    url: `/services/${slug}`,
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center text-[hsl(var(--text))]">
        <div className="flex flex-col items-center gap-4">
          <span className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold animate-pulse text-[hsl(var(--highlight))]">
            Loading Service Architecture...
          </span>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center text-[hsl(var(--text))]">
        <div className="max-w-md w-full text-center">
          <p className="font-mono text-xs text-[hsl(var(--highlight))] uppercase mb-3">404 // SERVICE_NOT_FOUND</p>
          <h2 className="font-Barlow font-black text-4xl md:text-5xl uppercase tracking-tight mb-6">
            Service Not Found
          </h2>
          <p className="font-barlow text-sm text-[hsla(var(--text)/0.7)] mb-8">
            The capability or practice area you requested is not currently listed.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-[hsl(var(--text))] text-[hsl(var(--base))] font-barlow font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 hover:bg-[hsl(var(--highlight))] transition-colors"
          >
            ← View All Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = LucideIcons[service.icon] || LucideIcons.Cpu;
  const deliverables = getDeliverables(service);
  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  const handleStartEngagement = () => {
    const msg = `Inquiry regarding ${service.title}:\n\nWe are looking to engage your team for our upcoming initiative. Please share timeline and availability.\n`;
    navigate(`/contact?service=${encodeURIComponent(service.title)}&message=${encodeURIComponent(msg)}`);
  };

  return (
    <article className="pt-24 md:pt-28 pb-24 text-[hsl(var(--text))] min-h-screen">
      {/* ── Top Breadcrumbs / Back ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-6 border-b border-[hsl(var(--surface1))] flex items-center justify-between">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] hover:text-[hsl(var(--highlight))] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
        </Link>
        <span className="font-mono text-xs text-[hsl(var(--highlight))] tracking-widest uppercase">
          CAPABILITY ID // {service.id || service.slug}
        </span>
      </div>

      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24 border-b border-[hsl(var(--surface1))] grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-12 lg:gap-16 items-start">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))]">
              Core Practice Area
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--highlight))]" />
            <span className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsla(var(--text)/0.5)]">
              Enterprise Grade
            </span>
          </div>

          <h1 className="font-Barlow font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9] mb-8">
            {service.title}
          </h1>

          <p className="font-barlow text-lg md:text-2xl text-[hsla(var(--text)/0.8)] leading-relaxed max-w-2xl mb-12">
            {service.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleStartEngagement}
              className="inline-flex items-center justify-center gap-3 bg-[hsl(var(--text))] text-[hsl(var(--base))] font-barlow font-bold text-xs px-10 py-5 uppercase tracking-[0.2em] hover:bg-[hsl(var(--highlight))] transition-colors duration-300 cursor-pointer shadow-lg"
            >
              Start This Engagement
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-[hsl(var(--surface2))] hover:border-[hsl(var(--highlight))] text-[hsl(var(--text))] hover:text-[hsl(var(--highlight))] font-barlow font-bold text-xs px-8 py-5 uppercase tracking-[0.2em] transition-colors duration-300"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="border border-[hsla(var(--highlight)/0.4)] bg-[hsla(var(--highlight)/0.03)] p-8 flex flex-col justify-between gap-8">
          <div className="flex items-center justify-between pb-6 border-b border-[hsl(var(--surface1))]">
            <span className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
              Service Specs
            </span>
            <div className="w-12 h-12 border border-[hsla(var(--highlight)/0.5)] bg-[hsla(var(--highlight)/0.08)] flex items-center justify-center text-[hsl(var(--highlight))]">
              <Icon className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mb-1 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[hsl(var(--highlight))]" /> Typical Timeline
              </p>
              <p className="font-Barlow font-black text-2xl uppercase">
                {service.typical_timeline || "6 - 12 Weeks"}
              </p>
            </div>

            {service.base_rate > 0 && (
              <div>
                <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mb-1 flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-[hsl(var(--highlight))]" /> Base Project Estimate
                </p>
                <p className="font-Barlow font-black text-2xl uppercase text-[hsl(var(--highlight))]">
                  Starting at ₹{Number(service.base_rate).toLocaleString('en-IN')}
                </p>
              </div>
            )}

            {service.hourly_rate > 0 && (
              <div>
                <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] mb-1">
                  Advisory & Dedicated Rate
                </p>
                <p className="font-barlow text-base text-[hsla(var(--text)/0.8)]">
                  ₹{Number(service.hourly_rate).toLocaleString('en-IN')} / hour
                </p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-[hsl(var(--surface1))]">
            <p className="font-barlow text-xs text-[hsla(var(--text)/0.6)] leading-relaxed">
              Every engagement includes dedicated technical leadership, weekly milestone demos, and guaranteed SLAs.
            </p>
          </div>
        </div>
      </section>

      {/* ── Deliverables Grid ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24 border-b border-[hsl(var(--surface1))]">
        <div className="mb-14">
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))] mb-3">
            What You Receive
          </p>
          <h2 className="font-Barlow font-black text-4xl md:text-5xl uppercase tracking-tight">
            Key Scope & Deliverables
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deliverables.map((item, idx) => (
            <div
              key={idx}
              className="p-8 border border-[hsl(var(--surface1))] hover:border-[hsl(var(--highlight))] transition-colors duration-300 bg-[hsla(var(--surface0)/0.4)] flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--highlight))] shrink-0" />
                <span className="font-mono text-xs text-[hsl(var(--subtext1))]">0{idx + 1}</span>
              </div>
              <p className="font-Barlow font-bold text-xl uppercase tracking-tight leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4-Phase Delivery Blueprint ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24 border-b border-[hsl(var(--surface1))]">
        <div className="mb-14">
          <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))] mb-3">
            Execution Framework
          </p>
          <h2 className="font-Barlow font-black text-4xl md:text-5xl uppercase tracking-tight">
            The 4-Phase Blueprint
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[hsl(var(--surface1))] divide-y md:divide-y-0 md:divide-x divide-[hsl(var(--surface1))]">
          {BLUEPRINT_PHASES.map((p) => (
            <div key={p.step} className="p-8 flex flex-col justify-between bg-[hsla(var(--highlight)/0.01)] hover:bg-[hsla(var(--highlight)/0.03)] transition-colors">
              <div>
                <span className="font-mono text-sm text-[hsl(var(--highlight))] font-bold">{p.step}</span>
                <p className="font-Barlow font-bold text-xl uppercase tracking-tight mt-3 mb-2">{p.phase}</p>
                <p className="font-barlow text-xs text-[hsl(var(--highlight))] uppercase tracking-wider font-semibold mb-4">{p.timeline}</p>
                <p className="font-barlow text-sm text-[hsl(var(--subtext1))] leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related Practice Areas ── */}
      {otherServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))] mb-2">
                Explore Next
              </p>
              <h3 className="font-Barlow font-bold text-2xl uppercase tracking-tight">
                Complementary Services
              </h3>
            </div>
            <Link
              to="/services"
              className="font-barlow text-xs uppercase tracking-wider font-bold text-[hsl(var(--highlight))] hover:underline"
            >
              All Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                to={`/services/${other.slug}`}
                className="p-6 border border-[hsl(var(--surface1))] hover:border-[hsl(var(--highlight))] transition-all group flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-Barlow font-bold text-xl uppercase tracking-tight group-hover:text-[hsl(var(--highlight))] transition-colors mb-2">
                    {other.title}
                  </h4>
                  <p className="font-barlow text-xs text-[hsla(var(--text)/0.65)] line-clamp-2">
                    {other.description}
                  </p>
                </div>
                <span className="font-barlow text-[11px] font-bold tracking-widest uppercase text-[hsl(var(--highlight))] mt-6 inline-flex items-center gap-1">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
