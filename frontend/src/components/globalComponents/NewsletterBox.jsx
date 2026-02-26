import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { subscribeToNewsletter } from "../../utils/api";

gsap.registerPlugin(ScrollTrigger);

const NewsletterBox = () => {
  const sectionRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const titles = section.querySelectorAll(".title-animate");
      const ctas = section.querySelectorAll(".newsletter-cta");

      gsap.from(titles, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      gsap.from(ctas, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await subscribeToNewsletter(email);
      setStatus("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      setStatus(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[70vh]
        pt-20 md:pt-28
        pb-20
        overflow-hidden
        bg-[hsl(var(--mantle))]
      "
    >
      {/* Glow Background */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_65%)]
        "
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--surface2))] bg-[hsl(var(--base))]/80 px-4 py-1 text-xs md:text-sm text-[hsl(var(--subtext1))] mb-6 title-animate">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue))]" />
          <span>Zsyio Community</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-semibold text-[hsl(var(--blue))] title-animate">
          Build the Future. Together.
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-[hsl(var(--subtext1))] title-animate">
          Join engineers, founders, and innovators shaping intelligent,
          scalable AI systems, ERP automation, and digital infrastructure.
        </p>

        {/* Newsletter Card */}
        <div className="newsletter-cta mt-12 bg-[hsl(var(--base))]/80 border border-[hsl(var(--surface2))] rounded-2xl p-6 md:p-8 shadow-soft backdrop-blur-xl">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="
                w-full md:w-[420px]
                bg-transparent
                border border-[hsl(var(--surface2))]
                px-5 py-3
                rounded-xl
                text-[hsl(var(--text))]
                placeholder:text-[hsl(var(--subtext1))]
                focus:outline-none
                focus:ring-2
                focus:ring-[hsl(var(--blue))]
                transition-all duration-300
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                w-full md:w-auto
                bg-[hsl(var(--blue))]
                px-8 py-3
                rounded-xl
                font-semibold
                text-white
                shadow-soft
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]
                disabled:opacity-50
              "
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {status && (
            <p className="mt-4 text-sm text-[hsl(var(--subtext1))]">
              {status}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="newsletter-cta mt-10 flex items-center justify-center gap-6 text-sm text-[hsl(var(--subtext1))]">
          <span className="h-px w-12 bg-[hsl(var(--surface2))]" />
          or join instantly
          <span className="h-px w-12 bg-[hsl(var(--surface2))]" />
        </div>

        {/* Social Buttons */}
        <div className="newsletter-cta mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="https://whatsapp.com/channel/0029Vb7QfBxDjiOi5fd1WS3y"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-green-600 px-8 py-3 rounded-xl font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-1"
          >
            Join on WhatsApp
          </a>

          {/* <a
            href="https://discord.gg/YOUR-LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-[hsl(var(--blue))] px-8 py-3 rounded-xl font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-1"
          >
            Join on Discord
          </a> */}
        </div>

        <p className="mt-12 text-xs text-[hsl(var(--subtext1))]">
          No noise. High-signal updates. Crafting the Current.
        </p>
      </div>
    </section>
  );
};

export default NewsletterBox;