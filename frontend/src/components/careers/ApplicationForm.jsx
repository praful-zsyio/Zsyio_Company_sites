import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UploadCloud, FileText, X } from "lucide-react";
import { applyForJob } from "../../services/api";
import {
  OPEN_APPLICATION_LABEL,
  CAREERS_EMAIL,
  FORM_OPTIONS,
  RESUME_MAX_MB,
  RESUME_ACCEPT,
} from "../../data/careersData";

const INPUT_CLASS =
  "w-full bg-transparent border-b border-[hsl(var(--surface1))] focus:border-[hsl(var(--highlight))] focus:outline-none py-3 text-lg md:text-xl text-[hsl(var(--text))] font-Barlow transition-colors placeholder:text-[hsl(var(--surface2))] aria-[invalid=true]:border-[hsl(var(--red))]";

const LABEL_CLASS =
  "block font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-2";

const MAX_SKILLS = 25;
const MAX_COVER = 3000;
const MIN_COVER = 30;

const EMPTY_FORM = {
  jobId: "",
  full_name: "",
  email: "",
  phone: "",
  location: "",
  education: "",
  institution: "",
  total_experience: "",
  current_company: "",
  current_title: "",
  notice_period: "",
  expected_salary: "",
  linkedin_url: "",
  portfolio_url: "",
  github_url: "",
  cover_letter: "",
  heard_from: "",
  consent: false,
  hp_trap: "", // honeypot
};

const formatBytes = (bytes) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const Field = ({ id, label, required, error, hint, children }) => (
  <div>
    <label htmlFor={id} className={LABEL_CLASS}>
      {label}
      {required && " *"}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-bold text-[hsl(var(--red))]">
        {error}
      </p>
    ) : (
      hint && (
        <p className="mt-2 text-[11px] text-[hsla(var(--text)/0.45)] font-barlow">{hint}</p>
      )
    )}
  </div>
);

