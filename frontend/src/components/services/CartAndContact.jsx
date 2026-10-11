import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getServices, submitContact } from "../../services/api";

export default function CartAndContact() {
  const [servicesList, setServicesList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState("select"); // 'select' | 'form' | 'done'
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all available services from API
    getServices()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setServicesList(data.map((s) => s.title));
      })
      .catch((err) => console.error(err));
  }, []);

  function toggle(s) {
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    let fullMessage = `SERVICES REQUESTED:\n${selected.map((s) => `- ${s}`).join("\n")}\n\n`;
    fullMessage += `BRIEF / MESSAGE:\n${form.message}`;

    try {
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: fullMessage,
      });
      setStep("done");
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="px-6 md:px-10 pb-24 md:pb-32">
      <div className="border-t border-[hsl(var(--surface1))] mt-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-b border-[hsl(var(--surface1))] py-8 md:py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsl(var(--highlight))]">
              {step === "select"
                ? "Step 01 of 02"
                : step === "form"
                ? "Step 02 of 02"
                : "Complete"}
            </p>
            <h2 className="font-Barlow text-[2.5rem] md:text-[4.5rem] leading-none font-black uppercase tracking-tight text-[hsl(var(--text))]">
              {step === "select"
                ? "Build Your Brief"
                : step === "form"
                ? "Your Details"
                : "Brief Received."}
            </h2>
          </div>
          {step === "select" && selected.length > 0 && (
            <button
              onClick={() => setStep("form")}
              className="px-8 py-4 bg-[hsl(var(--highlight))] text-[hsl(var(--base))] text-[11px] tracking-[0.22em] uppercase font-bold hover:scale-105 hover:shadow-lg hover:shadow-[hsla(var(--highlight)/0.25)] transition-all duration-300 shrink-0"
            >
              Continue ({selected.length}) &rarr;
            </button>
          )}
        </motion.div>

        {step === "select" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="border-b border-[hsl(var(--surface1))] py-6 px-0">
              <p className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--subtext1))]">
                Select the services you're interested in — pick one or many.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {servicesList.length === 0 ? (
                <div className="p-8 text-[hsl(var(--subtext1))] text-sm font-barlow uppercase tracking-widest animate-pulse">
                  Loading services...
                </div>
              ) : (
                servicesList.map((s, i) => {
                  const active = selected.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggle(s)}
                      className={`text-left px-7 py-8 border-b border-[hsl(var(--surface1))] flex items-start justify-between gap-4 transition-colors duration-300 cursor-pointer group
                        ${i % 2 === 0 ? "md:border-r md:border-[hsl(var(--surface1))]" : ""}
                        ${i % 3 !== 2 ? "lg:border-r lg:border-[hsl(var(--surface1))]" : "lg:border-r-0"}
                        ${i % 2 !== 0 ? "md:border-r-0" : ""}
                        ${
                          active
                            ? "bg-[hsl(var(--text))] text-[hsl(var(--base))]"
                            : "bg-transparent text-[hsl(var(--text))] hover:bg-[hsla(var(--highlight)/0.03)]"
                        }
                      `}
                    >
                      <span className={`font-Barlow text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight transition-colors ${active ? "text-[hsl(var(--base))]" : "group-hover:text-[hsl(var(--highlight))]"}`}>
                        {s}
                      </span>
                      <span
                        className={`mt-1 flex-shrink-0 w-6 h-6 border-2 flex items-center justify-center transition-colors ${
                          active
                            ? "border-[hsl(var(--base))] bg-[hsl(var(--base))]"
                            : "border-[hsl(var(--surface1))]"
                        }`}
                      >
                        {active && <span className="w-2.5 h-2.5 bg-[hsl(var(--text))]" />}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Selected summary strip */}
            <div className="border-b border-[hsl(var(--surface1))] px-0 py-6 flex flex-wrap gap-2 items-center">
              {selected.map((s) => (
                <span
                  key={s}
                  className="font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border border-[hsl(var(--surface1))] px-3 py-1.5 text-[hsl(var(--highlight))]"
                >
                  {s}
                </span>
              ))}
              <button
                onClick={() => setStep("select")}
                className="font-barlow text-[10px] tracking-[0.15em] uppercase font-bold text-[hsl(var(--subtext1))] hover:text-[hsl(var(--highlight))] transition-colors ml-3"
              >
                &larr; Edit Services
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2">
              {/* Left — fields */}
              <div className="border-b md:border-b-0 md:border-r border-[hsl(var(--surface1))]">
                {[
                  { key: "name", label: "Your Name", placeholder: "Ravi Sharma", type: "text" },
                  { key: "phone", label: "Phone", placeholder: "+91 98765 43210", type: "tel" },
                  { key: "email", label: "Work Email", placeholder: "ravi@company.com", type: "email" },
                ].map((field) => (
                  <div key={field.key} className="border-b border-[hsl(var(--surface1))]">
                    <label className="block px-7 pt-6 pb-2 font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))]">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.key !== "phone"}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      className="w-full px-7 pb-6 pt-1 text-base bg-transparent text-[hsl(var(--text))] placeholder-[hsl(var(--surface2))] outline-none font-medium"
                    />
                  </div>
                ))}
              </div>

              {/* Right — message + submit */}
              <div className="flex flex-col">
                <div className="flex-1 border-b border-[hsl(var(--surface1))] flex flex-col">
                  <label className="block px-7 pt-6 pb-2 font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))] shrink-0">
                    Brief / Message
                  </label>
                  <textarea
                    required
                    placeholder="Tell us about your goals, timeline, and any constraints..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full flex-1 min-h-[150px] px-7 pb-6 pt-1 text-base bg-transparent text-[hsl(var(--text))] placeholder-[hsl(var(--surface2))] outline-none resize-none font-medium leading-relaxed"
                  />
                </div>
                <div className="px-7 py-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <p className="font-barlow text-[11px] tracking-[0.08em] text-[hsl(var(--subtext1))] max-w-[200px]">
                    We respond within 24 hours with a tailored proposal outline.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-[hsl(var(--text))] text-[hsl(var(--base))] text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-[hsl(var(--highlight))] transition-colors flex-shrink-0 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Brief →"}
                  </button>
                </div>
                {error && <div className="px-7 pb-4 text-red-500 text-sm font-medium">{error}</div>}
              </div>
            </form>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-0 py-16 grid grid-cols-1 md:grid-cols-2"
          >
            <div className="border-b md:border-b-0 md:border-r border-[hsl(var(--surface1))] pb-12 md:pb-0 md:pr-14">
              <p className="font-Barlow text-[3rem] md:text-[5rem] font-black uppercase tracking-tight mb-6 leading-none text-[hsl(var(--text))]">
                We'll be in touch<br />within 24 hours.
              </p>
              <p className="font-barlow text-base leading-relaxed text-[hsl(var(--subtext1))] max-w-sm">
                A senior consultant will review your brief and reach out with initial thoughts and next steps. No generic auto-replies.
              </p>
            </div>
            <div className="pt-12 md:pt-0 md:pl-14 flex flex-col gap-4">
              <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))] mb-2">
                Services Requested
              </p>
              {selected.map((s) => (
                <div key={s} className="flex items-center gap-3 border-b border-[hsl(var(--surface1))] pb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--highlight))] flex-shrink-0" />
                  <span className="font-Barlow text-xl md:text-2xl font-bold uppercase tracking-tight text-[hsl(var(--text))]">
                    {s}
                  </span>
                </div>
              ))}
              <button
                onClick={() => {
                  setStep("select");
                  setSelected([]);
                  setForm({ name: "", phone: "", email: "", message: "" });
                }}
                className="mt-6 font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsl(var(--surface1))] pb-1 w-fit text-[hsl(var(--subtext1))] hover:text-[hsl(var(--highlight))] hover:border-[hsl(var(--highlight))] transition-all"
              >
                Submit another brief &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
