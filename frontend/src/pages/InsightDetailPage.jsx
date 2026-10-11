import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, ArrowUpRight, CheckCircle2, Share2 } from "lucide-react";
import { INSIGHTS as STATIC_INSIGHTS } from "../data/insightsData";
import { getInsightBySlug, getInsights } from "../services/api";
import { usePageSEO } from "../utils/seo";

export default function InsightDetailPage() {
  const { slug } = useParams();

  // Initialize with static fallback if found
  const initialArticle = STATIC_INSIGHTS.find((item) => item.slug === slug) || null;
  const [article, setArticle] = useState(initialArticle);
  const [allInsights, setAllInsights] = useState(STATIC_INSIGHTS);
  const [loading, setLoading] = useState(!initialArticle);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      try {
        if (!initialArticle) setLoading(true);
        const [detailRes, listRes] = await Promise.allSettled([
          getInsightBySlug(slug),
          getInsights(),
        ]);

        if (isMounted) {
          if (detailRes.status === "fulfilled" && detailRes.value?.data) {
            setArticle(detailRes.value.data);
          }
          if (listRes.status === "fulfilled" && Array.isArray(listRes.value?.data) && listRes.value.data.length > 0) {
            setAllInsights(listRes.value.data);
          }
        }
      } catch (err) {
        console.warn("Could not fetch insight detail from backend, using fallback:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Dynamic SEO
  usePageSEO({
    title: article ? article.title : "Technical Deep Dive",
    description: article?.summary || "Read architectural insights and enterprise case studies from Zsyio.",
    url: `/insights/${slug}`,
    type: "article",
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center text-[hsl(var(--text))]">
        <div className="text-center">
          <p className="font-mono text-xs text-[hsl(var(--highlight))] uppercase mb-3 animate-pulse">
            LOADING // INSIGHT_DATA...
          </p>
          <div className="w-12 h-12 border-2 border-[hsl(var(--highlight))] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center text-[hsl(var(--text))]">
        <div className="max-w-md w-full text-center">
          <p className="font-mono text-xs text-[hsl(var(--highlight))] uppercase mb-3">404 // INSIGHT_NOT_FOUND</p>
          <h2 className="font-Barlow font-black text-4xl md:text-5xl uppercase tracking-tight mb-6">
            Article Not Found
          </h2>
          <p className="font-barlow text-sm text-[hsla(var(--text)/0.7)] mb-8">
            The publication or case study you requested could not be located in our directory.
          </p>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 bg-[hsl(var(--text))] text-[hsl(var(--base))] font-barlow font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 hover:bg-[hsl(var(--highlight))] transition-colors"
          >
            ← Back to Insights & Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const related = allInsights
    .filter((item) => (item.slug || item.id) !== (article.slug || article.id))
    .slice(0, 2);

  const author = article.author || {
    name: "Engineering Team",
    role: "Distributed Systems Practice",
    avatar: "",
  };

  const keyTakeaways = article.keyTakeaways || article.key_takeaways || [];
  const metrics = article.metrics || [];
  const tags = article.tags || [];

  return (
    <article className="pt-24 md:pt-28 pb-24 text-[hsl(var(--text))] min-h-screen">
      {/* ── Breadcrumb Bar ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-6 border-b border-[hsl(var(--surface1))] flex items-center justify-between">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))] hover:text-[hsl(var(--highlight))] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Insights
        </Link>
        <span className="font-mono text-xs text-[hsl(var(--highlight))] uppercase tracking-widest">
          {article.category}
        </span>
      </div>

      {/* ── Article Header ── */}
      <header className="max-w-5xl mx-auto px-6 md:px-8 pt-12 md:pt-20 pb-12 border-b border-[hsl(var(--surface1))]">
        <div className="flex flex-wrap items-center gap-4 text-xs font-barlow text-[hsl(var(--subtext1))] uppercase tracking-wider mb-6">
          <span className="font-bold text-[hsl(var(--highlight))] bg-[hsla(var(--highlight)/0.1)] px-3 py-1">
            {article.type}
          </span>
          {(article.clientIndustry || article.client_industry) && (
            <>
              <span>·</span>
              <span>{article.clientIndustry || article.client_industry}</span>
            </>
          )}
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {article.readTime || article.read_time}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> {article.publishedAt || article.published_at}
          </span>
        </div>

        <h1 className="font-Barlow font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95] mb-8">
          {article.title}
        </h1>

        <p className="font-barlow text-lg md:text-2xl text-[hsla(var(--text)/0.8)] leading-relaxed font-medium">
          {article.summary}
        </p>

        {/* Author Byline */}
        <div className="flex items-center justify-between pt-10 mt-10 border-t border-[hsl(var(--surface1))]">
          <div className="flex items-center gap-4">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-12 h-12 rounded-full object-cover border border-[hsl(var(--surface1))]"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--highlight))] text-[hsl(var(--base))] flex items-center justify-center font-bold text-lg">
                {(author.name || "E")[0]}
              </div>
            )}
            <div>
              <p className="font-Barlow font-bold text-lg uppercase tracking-wide">
                {author.name}
              </p>
              <p className="font-barlow text-xs text-[hsl(var(--subtext1))]">
                {author.role} · Zsyio Labs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="hidden sm:inline-block font-barlow text-[10px] uppercase font-bold tracking-wider border border-[hsl(var(--surface1))] px-3 py-1 text-[hsl(var(--subtext1))]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Key Metrics Banner ── */}
      {metrics.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-8 py-12 border-b border-[hsl(var(--surface1))]">
          <p className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-6">
            Verified Architectural Results
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="p-6 border border-[hsla(var(--highlight)/0.4)] bg-[hsla(var(--highlight)/0.03)]"
              >
                <p className="font-Barlow font-black text-4xl md:text-5xl text-[hsl(var(--highlight))] mb-2">
                  {m.value}
                </p>
                <p className="font-barlow text-xs uppercase tracking-wider font-semibold text-[hsl(var(--subtext1))]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Main Content Body ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-16 space-y-16">
        {/* Challenge & Solution Cards */}
        {article.challenge && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[hsl(var(--surface1))] pb-16">
            <div className="p-8 border border-[hsl(var(--surface1))] bg-[hsla(var(--surface0)/0.4)]">
              <span className="font-mono text-xs text-rose-400 font-bold uppercase tracking-wider block mb-3">
                // 01. The Challenge
              </span>
              <p className="font-barlow text-base text-[hsla(var(--text)/0.8)] leading-relaxed">
                {article.challenge}
              </p>
            </div>
            <div className="p-8 border border-[hsl(var(--surface1))] bg-[hsla(var(--highlight)/0.04)]">
              <span className="font-mono text-xs text-[hsl(var(--highlight))] font-bold uppercase tracking-wider block mb-3">
                // 02. The Architecture Solution
              </span>
              <p className="font-barlow text-base text-[hsla(var(--text)/0.8)] leading-relaxed">
                {article.solution}
              </p>
            </div>
          </div>
        )}

        {/* Narrative Sections */}
        {article.body?.map((sec, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="font-Barlow font-black text-2xl md:text-3xl uppercase tracking-tight text-[hsl(var(--text))]">
              {sec.heading}
            </h2>
            <p className="font-barlow text-lg md:text-xl text-[hsla(var(--text)/0.78)] leading-relaxed">
              {sec.content}
            </p>
          </div>
        ))}

        {/* Key Takeaways Callout */}
        {keyTakeaways.length > 0 && (
          <div className="p-8 md:p-10 border border-[hsla(var(--highlight)/0.4)] bg-[hsla(var(--highlight)/0.02)]">
            <h3 className="font-Barlow font-black text-2xl uppercase tracking-tight mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[hsl(var(--highlight))]" />
              Engineering Takeaways
            </h3>
            <ul className="space-y-4">
              {keyTakeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="font-barlow text-base md:text-lg text-[hsla(var(--text)/0.85)] leading-relaxed flex items-start gap-3"
                >
                  <span className="font-mono text-xs text-[hsl(var(--highlight))] font-bold mt-1">
                    0{idx + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom CTA to Partner */}
        <div className="p-10 border border-[hsl(var(--surface1))] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[hsla(var(--surface0)/0.5)]">
          <div>
            <h4 className="font-Barlow font-black text-2xl uppercase tracking-tight">
              Facing a similar systems hurdle?
            </h4>
            <p className="font-barlow text-sm text-[hsla(var(--text)/0.7)] mt-1">
              Our principal engineers can review your architecture and roadmap.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 bg-[hsl(var(--highlight))] text-[hsl(var(--base))] font-barlow font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 hover:scale-105 transition-all shadow-md inline-flex items-center gap-2"
          >
            Start a Conversation
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <footer className="max-w-5xl mx-auto px-6 md:px-8 pt-16 border-t border-[hsl(var(--surface1))]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-Barlow font-black text-2xl uppercase tracking-tight">
              More Case Studies & Insights
            </h3>
            <Link
              to="/insights"
              className="font-barlow text-xs font-bold uppercase tracking-wider text-[hsl(var(--highlight))] hover:underline"
            >
              All Publications →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((item) => (
              <Link
                key={item.slug || item.id}
                to={`/insights/${item.slug}`}
                className="p-8 border border-[hsl(var(--surface1))] hover:border-[hsl(var(--highlight))] transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="font-barlow text-[10px] uppercase font-bold text-[hsl(var(--highlight))] tracking-widest block mb-2">
                    {item.type} · {item.readTime || item.read_time}
                  </span>
                  <h4 className="font-Barlow font-bold text-xl uppercase tracking-tight group-hover:text-[hsl(var(--highlight))] transition-colors mb-3">
                    {item.title}
                  </h4>
                  <p className="font-barlow text-xs text-[hsla(var(--text)/0.65)] line-clamp-2">
                    {item.summary}
                  </p>
                </div>
                <span className="font-barlow text-xs font-bold uppercase tracking-wider text-[hsl(var(--highlight))] mt-6 inline-flex items-center gap-1">
                  Read Case Study →
                </span>
              </Link>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
