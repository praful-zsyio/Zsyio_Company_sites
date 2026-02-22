import React, { useState, useEffect } from "react";
import { STUDIO_STATS, META_STATS } from "../../data/aboutData/aboutStats";

const AboutHero = () => {
  const [stats, setStats] = useState([]);
  const [metaStats, setMetaStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(STUDIO_STATS);
      setMetaStats(META_STATS);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const topStats = isLoading ? STUDIO_STATS : stats;
  const bottomStats = isLoading ? META_STATS : metaStats;

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--base))] py-28">

      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-0 w-150 h-150 bg-[hsl(var(--blue))]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-125 h-125 bg-[hsl(var(--yellow))]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 md:px-12 lg:px-20">

        {/* Frame Wrapper */}
        <div className="relative border border-[hsl(var(--surface2))] rounded-3xl p-5 md:p-10 bg-[hsl(var(--mantle))]/40 backdrop-blur-xl">

          {/* Top Badge */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[hsl(var(--subtext0))]">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--green))]" />
              About ZSYIO
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 items-start">

            {/* LEFT CONTENT */}
            <div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight mb-12">
                Building digital systems
                <br />
                <span className="bg-linear-to-r from-[hsl(var(--yellow))] to-[hsl(var(--blue))] bg-clip-text text-transparent">
                  engineered to scale.
                </span>
              </h1>

              <div className="space-y-6 text-lg text-[hsl(var(--subtext1))] max-w-xl">
                <p>
                  We partner with ambitious teams to architect resilient digital
                  infrastructure across web, mobile, cloud and AI.
                </p>
                <p>
                  Every system is built for performance, adaptability and
                  measurable impact.
                </p>
              </div>

              {/* Capabilities */}
              <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-[hsl(var(--subtext0))]">
                {[
                  "Web Platforms",
                  "Mobile Systems",
                  "Cloud Architecture",
                  "AI Workflows",
                  "ERP Systems",
                  "Automation",
                ].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--base))]/60"
                  >
                    {item}
                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT METRICS PANEL */}
            <div className="space-y-10">

              {/* Primary Stats Grid */}
              <div className="grid grid-cols-2 gap-8">
                {topStats.map((stat) => (
                  <div
                    key={stat.id}
                    className={`p-3 md:p-6 rounded-2xl border border-[hsl(var(--surface2))] bg-[hsl(var(--base))]/70 ${
                      isLoading ? "animate-pulse opacity-70" : ""
                    }`}
                  >
                    <p className="text-2xl md:text-4xl font-bold">{stat.value}</p>
                    <p className="text-sm md:text-xs uppercase tracking-tighter text-[hsl(var(--subtext0))] mt-2 ">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-[hsl(var(--surface2))]" />

              {/* Secondary Stats */}
              <div className="space-y-6">
                {bottomStats.map((meta) => (
                  <div
                    key={meta.id}
                    className={`flex justify-between items-center text-sm ${
                      isLoading ? "animate-pulse opacity-70" : ""
                    }`}
                  >
                    <span className="text-[hsl(var(--subtext1))] uppercase tracking-widest text-xs">
                      {meta.label}
                    </span>
                    <span className="font-semibold text-[hsl(var(--text))]">
                      {meta.value}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;