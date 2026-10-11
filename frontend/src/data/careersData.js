// Static content for the Careers page (perks, hiring steps, banners, form options).
// Job openings are NOT stored here — they come from the backend (GET /api/careers/jobs/).
// Manage them with `python manage.py seed_careers` or the admin API endpoints.

export const CAREERS_EMAIL = "careers@zsyio.com";

// Open-role count is added dynamically by the hero from the live job list.
export const CAREERS_STATS = [
  { value: "3+", label: "Countries Served" },
  { value: "<7d", label: "Reply Time" },
];

export const CAREERS_MARQUEE_TOP = [
  "We're Hiring",
  "Build With Us",
  "Indore · Remote",
  "Senior-Led Teams",
  "Real Ownership",
  "Ship What Matters",
];

export const CAREERS_MARQUEE_BOTTOM = [
  "Engineering",
  "Design",
  "Product",
  "Growth",
  "Internships",
  "Open Applications",
];

export const PERKS = [
  {
    num: "01",
    title: "Real Ownership",
    description:
      "Own features end to end — from the first sketch to production. No ticket-pushing, no layers of sign-off.",
  },
  {
    num: "02",
    title: "Learn Fast",
    description:
      "Work next to senior engineers and designers on client projects across web, mobile, cloud and AI.",
  },
  {
    num: "03",
    title: "Flexible Work",
    description:
      "Remote-friendly with a home base in Indore. We care about outcomes, not hours at a desk.",
  },
  {
    num: "04",
    title: "Learning Budget",
    description:
      "Courses, books, conferences and certifications — we back the growth that you choose.",
  },
  {
    num: "05",
    title: "Small Team, Big Reach",
    description:
      "A tight crew delivering for clients in 3+ countries. Your work ships globally, and fast.",
  },
  {
    num: "06",
    title: "Honest Culture",
    description:
      "Direct feedback, blameless post-mortems, and a bias for saying what we actually think.",
  },
];

export const HIRING_STEPS = [
  {
    num: "01",
    title: "Apply",
    description:
      "Send your details and a link to your work. We read every application — a real person, not a filter.",
  },
  {
    num: "02",
    title: "Intro Chat",
    description:
      "A relaxed 30-minute call to talk about you, what you want to build, and how we work.",
  },
  {
    num: "03",
    title: "Practical Task",
    description:
      "A small, focused exercise that mirrors real work. No whiteboard puzzles.",
  },
  {
    num: "04",
    title: "Offer",
    description:
      "We decide quickly and give honest feedback either way. Aim: a decision within a week of the task.",
  },
];

// Label for the "no specific role" choice in the application form (sent as an empty job_id).
export const OPEN_APPLICATION_LABEL = "Open Application (no specific role)";

// NOTE: these option lists are validated by the backend
// (backend/apps/careers/serializers.py). Keep both in sync.
export const FORM_OPTIONS = {
  education: ["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Other"],
  experience: [
    "Fresher / Student",
    "0-1 years",
    "1-3 years",
    "3-5 years",
    "5-8 years",
    "8+ years",
  ],
  noticePeriod: [
    "Immediate",
    "15 days",
    "30 days",
    "60 days",
    "90 days",
    "Currently studying",
  ],
  heardFrom: [
    "LinkedIn",
    "Referral",
    "Company Website",
    "GitHub",
    "Instagram",
    "Job Board",
    "Other",
  ],
};

export const RESUME_MAX_MB = 5;
export const RESUME_ACCEPT = ".pdf,.doc,.docx";
