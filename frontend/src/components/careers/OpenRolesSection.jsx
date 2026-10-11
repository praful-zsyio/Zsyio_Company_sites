import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Briefcase, Plus, ArrowUpRight } from "lucide-react";

const BULLET_CLASS =
  "font-barlow text-sm text-[hsl(var(--subtext1))] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-[hsl(var(--highlight))]";

const BulletList = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))] mb-4">
        {title}
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className={BULLET_CLASS}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const RoleRow = ({ job, isOpen, onToggle, onApply }) => {
  const panelId = `role-panel-${job.id}`;
  const place = [job.location, job.work_mode].filter(Boolean).join(" · ");

  return (
    <div className="border-b border-[hsl(var(--surface2))]">
      <button
        type="button"
        id={`role-toggle-${job.id}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group w-full flex items-center justify-between gap-6 px-6 md:px-14 py-8 text-left cursor-pointer transition-colors duration-300 hover:bg-[hsla(var(--highlight)/0.04)]"
      >
        <div className="flex-1 min-w-0">
          <span className="font-barlow text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))]">
            {job.department}
          </span>
          <h3 className="font-Barlow text-2xl md:text-4xl font-black uppercase tracking-tight mt-2 leading-tight group-hover:text-[hsl(var(--highlight))] transition-colors duration-300">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 font-barlow text-xs md:text-sm text-[hsla(var(--text)/0.65)]">
            <span className="inline-flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> {job.type}
            </span>
            {place && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {place}
              </span>
            )}
            {job.experience && (
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" /> {job.experience}
              </span>
            )}
          </div>
        </div>

        <span
          className={`flex-shrink-0 flex items-center justify-center w-12 h-12 border border-[hsl(var(--surface2))] transition-all duration-300 group-hover:border-[hsl(var(--highlight))] group-hover:text-[hsl(var(--highlight))] ${
            isOpen
              ? "rotate-45 bg-[hsl(var(--highlight))] !text-[hsl(var(--base))] !border-[hsl(var(--highlight))]"
              : ""
          }`}
        >
          <Plus className="w-5 h-5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={`role-toggle-${job.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-14 pb-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-10 lg:gap-14">
              <div className="space-y-8">
                <p className="font-barlow text-lg leading-relaxed text-[hsla(var(--text)/0.75)]">
                  {job.summary}
                </p>

                {job.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-barlow text-[10px] tracking-[0.15em] uppercase font-bold border border-[hsl(var(--surface1))] px-3 py-1.5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {job.salary_range && (
                  <p className="font-barlow text-sm text-[hsl(var(--subtext1))]">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[hsl(var(--highlight))] mr-3">
                      Compensation
                    </span>
                    {job.salary_range}
                  </p>
                )}
              </div>

              <BulletList title="What You'll Do" items={job.responsibilities} />

              <div className="flex flex-col justify-between gap-8">
                <div className="space-y-8">
                  <BulletList title="What We're Looking For" items={job.requirements} />
                  <BulletList title="Nice To Have" items={job.nice_to_have} />
                </div>

                <button
                  type="button"
                  id={`apply-${job.id}`}
                  onClick={() => onApply(job)}
                  className="group/apply self-start inline-flex items-center gap-3 bg-[hsl(var(--text))] text-[hsl(var(--base))] font-barlow font-bold text-[11px] px-8 py-4 uppercase tracking-[0.2em] hover:bg-[hsl(var(--highlight))] transition-colors duration-300 cursor-pointer"
                >
                  Apply for this role
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/apply:translate-x-0.5 group-hover/apply:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SkeletonRow = () => (
  <div className="px-6 md:px-14 py-8 border-b border-[hsl(var(--surface2))] animate-pulse">
    <div className="h-3 w-24 bg-[hsl(var(--surface1))] mb-4" />
    <div className="h-8 w-2/3 max-w-md bg-[hsl(var(--surface1))] mb-5" />
    <div className="h-3 w-1/2 max-w-xs bg-[hsl(var(--surface0))]" />
  </div>
);

const OpenRolesSection = ({ jobs = [], loading, error, onRetry, onApply }) => {
  const [department, setDepartment] = useState("All");
  const [openId, setOpenId] = useState(null);

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)))],
    [jobs]
  );

  const visible = useMemo(
    () => (department === "All" ? jobs : jobs.filter((j) => j.department === department)),
    [jobs, department]
  );

  // If the selected department disappears after a refetch, fall back to "All".
  const activeDepartment = departments.includes(department) ? department : "All";

  return (
    <section
      id="open-roles"
      className="border-b border-[hsl(var(--highlight))] text-[hsl(var(--text))] scroll-mt-20"
    >
      <div className="px-6 md:px-14 py-12 border-b border-[hsl(var(--highlight))] flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3 text-[hsl(var(--highlight))]">
            {loading
              ? "Loading positions…"
              : `${jobs.length} ${jobs.length === 1 ? "Position" : "Positions"} Open`}
          </p>
          <h2
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.025em",
            }}
            className="font-Barlow font-black uppercase"
          >
            Open <span className="text-[hsl(var(--highlight))]">Roles.</span>
          </h2>
        </div>

        {departments.length > 2 && (
          <div
            className="flex flex-wrap gap-3"
            role="tablist"
            aria-label="Filter roles by department"
          >
            {departments.map((dept) => {
              const active = dept === activeDepartment;
              return (
                <button
                  key={dept}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  id={`filter-${dept.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => {
                    setDepartment(dept);
                    setOpenId(null);
                  }}
                  className={`font-barlow text-[10px] tracking-[0.15em] uppercase font-bold px-4 py-2 border transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-[hsl(var(--highlight))] border-[hsl(var(--highlight))] text-[hsl(var(--base))]"
                      : "border-[hsl(var(--surface2))] text-[hsl(var(--text))] hover:border-[hsl(var(--highlight))] hover:text-[hsl(var(--highlight))]"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        {loading && (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        )}

        {!loading && error && (
          <div className="px-6 md:px-14 py-16 flex flex-col items-start gap-6">
            <p className="font-barlow text-lg text-[hsla(var(--text)/0.7)] max-w-xl">
              We couldn't load our open positions right now. You can still send
              an open application below.
            </p>
            <button
              type="button"
              id="roles-retry"
              onClick={onRetry}
              className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsl(var(--text))] pb-1 hover:text-[hsl(var(--highlight))] hover:border-[hsl(var(--highlight))] transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && visible.length === 0 && (
          <p className="px-6 md:px-14 py-16 font-barlow text-lg text-[hsla(var(--text)/0.6)] max-w-2xl">
            {jobs.length === 0
              ? "No positions are open right now — but we're always interested in great people. Send an open application below and we'll keep you in mind."
              : "No openings in this department right now."}
          </p>
        )}

        {!loading &&
          !error &&
          visible.map((job) => (
            <RoleRow
              key={job.id}
              job={job}
              isOpen={openId === job.id}
              onToggle={() => setOpenId(openId === job.id ? null : job.id)}
              onApply={onApply}
            />
          ))}
      </div>
    </section>
  );
};

export default OpenRolesSection;
