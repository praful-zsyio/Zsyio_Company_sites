import { useEffect } from "react";

/**
 * Custom hook to dynamically manage page-level SEO metadata.
 * Updates document.title, description, canonical link, and OpenGraph tags.
 *
 * @param {Object} options
 * @param {string} options.title - Page title (will be suffixed with " | Zsyio")
 * @param {string} options.description - Meta description
 * @param {string} [options.url] - Canonical URL
 * @param {string} [options.image] - OpenGraph image URL
 * @param {string} [options.type] - OpenGraph type (default: "website")
 */
export function usePageSEO({
  title,
  description,
  url,
  image = "https://res.cloudinary.com/damlvqiwv/image/upload/v1772109801/DarkGreenLogo_r1ytux.png",
  type = "website",
}) {
  useEffect(() => {
    // 1. Document Title
    const formattedTitle = title ? `${title} | Zsyio` : "Zsyio | Premium Software Solutions & Technology Services";
    document.title = formattedTitle;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attr, key, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 3. Helper to set or create link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Standard Meta
    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
      setMetaTag("name", "twitter:description", description);
    }

    // OpenGraph
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:image", image);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", formattedTitle);
    setMetaTag("name", "twitter:image", image);

    const fullUrl = url ? (url.startsWith("http") ? url : `https://zsyio.com${url}`) : window.location.href;
    setMetaTag("property", "og:url", fullUrl);
    setLinkTag("canonical", fullUrl);

  }, [title, description, url, image, type]);
}