const Section = ({ num, title, children }) => (
  <div role="group" aria-label={title} className="flex flex-col gap-10">
    <div className="flex items-center gap-4 border-t border-[hsl(var(--surface1))] pt-8">
      <span className="font-mono text-sm font-semibold text-[hsl(var(--highlight))]">{num}</span>
      <h3 className="font-Barlow text-xl md:text-2xl font-black uppercase tracking-tight">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const SelectField = ({ id, options, value, onChange, error, placeholder }) => (
  <select
    id={id}
    required
    value={value}
    onChange={onChange}
    aria-invalid={!!error}
    aria-describedby={error ? `${id}-error` : undefined}
    className={`${INPUT_CLASS} cursor-pointer ${value ? "" : "text-[hsl(var(--surface2))]"}`}
  >
    <option value="" disabled className="bg-[hsl(var(--base))]">
      {placeholder}
    </option>
    {options.map((o) => (
      <option key={o} value={o} className="bg-[hsl(var(--base))] text-[hsl(var(--text))]">
        {o}
      </option>
    ))}
  </select>
);

const ApplicationForm = ({ jobs = [], selectedJob }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [resume, setResume] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [submittedRole, setSubmittedRole] = useState("");
  const formRef = useRef(null);
  const fileRef = useRef(null);

  // Pre-select the role when "Apply for this role" is clicked
  useEffect(() => {
    if (selectedJob) setForm((p) => ({ ...p, jobId: selectedJob.id }));
  }, [selectedJob]);

  // If the chosen role disappears (closed / reloaded), fall back to open application
  const jobId = jobs.some((j) => j.id === form.jobId) ? form.jobId : "";

  const clearError = (name) =>
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));

  const bind = (name) => ({
    id: `career-${name}`,
    value: form[name],
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `career-${name}-error` : undefined,
    onChange: (e) => {
      setForm((p) => ({ ...p, [name]: e.target.value }));
      clearError(name);
    },
  });

  // ── Skills tag input ──
  const addSkills = useCallback((raw) => {
    const incoming = raw
      .split(",")
      .map((s) => s.trim().slice(0, 40))
      .filter(Boolean);
    if (!incoming.length) return;
    setSkills((prev) => {
      const next = [...prev];
      for (const s of incoming) {
        if (next.length >= MAX_SKILLS) break;
        if (!next.some((x) => x.toLowerCase() === s.toLowerCase())) next.push(s);
      }
      return next;
    });
    clearError("skills");
  }, []);

  const onSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkills(skillInput);
      setSkillInput("");
    } else if (e.key === "Backspace" && !skillInput && skills.length) {
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  // ── Resume ──
  const pickResume = (file) => {
    if (!file) return;
    const ext = file.name.toLowerCase().match(/\.[^.]+$/)?.[0];
    if (!RESUME_ACCEPT.split(",").includes(ext)) {
      setErrors((p) => ({ ...p, resume: "Resume must be a PDF, DOC or DOCX file." }));
      return;
    }
    if (file.size > RESUME_MAX_MB * 1024 * 1024) {
      setErrors((p) => ({ ...p, resume: `Resume must be ${RESUME_MAX_MB} MB or smaller.` }));
      return;
    }
    setResume(file);
    clearError("resume");
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    pickResume(e.dataTransfer.files?.[0]);
  };

  const removeResume = () => {
    setResume(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── Submit ──
  const focusFirstError = (errs) => {
    const first = Object.keys(errs).find((k) => errs[k]);
    if (!first) return;
    const el =
      document.getElementById(`career-${first}`) ||
      document.getElementById(`career-${first === "job_id" ? "jobId" : first}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include a skill that was typed but not yet confirmed with Enter / comma
    const finalSkills = [...skills];
    const pending = skillInput.trim();
    if (pending && finalSkills.length < MAX_SKILLS &&
        !finalSkills.some((s) => s.toLowerCase() === pending.toLowerCase())) {
      finalSkills.push(pending.slice(0, 40));
    }

    const clientErrors = {};
    if (!resume) clientErrors.resume = "Please attach your resume.";
    if (form.cover_letter.trim().length < MIN_COVER)
      clientErrors.cover_letter = `Please write at least ${MIN_COVER} characters.`;
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      focusFirstError(clientErrors);
      return;
    }

    setStatus("loading");
    setErrors({});

    const body = new FormData();
    body.append("job_id", jobId);
    [
      "full_name", "email", "phone", "location", "education", "institution",
      "total_experience", "current_company", "current_title", "notice_period",
      "expected_salary", "linkedin_url", "portfolio_url", "github_url",
      "cover_letter", "heard_from", "hp_trap",
    ].forEach((k) => body.append(k, (form[k] ?? "").toString().trim()));
    body.append("skills", finalSkills.join(","));
    body.append("consent", form.consent ? "true" : "false");
    body.append("resume", resume);

    try {
      await applyForJob(body);
      setSubmittedRole(jobs.find((j) => j.id === jobId)?.title || OPEN_APPLICATION_LABEL);
      setStatus("success");
    } catch (err) {
      console.error(err);
      const data = err.response?.data;
      if (data && typeof data === "object" && !Array.isArray(data)) {
        const fieldErrors = {};
        Object.entries(data).forEach(([k, v]) => {
          fieldErrors[k] = Array.isArray(v) ? v[0] : String(v);
        });
        // "detail" is a general message; everything else belongs to a field
        setErrors(fieldErrors);
        if (Object.keys(fieldErrors).some((k) => k !== "detail")) focusFirstError(fieldErrors);
      } else {
        setErrors({ detail: "Something went wrong. Please try again." });
      }
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setForm(EMPTY_FORM);
    setSkills([]);
    setSkillInput("");
    setResume(null);
    setErrors({});
  };

  return (
    <section
      id="apply"
      className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] border-b border-[hsl(var(--highlight))] text-[hsl(var(--text))] scroll-mt-20"
    >
      {/* Left: Form */}
      <div className="px-6 md:px-14 py-16 md:py-24 lg:border-r border-[hsl(var(--surface1))]">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center h-full py-12"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase font-bold text-[hsl(var(--highlight))] mb-6">
              Application Received
            </div>
            <h2 className="font-Barlow text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 leading-none">
              Thanks For <br /> Applying.
            </h2>
            <p className="font-barlow text-lg text-[hsla(var(--text)/0.7)] max-w-md mb-4">
              Your application for <strong>{submittedRole}</strong> is in. We read
              every application personally — expect to hear from us within a week.
            </p>
            <p className="font-barlow text-sm text-[hsla(var(--text)/0.5)] max-w-md mb-12">
              A confirmation email is on its way.
            </p>
            <button
              type="button"
              onClick={reset}
              className="self-start font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsl(var(--text))] pb-1 hover:text-[hsl(var(--highlight))] hover:border-[hsl(var(--highlight))] transition-colors cursor-pointer"
            >
              Submit Another Application
            </button>
          </motion.div>
        ) : (
          <>
            <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))] mb-4">
              Apply Now
            </p>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
              className="font-Barlow font-black uppercase mb-12"
            >
              Tell Us <span className="text-[hsl(var(--highlight))]">About You.</span>
            </h2>

            <form
              id="careers-application-form"
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate={false}
              className="flex flex-col gap-14"
            >
              {errors.detail && (
                <div
                  role="alert"
                  className="bg-[hsla(var(--red)/0.1)] text-[hsl(var(--red))] px-4 py-3 text-sm font-bold tracking-wider uppercase border border-[hsla(var(--red)/0.2)]"
                >
                  {errors.detail} Or email {CAREERS_EMAIL}.
                </div>
              )}

              {/* Honeypot — hidden from people, bots tend to fill it in */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="career-hp_trap">Leave empty</label>
                <input
                  id="career-hp_trap"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.hp_trap}
                  onChange={(e) => setForm((p) => ({ ...p, hp_trap: e.target.value }))}
                />
              </div>

              {/* 01 — Role */}
              <Section num="01" title="The Role">
                <Field
                  id="career-jobId"
                  label="Applying For"
                  required
                  error={errors.job_id}
                >
                  <select
                    id="career-jobId"
                    required
                    value={jobId}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, jobId: e.target.value }));
                      clearError("job_id");
                    }}
                    aria-invalid={!!errors.job_id}
                    className={`${INPUT_CLASS} cursor-pointer`}
                  >
                    <option value="" className="bg-[hsl(var(--base))]">
                      {OPEN_APPLICATION_LABEL}
                    </option>
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id} className="bg-[hsl(var(--base))]">
                        {j.title} — {j.department}
                      </option>
                    ))}
                  </select>
                </Field>
              </Section>

              {/* 02 — About you */}
              <Section num="02" title="About You">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <Field id="career-full_name" label="Full Name" required error={errors.full_name}>
                    <input {...bind("full_name")} required type="text" maxLength={120}
                      autoComplete="name" placeholder="Ravi Sharma" className={INPUT_CLASS} />
                  </Field>
                  <Field id="career-email" label="Email" required error={errors.email}>
                    <input {...bind("email")} required type="email" maxLength={254}
                      autoComplete="email" placeholder="ravi@example.com" className={INPUT_CLASS} />
                  </Field>
                  <Field id="career-phone" label="Phone" required error={errors.phone}>
                    <input {...bind("phone")} required type="tel" maxLength={20}
                      pattern="[0-9+\-()\s]{7,20}" title="Digits, spaces, + - ( ) only"
                      autoComplete="tel" placeholder="+91 98765 43210" className={INPUT_CLASS} />
                  </Field>
                  <Field id="career-location" label="Current City / Country" required error={errors.location}>
                    <input {...bind("location")} required type="text" maxLength={120}
                      autoComplete="address-level2" placeholder="Indore, India" className={INPUT_CLASS} />
                  </Field>
                  <Field id="career-education" label="Highest Education" required error={errors.education}>
                    <SelectField {...bind("education")} options={FORM_OPTIONS.education}
                      error={errors.education} placeholder="Select…" />
                  </Field>
                  <Field id="career-institution" label="College / University" error={errors.institution}>
                    <input {...bind("institution")} type="text" maxLength={160}
                      placeholder="e.g. IIT Indore" className={INPUT_CLASS} />
                  </Field>
                </div>
              </Section>

              {/* 03 — Experience */}
              <Section num="03" title="Experience">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <Field id="career-total_experience" label="Total Experience" required error={errors.total_experience}>
                    <SelectField {...bind("total_experience")} options={FORM_OPTIONS.experience}
                      error={errors.total_experience} placeholder="Select…" />
                  </Field>
                  <Field id="career-notice_period" label="Notice Period" required error={errors.notice_period}>
                    <SelectField {...bind("notice_period")} options={FORM_OPTIONS.noticePeriod}
                      error={errors.notice_period} placeholder="Select…" />
                  </Field>
                  <Field id="career-current_company" label="Current / Last Company" error={errors.current_company}>
                    <input {...bind("current_company")} type="text" maxLength={160}
                      autoComplete="organization" placeholder="Acme Corp" className={INPUT_CLASS} />
                  </Field>
                  <Field id="career-current_title" label="Current / Last Title" error={errors.current_title}>
                    <input {...bind("current_title")} type="text" maxLength={160}
                      autoComplete="organization-title" placeholder="Software Engineer" className={INPUT_CLASS} />
                  </Field>
                  <Field id="career-expected_salary" label="Expected Salary" error={errors.expected_salary}
                    hint="Optional — e.g. ₹8 LPA or negotiable">
                    <input {...bind("expected_salary")} type="text" maxLength={60}
                      placeholder="₹8 LPA" className={INPUT_CLASS} />
                  </Field>
                </div>

                <Field id="career-skills-input" label="Key Skills" error={errors.skills}
                  hint={`Press Enter or comma to add · ${skills.length}/${MAX_SKILLS}`}>
                  <div
                    className="flex flex-wrap items-center gap-2 border-b border-[hsl(var(--surface1))] focus-within:border-[hsl(var(--highlight))] py-2 transition-colors"
                    onClick={() => document.getElementById("career-skills-input")?.focus()}
                  >
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-2 bg-[hsla(var(--highlight)/0.12)] text-[hsl(var(--text))] font-barlow text-[12px] font-bold uppercase tracking-wider px-3 py-1.5"
                      >
                        {s}
                        <button
                          type="button"
                          aria-label={`Remove ${s}`}
                          onClick={() => setSkills((prev) => prev.filter((x) => x !== s))}
                          className="hover:text-[hsl(var(--red))] cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      id="career-skills-input"
                      type="text"
                      value={skillInput}
                      maxLength={40}
                      disabled={skills.length >= MAX_SKILLS}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={onSkillKeyDown}
                      onBlur={() => {
                        if (skillInput.trim()) {
                          addSkills(skillInput);
                          setSkillInput("");
                        }
                      }}
                      placeholder={skills.length ? "Add another…" : "React, Python, Figma…"}
                      className="flex-1 min-w-[140px] bg-transparent focus:outline-none py-1 text-lg font-Barlow text-[hsl(var(--text))] placeholder:text-[hsl(var(--surface2))]"
                    />
                  </div>
                </Field>
              </Section>

              {/* 04 — Links */}
              <Section num="04" title="Your Work">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <Field id="career-linkedin_url" label="LinkedIn" error={errors.linkedin_url}>
                    <input {...bind("linkedin_url")} type="url" maxLength={300}
                      placeholder="https://linkedin.com/in/…" className={INPUT_CLASS} />
                  </Field>
                  <Field id="career-github_url" label="GitHub" error={errors.github_url}>
                    <input {...bind("github_url")} type="url" maxLength={300}
                      placeholder="https://github.com/…" className={INPUT_CLASS} />
                  </Field>
                  <div className="md:col-span-2">
                    <Field id="career-portfolio_url" label="Portfolio / Website" error={errors.portfolio_url}
                      hint="Designers and engineers: a link to work you're proud of goes a long way.">
                      <input {...bind("portfolio_url")} type="url" maxLength={300}
                        placeholder="https://" className={INPUT_CLASS} />
                    </Field>
                  </div>
                </div>

                {/* Resume dropzone */}
                <div>
                  <span className={LABEL_CLASS}>Resume *</span>
                  <input
                    ref={fileRef}
                    id="career-resume"
                    type="file"
                    accept={RESUME_ACCEPT}
                    className="sr-only"
                    onChange={(e) => pickResume(e.target.files?.[0])}
                  />
                  {resume ? (
                    <div className="flex items-center justify-between gap-4 border border-[hsl(var(--highlight)/0.5)] bg-[hsla(var(--highlight)/0.05)] px-5 py-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-5 h-5 text-[hsl(var(--highlight))] flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-barlow font-bold truncate">{resume.name}</p>
                          <p className="font-barlow text-xs text-[hsla(var(--text)/0.55)]">
                            {formatBytes(resume.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeResume}
                        aria-label="Remove resume"
                        className="p-2 hover:text-[hsl(var(--red))] transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="career-resume"
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={onDrop}
                      className={`flex flex-col items-center justify-center gap-3 border border-dashed px-6 py-10 text-center cursor-pointer transition-colors duration-300 ${
                        dragging
                          ? "border-[hsl(var(--highlight))] bg-[hsla(var(--highlight)/0.08)]"
                          : errors.resume
                          ? "border-[hsl(var(--red))]"
                          : "border-[hsl(var(--surface2))] hover:border-[hsl(var(--highlight))]"
                      }`}
                    >
                      <UploadCloud className="w-7 h-7 text-[hsl(var(--highlight))]" />
                      <span className="font-barlow font-bold">
                        Drop your resume here or <span className="text-[hsl(var(--highlight))] underline">browse</span>
                      </span>
                      <span className="font-barlow text-xs text-[hsla(var(--text)/0.5)]">
                        PDF, DOC or DOCX · up to {RESUME_MAX_MB} MB
                      </span>
                    </label>
                  )}
                  {errors.resume && (
                    <p role="alert" className="mt-2 text-xs font-bold text-[hsl(var(--red))]">
                      {errors.resume}
                    </p>
                  )}
                </div>
              </Section>

              {/* 05 — Message */}
              <Section num="05" title="Your Story">
                <Field id="career-cover_letter" label="Why Zsyio?" required error={errors.cover_letter}>
                  <textarea
                    {...bind("cover_letter")}
                    required
                    rows={5}
                    minLength={MIN_COVER}
                    maxLength={MAX_COVER}
                    placeholder="Tell us what you've built, what you want to build next, and why you'd like to join us…"
                    className={`${INPUT_CLASS} resize-none`}
                  />
                  <p className="mt-2 text-right text-[11px] text-[hsla(var(--text)/0.45)] font-barlow">
                    {form.cover_letter.length}/{MAX_COVER}
                  </p>
                </Field>

                <Field id="career-heard_from" label="How Did You Hear About Us?" error={errors.heard_from}>
                  <select
                    {...bind("heard_from")}
                    className={`${INPUT_CLASS} cursor-pointer ${form.heard_from ? "" : "text-[hsl(var(--surface2))]"}`}
                  >
                    <option value="" className="bg-[hsl(var(--base))]">Select…</option>
                    {FORM_OPTIONS.heardFrom.map((o) => (
                      <option key={o} value={o} className="bg-[hsl(var(--base))] text-[hsl(var(--text))]">
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      id="career-consent"
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, consent: e.target.checked }));
                        clearError("consent");
                      }}
                      className="mt-1 w-4 h-4 accent-[hsl(var(--highlight))] cursor-pointer"
                    />
                    <span className="font-barlow text-sm text-[hsla(var(--text)/0.75)] leading-relaxed">
                      I confirm the information above is accurate and agree that Zsyio may
                      store and process it to evaluate my application, as described in the{" "}
                      <Link to="/privacy-policy" className="underline hover:text-[hsl(var(--highlight))]">
                        Privacy Policy
                      </Link>
                      . *
                    </span>
                  </label>
                  {errors.consent && (
                    <p role="alert" className="mt-2 text-xs font-bold text-[hsl(var(--red))]">
                      {errors.consent}
                    </p>
                  )}
                </div>
              </Section>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <p className="font-barlow text-[10px] tracking-[0.1em] uppercase text-[hsla(var(--text)/0.4)] font-bold max-w-[220px] leading-relaxed">
                  Your information is kept strictly confidential.
                </p>
                <button
                  id="careers-submit"
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[hsl(var(--highlight))] flex justify-center items-center font-bold text-[15px] md:text-[16px] text-[hsl(var(--base))] px-8 py-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-[hsla(var(--highlight)/0.25)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === "loading" ? "Submitting…" : "Submit Application →"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Right: Info */}
      <div className="px-6 md:px-14 py-16 md:py-24 border-t lg:border-t-0 border-[hsl(var(--surface1))] flex flex-col justify-between gap-16">
        <div className="lg:sticky lg:top-28 flex flex-col gap-12">
          <div>
            <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-6">
              Don't See Your Role?
            </p>
            <p className="font-barlow text-2xl md:text-3xl font-medium text-[hsla(var(--text)/0.85)] leading-snug">
              We're always interested in exceptional people. Choose "Open
              Application" and tell us how you'd make us better.
            </p>
          </div>

          <div>
            <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--subtext1))] mb-6">
              What Happens Next
            </p>
            <ol className="space-y-4 font-barlow text-sm text-[hsla(var(--text)/0.7)] leading-relaxed">
              <li><span className="font-bold text-[hsl(var(--highlight))] mr-2">01</span>You'll get a confirmation email right away.</li>
              <li><span className="font-bold text-[hsl(var(--highlight))] mr-2">02</span>Our team reviews your application personally.</li>
              <li><span className="font-bold text-[hsl(var(--highlight))] mr-2">03</span>We reply within a week — either way.</li>
            </ol>
          </div>

          <div className="pt-8 border-t border-[hsl(var(--surface1))]">
            <p className="font-barlow text-[10px] tracking-[0.2em] uppercase font-bold text-[hsla(var(--highlight)/0.8)] mb-3">
              Careers Inbox
            </p>
            <a
              href={`mailto:${CAREERS_EMAIL}`}
              className="font-barlow text-xl md:text-2xl font-bold hover:text-[hsl(var(--highlight))] transition-colors"
            >
              {CAREERS_EMAIL}
            </a>
            <p className="font-barlow text-sm text-[hsla(var(--text)/0.6)] mt-4 leading-relaxed">
              Zsyio Technology · Indore, India
              <br />
              Equal-opportunity employer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
