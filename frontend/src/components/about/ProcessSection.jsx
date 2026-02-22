import React from "react";
import { Search, PencilRuler, Code, Rocket, BarChart } from "lucide-react";
import { processSteps } from "../../data/aboutData/aboutProcess";

const iconMap = { Search, PencilRuler, Code, Rocket ,BarChart};

const ProcessSection = () => {
  return (
    <section
      className="
        relative py-24
        bg-gradient-to-b
        from-[hsl(var(--base))]
        via-[hsl(var(--mantle))]
        to-[hsl(var(--base))]
        overflow-hidden
      "
    >
      {/* Background Effects */}
      <div
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]
        "
      />
      <div
        className="
          absolute inset-0 -z-10 opacity-30
          bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)]
          bg-[size:24px_24px]
        "
      />

      <div className="container mx-auto px-0 max-w-6xl">

        {/* Heading */}
        <header className="text-center mb-16 space-y-4">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[hsl(var(--subtext0))]">
            Process
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            From Concept to Scalable Reality
          </h2>

          <p className="text-[hsl(var(--subtext1))] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A structured engineering framework that ensures clarity, velocity,
            and long-term scalability at every stage.
          </p>
        </header>

        {/* Timeline Grid */}
        <div className="relative">

          {/* Horizontal Connector */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-[hsl(var(--surface2))]" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {processSteps.map((step, index) => {
              const Icon = iconMap[step.icon];

              return (
                <div key={step.id} className="relative group">

                  {/* Icon + Step */}
                  <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-0">

                    {/* Icon Circle */}
                    <div
                      className="
                        relative z-10
                        flex items-center justify-center
                        w-12 h-12
                        rounded-full
                        border border-[hsl(var(--blue))]/60
                        bg-[hsl(var(--mantle))]
                        shadow-[0_0_18px_rgba(56,189,248,0.25)]
                        transition-all duration-300
                        group-hover:shadow-[0_0_28px_rgba(56,189,248,0.45)]
                      "
                    >
                      {Icon && (
                        <Icon className="w-5 h-5 text-[hsl(var(--blue))]" />
                      )}
                    </div>

                    {/* Step Label */}
                    <span className="md:mt-3 text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--subtext0))]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className="
                      mt-6
                      rounded-2xl
                      border border-[hsl(var(--surface2))]
                      bg-[hsl(var(--base))]/80
                      backdrop-blur-lg
                      p-6
                      transition-all duration-300
                      group-hover:-translate-y-2
                      group-hover:border-[hsl(var(--blue))]
                      group-hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]
                      flex flex-col
                      animate-in-view
                      md:min-h-75
                      md:min-w-55
                    "
                  >
                    <h3 className="text-base md:text-lg font-semibold mb-3">
                      {step.title}
                    </h3>

                    <div className="h-px w-10 bg-[hsl(var(--blue))]/60 mb-3" />

                    <p className="text-[hsl(var(--subtext1))] text-sm leading-relaxed flex-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;