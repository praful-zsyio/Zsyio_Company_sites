import React from "react";

const DisclaimerPage = () => {
  return (
    <section className="pt-28 pb-32 max-w-full mx-auto text-[hsl(var(--text))] bg-[hsl(var(--base))]">

      {/* HEADER */}
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          Disclaimer
        </h1>
        <p className="text-[hsl(var(--subtext1))] max-w-2xl mx-auto">
          Please read this disclaimer carefully before using our website
          and services.
        </p>
        <p className="text-sm text-[hsl(var(--subtext1))]">
          Last Updated: Feb 22, 2026
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

        {/* GENERAL INFORMATION */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            General Information
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            The information provided by{" "}
            <span className="font-semibold text-[hsl(var(--text))]">Zsyio</span>{" "}
            ("we," "us," or "our") on this website is for general informational
            purposes only. All information is provided in good faith; however,
            we make no representation or warranty of any kind, express or
            implied, regarding the accuracy, adequacy, validity, reliability,
            availability, or completeness of any information on the site.
          </p>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* EXTERNAL LINKS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            External Links Disclaimer
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            The website may contain links to third-party websites or content.
            Such external links are not investigated, monitored, or checked
            for accuracy, adequacy, validity, reliability, availability, or
            completeness by us. We do not warrant, endorse, guarantee, or
            assume responsibility for any information offered by third-party
            websites linked through the platform.
          </p>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* PROFESSIONAL DISCLAIMER */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Professional Disclaimer
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            This website does not contain professional advice. All information
            is provided for general informational and educational purposes
            only and is not a substitute for professional consultation. Before
            making decisions based on such information, you should consult
            qualified professionals relevant to your situation.
          </p>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* LIMITATION OF LIABILITY */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Limitation of Liability
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            Under no circumstance shall Zsyio be liable for any loss or damage
            incurred as a result of the use of the website or reliance on any
            information provided. Your use of the website and reliance on any
            information is solely at your own risk.
          </p>
        </section>

      </div>
    </section>
  );
};

export default DisclaimerPage;