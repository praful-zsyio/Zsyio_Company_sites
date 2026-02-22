import React from "react";
import { Link } from "react-router-dom";
const TrademarksPage = () => {
  return (
    <section className="pt-28 pb-32 max-w-full mx-auto px-6 text-[hsl(var(--text))] bg-[hsl(var(--base))]">

      {/* HEADER */}
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          Trademarks
        </h1>
        <p className="text-[hsl(var(--subtext1))] max-w-2xl mx-auto">
          Our brand identity and intellectual property are protected.
          Please review the guidelines below before using any Zsyio assets.
        </p>
      </div>

      {/* CONTENT CARD */}
      <div
        className="
          rounded-(--radius-xl)
          bg-[hsl(var(--mantle))]
          border border-[hsl(var(--surface1))]
          shadow-(--shadow-soft)
          p-10
          space-y-12
        "
      >

        {/* OWNERSHIP */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Ownership of Trademarks
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            The <span className="font-semibold text-[hsl(var(--text))]">Zsyio</span> name,
            logo, brand visuals, product names, taglines, and all related
            identifiers are the exclusive property of Zsyio and are protected
            under applicable intellectual property laws.
          </p>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            These trademarks may be registered or unregistered across various
            jurisdictions. Unauthorized use may result in legal action.
          </p>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* THIRD PARTY */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Third-Party Trademarks
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            All other trademarks, service marks, logos, and trade names
            appearing on this website are the property of their respective
            owners. Reference to third-party brands does not imply endorsement
            or affiliation unless explicitly stated.
          </p>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* USAGE GUIDELINES */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Usage Guidelines
          </h2>

          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            You may not use, reproduce, distribute, modify, or display any of
            our trademarks without prior written consent, except where permitted
            by law.
          </p>

          <ul className="space-y-3">
            {[
              "Do not alter or distort our trademarks.",
              "Do not imply partnership, endorsement, or affiliation.",
              "Do not use our marks in misleading or unlawful contexts.",
              "Do not register domains or social handles using our brand name.",
            ].map((item, idx) => (
              <li
                key={idx}
                className="
                  flex items-start gap-3
                  bg-[hsl(var(--surface0))]
                  border border-[hsl(var(--surface1))]
                  rounded-lg
                  px-4 py-3
                  text-[hsl(var(--subtext1))]
                "
              >
                <span className="text-[hsl(var(--blue))] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* ENFORCEMENT */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Enforcement & Protection
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            Zsyio actively protects its intellectual property and reserves
            the right to pursue legal remedies against misuse, infringement,
            or dilution of its trademarks.
          </p>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* CONTACT */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Contact Information
          </h2>

          <p className="text-[hsl(var(--subtext1))]">
            For trademark permissions or legal inquiries, contact us at:
          </p>

            <Link
              to="/contact"
              className="
              inline-flex items-center justify-center
              rounded-xl border border-[hsl(var(--blue))]
              px-8 py-3
              text-sm font-semibold
              text-[hsl(var(--blue))]
              hover:bg-[hsl(var(--blue))]/10
              transition "            >
              Contact Us
            </Link>
        </section>

      </div>
    </section>
  );
};

export default TrademarksPage;
