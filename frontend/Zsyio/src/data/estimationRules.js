export const ESTIMATION_RULES = {
  "web-designing": ({ pages = 1, iterations = 1, logo = false }) =>
    15000 +
    pages * 2000 +
    Math.max(1, iterations - 1) * 5000 +
    (logo ? 6000 : 0),

  "web-development": ({ pages = 1, features = {} }) =>
    50000 +
    pages * 5000 +
    (features.cms ? 15000 : 0) +
    (features.auth ? 14000 : 0) +
    (features.payments ? 20000 : 0),

  deployment: ({ environments = 1 }) =>
    5000 + environments * 2500,

  "company-details": ({ pages = 1 }) =>
    4000 + pages * 1500,

  hosting: ({ years = 1 }) =>
    5000 * years,

  "app-development": ({ screens = 5, platform = "single" }) =>
    50000 +
    screens * 4000 +
    (platform === "both" ? 12000 : 0),

  "logo-designing": ({ concepts = 1, revisions = 2 }) =>
    6000 +
    concepts * 2000 +
    Math.max(0, revisions - 2) * 1500,

  "data-solutions": ({ dashboards = 1, integrations = 0 }) =>
    18000 +
    dashboards * 5000 +
    integrations * 4000,
};
export const DEFAULT_INPUTS = {
  "web-designing": {
    pages: 1,
    iterations: 1,
    logo: false,
  },
  "web-development": {
    pages: 1,
    features: {
      cms: false,
      auth: false,
      payments: false,
    },
  },
  deployment: {
    environments: 1,
  },
  "company-details": {
    pages: 1,
  },
  hosting: {
    years: 1,
  },
  "app-development": {
    screens: 5,
    platform: "single",
  },
  "logo-designing": {
    concepts: 1,
    revisions: 2,
  },
  "data-solutions": {
    dashboards: 1,
    integrations: 0,
  },
};