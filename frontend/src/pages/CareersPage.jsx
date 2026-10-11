import React, { useState, useCallback, useEffect } from "react";
import CareersHero from "../components/careers/CareersHero";
import PerksSection from "../components/careers/PerksSection";
import OpenRolesSection from "../components/careers/OpenRolesSection";
import HiringProcessSection from "../components/careers/HiringProcessSection";
import ApplicationForm from "../components/careers/ApplicationForm";
import AboutMarquee from "../components/about/AboutMarquee";
import { getCareerJobs } from "../services/api";
import {
  CAREERS_MARQUEE_TOP,
  CAREERS_MARQUEE_BOTTOM,
} from "../data/careersData";
import { usePageSEO } from "../utils/seo";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  usePageSEO({
    title: "Careers & Engineering Culture | Join Our Team",
    description: "Build cutting-edge distributed systems, cloud architectures, and AI applications with Zsyio. Explore high-impact roles.",
    url: "/careers",
  });

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getCareerJobs();
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load job openings:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleApply = useCallback((job) => {
    setSelectedJob(job);
    scrollToId("apply");
  }, []);

  return (
    <div>
      <CareersHero
        openCount={loading || error ? null : jobs.length}
        onViewRoles={() => scrollToId("open-roles")}
      />
      <AboutMarquee items={CAREERS_MARQUEE_TOP} dark={true} speed={30} />
      <PerksSection />
      <OpenRolesSection
        jobs={jobs}
        loading={loading}
        error={error}
        onRetry={loadJobs}
        onApply={handleApply}
      />
      <AboutMarquee items={CAREERS_MARQUEE_BOTTOM} dark={false} speed={45} />
      <HiringProcessSection />
      <ApplicationForm jobs={jobs} selectedJob={selectedJob} />
    </div>
  );
};

export default CareersPage;
