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
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const elements = section.querySelectorAll(".animate-item");
      gsap.from(elements, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setStatus("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await subscribeToNewsletter(email);
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      setStatus(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="mt-10 border-b border-[hsla(var(--highlight))]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — copy */}
        <div className="px-6 md:px-10 lg:px-14 py-14 flex flex-col justify-between gap-10">
          <div>
            <p className="font-Barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-4 text-[hsla(var(--highlight)/0.8)] animate-item flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[hsla(var(--highlight))] flex-shrink-0" />
              ZSYIO Community
            </p>
            <h2 className="font-Barlow text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none animate-item">
              Build the <span className="text-[hsla(var(--highlight))]">Future.</span>
              <br />
              Together.
            </h2>
          </div>
          <p className="font-serif text-sm md:text-base leading-relaxed text-[hsla(var(--text)/0.75)] max-w-sm animate-item">
            Join engineers, founders, and innovators shaping intelligent,
            scalable AI systems, ERP automation, and digital infrastructure.
          </p>
          <div className="flex flex-col gap-3 animate-item">
            <a
              href="https://whatsapp.com/channel/0029Vb7QfBxDjiOi5fd1WS3y"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-max font-Barlow text-[10px] tracking-[0.2em] uppercase font-medium border px-8 py-4 transition-all duration-300 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white inline-block text-center"
            >
              JOIN ON WHATSAPP
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div className="px-6 md:px-10 lg:px-14 py-14 flex flex-col justify-center animate-item">
          {submitted ? (
            <div className="py-10">
              <p className="font-Barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-4 text-[hsla(var(--highlight)/0.8)]">
                Confirmed
              </p>
              <h3 className="font-Barlow text-4xl font-black uppercase tracking-tight mb-4 leading-none">
                You're in.
              </h3>
              <p className="font-serif text-sm md:text-base leading-relaxed text-[hsla(var(--text)/0.75)]">
                Subscribed successfully!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStatus(null);
                }}
                className="mt-8 font-Barlow text-[11px] tracking-[0.2em] uppercase font-medium border-b border-[hsla(var(--highlight))] text-[hsla(var(--highlight))] pb-1 hover:opacity-70 transition-opacity"
              >
                Subscribe another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-0 w-full max-w-md mx-auto md:mx-0">
              <label className="font-Barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsla(var(--highlight)/0.8)]">
                ENTER YOUR EMAIL
              </label>

              {/* Input row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  ref={inputRef}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 px-5 py-4 font-Barlow text-sm bg-transparent border border-[hsla(var(--highlight))] rounded-xl text-[hsla(var(--text))] placeholder:text-[hsla(var(--text)/0.3)] tracking-widest outline-none uppercase transition-colors focus:border-[hsla(var(--text))]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[hsla(var(--highlight))] flex justify-center items-center font-bold text-[14px] md:text-[15px] text-[hsla(var(--base))] px-8 py-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--highlight)/0.25)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex-shrink-0"
                >
                  {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
                </button>
              </div>

              {status && (
                <p className="mt-4 font-Barlow text-[11px] tracking-[0.1em] uppercase text-[hsla(var(--highlight))]">
                  {status}
                </p>
              )}

              <p className="mt-6 font-Barlow text-[10px] tracking-[0.08em] text-[hsla(var(--text)/0.4)] uppercase">
                No noise. High-signal updates. Crafting the Current.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterBox;