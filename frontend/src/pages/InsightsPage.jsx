import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar, Sparkles, BookOpen } from "lucide-react";
import { INSIGHTS as STATIC_INSIGHTS, INSIGHT_CATEGORIES as STATIC_CATEGORIES } from "../data/insightsData";
import { getInsights, getInsightCategories } from "../services/api";
import { usePageSEO } from "../utils/seo";
import NewsletterSection from "../components/globalComponents/NewsletterBox";
import AboutMarquee from "../components/about/AboutMarquee";

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [insights, setInsights] = useState(STATIC_INSIGHTS);
  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const [loading, setLoading] = useState(false);

  usePageSEO({
    title: "Engineering Insights & Case Studies",
    description: "Explore in-depth technical breakdowns, distributed systems architecture, AI case studies, and design system blueprints from Zsyio.",
    url: "/insights",
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [insightsRes, categoriesRes] = await Promise.allSettled([
          getInsights(),
          getInsightCategories(),
        ]);

        if (isMounted) {
          if (insightsRes.status === "fulfilled" && Array.isArray(insightsRes.value.data) && insightsRes.value.data.length > 0) {
            setInsights(insightsRes.value.data);
          }
          if (categoriesRes.status === "fulfilled" && Array.isArray(categoriesRes.value.data) && categoriesRes.value.data.length > 0) {
            setCategories(categoriesRes.value.data);
          }
        }
      } catch (err) {
        console.warn("Could not fetch insights from backend, using local dataset fallback:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return insights;
    return insights.filter((item) => (item.category || "").toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory, insights]);

  const featured = useMemo(() => {
    return insights.find((item) => item.isFeatured || item.is_featured) || insights[0];
  }, [insights]);

  const listItems = useMemo(() => {
    if (activeCategory === "All") {
      return insights.filter((item) => (item.slug || item.id) !== (featured?.slug || featured?.id));
    }
    return filtered;
  }, [activeCategory, filtered, featured, insights]);

  return (
    <div className="pt-24 md:pt-28 pb-20 text-[hsl(var(--text))] min-h-screen">
      {/* ── Page Header ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-12 md:py-20 border-b border-[hsl(var(--surface1))]">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-4 h-4 text-[hsl(var(--highlight))]" />
          <span className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))]">
            Technical Publication & Case Studies
          </span>
        </div>

        <h1 className="font-Barlow font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-[0.88] mb-8">
          Insights & <br />
          <span className="text-[hsl(var(--highlight))]">Blueprints.</span>
        </h1>

        <p className="font-barlow text-lg md:text-2xl text-[hsla(var(--text)/0.75)] max-w-2xl leading-relaxed">
          Unvarnished architecture decisions, production post-mortems, and engineering case studies from our client deployments.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-[hsl(var(--surface1))]">
          {categories.map((cat) => {
            const active = cat.toLowerCase() === activeCategory.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`font-barlow text-xs uppercase tracking-[0.18em] font-bold px-5 py-2.5 border transition-all duration-300 cursor-pointer ${
                  active
                    ? "bg-[hsl(var(--highlight))] border-[hsl(var(--highlight))] text-[hsl(var(--base))] shadow-md"
                    : "border-[hsl(var(--surface2))] text-[hsl(var(--text))] hover:border-[hsl(var(--highlight))] hover:text-[hsl(var(--highlight))]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Featured Story (shown on 'All') ── */}
      {activeCategory === "All" && featured && (
        <section className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-20 border-b border-[hsl(var(--surface1))]">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[hsl(var(--highlight))]" />
            <span className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))]">
              Spotlight Case Study
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 p-8 md:p-12 border border-[hsla(var(--highlight)/0.4)] bg-[hsla(var(--highlight)/0.02)]">
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs font-barlow text-[hsl(var(--subtext1))] uppercase tracking-wider mb-4">
                  <span className="font-bold text-[hsl(var(--highlight))]">{featured.type}</span>
                  <span>·</span>
                  <span>{featured.readTime || featured.read_time}</span>
                  <span>·</span>
                  <span>{featured.publishedAt || featured.published_at}</span>
                </div>

                <Link to={`/insights/${featured.slug}`}>
                  <h2 className="font-Barlow font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight hover:text-[hsl(var(--highlight))] transition-colors leading-[0.95] mb-6">
                    {featured.title}
                  </h2>
                </Link>

                <p className="font-barlow text-base md:text-lg text-[hsla(var(--text)/0.75)] leading-relaxed mb-8 max-w-xl">
                  {featured.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-4">
                {(featured.tags || []).map((t) => (
                  <span
                    key={t}
                    className="font-barlow text-[10px] uppercase tracking-wider font-bold border border-[hsl(var(--surface1))] px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics column */}
            <div className="border-t lg:border-t-0 lg:border-l border-[hsl(var(--surface1))] lg:pl-10 flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <span className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))]">
                  Verified Client Impact
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                  {(featured.metrics || []).map((m) => (
                    <div key={m.label} className="border-b border-[hsl(var(--surface1))] pb-4">
                      <p className="font-Barlow font-black text-3xl md:text-4xl text-[hsl(var(--highlight))]">
                        {m.value}
                      </p>
                      <p className="font-barlow text-xs text-[hsl(var(--subtext1))] uppercase tracking-wider mt-1">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={`/insights/${featured.slug}`}
                className="inline-flex items-center justify-between bg-[hsl(var(--text))] text-[hsl(var(--base))] hover:bg-[hsl(var(--highlight))] px-8 py-4 font-barlow font-bold text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Read Deep Dive
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Marquee Separator ── */}
      <AboutMarquee
        items={["Zero Downtime", "Distributed Systems", "Sub-Second Latency", "Event Meshes", "Zero Trust", "RAG Pipelines"]}
        speed={40}
        dark={false}
      />

      {/* ── Articles Grid ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listItems.map((item, idx) => (
            <motion.article
              key={item.slug || item.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="p-8 border border-[hsl(var(--surface1))] hover:border-[hsl(var(--highlight))] bg-[hsla(var(--surface0)/0.3)] hover:bg-[hsla(var(--highlight)/0.02)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-barlow text-[hsl(var(--subtext1))] uppercase tracking-wider mb-5">
                  <span className="font-bold text-[hsl(var(--highlight))]">{item.type}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.readTime || item.read_time}
                  </span>
                </div>

                <Link to={`/insights/${item.slug}`}>
                  <h3 className="font-Barlow font-black text-2xl uppercase tracking-tight group-hover:text-[hsl(var(--highlight))] transition-colors leading-tight mb-4">
                    {item.title}
                  </h3>
                </Link>

                <p className="font-barlow text-sm text-[hsla(var(--text)/0.7)] leading-relaxed mb-6 line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div>
                {/* Metric pill */}
                {item.metrics?.[0] && (
                  <div className="py-3 px-4 mb-6 bg-[hsla(var(--highlight)/0.06)] border-l-2 border-[hsl(var(--highlight))] flex items-center justify-between">
                    <span className="font-barlow text-xs uppercase tracking-wider text-[hsl(var(--subtext1))] font-semibold">
                      {item.metrics[0].label}
                    </span>
                    <span className="font-Barlow font-bold text-lg text-[hsl(var(--highlight))]">
                      {item.metrics[0].value}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--surface1))]">
                  <span className="font-barlow text-[11px] text-[hsla(var(--text)/0.45)] uppercase tracking-wider">
                    {item.publishedAt || item.published_at}
                  </span>
                  <Link
                    to={`/insights/${item.slug}`}
                    className="font-barlow text-xs font-bold uppercase tracking-widest text-[hsl(var(--highlight))] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Newsletter Section ── */}
      <NewsletterSection />
    </div>
  );
}
