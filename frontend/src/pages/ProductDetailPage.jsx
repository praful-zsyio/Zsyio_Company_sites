import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProductById } from "../services/api";

import ProductDetailHero from "../components/products/ProductDetailHero";
import ProductDetailFeatureList from "../components/products/ProductDetailFeatureList";
import ProductDetailSidebarBlock from "../components/products/ProductDetailSidebarBlock";
import ProjectGallery from "../components/projects/ProjectGallery";

// ─── PRODUCT DETAIL PAGE ──────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductById(productId)
      .then((res) => setProduct(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[hsl(var(--text))]">
        <p className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold animate-pulse">
          Loading Product...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[hsl(var(--text))]">
        <div className="text-center">
          <p className="font-Barlow font-black text-4xl uppercase tracking-tight mb-4">
            Product Not Found
          </p>
          <Link
            to="/products"
            className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[hsl(var(--highlight))] text-[hsl(var(--highlight))] pb-0.5 hover:text-[hsl(var(--text))] transition-colors"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // ── Normalise DB fields ──────────────────────────────────────────────────────
  const name = product.name || product.title || "Untitled";
  const category = product.category || "General";
  const status = product.status || "Live";
  const description = product.description || "";
  const tagline = product.tagline || "";
  const features = Array.isArray(product.features)
    ? product.features
    : Array.isArray(product.highlights)
    ? product.highlights
    : [];
  const solutions = Array.isArray(product.solutions) ? product.solutions : [];
  const tech = Array.isArray(product.tech)
    ? product.tech
    : Array.isArray(product.tech_stack)
    ? product.tech_stack
    : [];
  const image = product.image || product.cloudinary_image || null;
  const images = product.images || product.gallery || null;
  const liveUrl = product.live_url || product.liveUrl || null;
  const price = product.price != null ? product.price : null;
  const accent = product.accent || "hsl(259, 72%, 70%)";
  const createdAt = product.created_at
    ? new Date(product.created_at).getFullYear()
    : null;

  const productImages = Array.isArray(images) && images.length > 0
    ? images
    : (image ? [image] : []);

  const statusStyles = {
    Live: "text-green-500 border-green-500",
    Beta: "text-yellow-500 border-yellow-500",
    "Coming Soon": "text-[hsl(var(--subtext1))] border-[hsl(var(--surface1))]",
  };

  return (
    <main className="pt-20 md:pt-28 text-[hsl(var(--text))] min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <ProductDetailHero
        name={name}
        category={category}
        status={status}
        tagline={tagline}
        accent={accent}
        liveUrl={liveUrl}
        price={price}
        statusStyles={statusStyles}
      />

      {/* ── HERO IMAGE ────────────────────────────────────────────────────── */}
      {image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-6 md:mx-12 lg:mx-20 mt-10 p-4 md:p-8 flex items-center justify-center overflow-hidden bg-transparent"
          style={{ height: "clamp(250px, 40vw, 500px)" }}
        >
          <img
            src={image}
            alt={name}
            className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 hover:scale-[1.02] transition-all duration-700"
          />
        </motion.div>
      )}

      {/* ── BODY ──────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_340px] border-t border-[hsl(var(--surface1))] mt-10 mx-6 md:mx-12 lg:mx-20 mb-10">

        {/* Left: description + features + solutions */}
        <div className="py-10 lg:pr-14 lg:border-r border-[hsl(var(--surface1))]">
          {/* Accent rule */}
          <div
            className="h-[3px] w-24 mb-8 opacity-30"
            style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
          />

          {description && (
            <>
              <p className="font-barlow text-[11px] tracking-[0.25em] uppercase font-bold mb-4 text-[hsl(var(--subtext1))]">
                About this Product
              </p>
              <p className="font-barlow text-base md:text-lg leading-relaxed text-[hsl(var(--text))] opacity-80 mb-12 max-w-2xl">
                {description}
              </p>
            </>
          )}

          {features.length > 0 && (
            <ProductDetailFeatureList
              title="Key Features"
              items={features}
              accent={accent}
              bullet="square"
            />
          )}

          {solutions.length > 0 && (
            <ProductDetailFeatureList
              title="Solutions"
              items={solutions}
              accent={accent}
              bullet="circle"
            />
          )}
        </div>

        {/* Right: sidebar */}
        <aside className="py-10 lg:pl-10 flex flex-col gap-8">

          {/* Price */}
          {price != null && Number(price) > 0 && (
            <ProductDetailSidebarBlock label="Pricing">
              <span
                className="font-Barlow text-4xl font-black tracking-tight"
                style={{ color: accent }}
              >
                ₹{Number(price).toLocaleString("en-IN")}
              </span>
              <span className="font-barlow text-xs tracking-[0.15em] uppercase font-bold text-[hsl(var(--subtext1))] mt-1 block">
                One-time / Contact for licensing
              </span>
            </ProductDetailSidebarBlock>
          )}

          {/* Status */}
          <ProductDetailSidebarBlock label="Status">
            <span
              className={`font-barlow text-[11px] tracking-[0.15em] uppercase font-bold border px-3 py-1 inline-block ${
                statusStyles[status] ?? statusStyles["Coming Soon"]
              }`}
            >
              {status}
            </span>
          </ProductDetailSidebarBlock>

          {/* Category */}
          <ProductDetailSidebarBlock label="Category">
            <p className="font-Barlow text-2xl font-black uppercase tracking-tight text-[hsl(var(--text))]">
              {category}
            </p>
          </ProductDetailSidebarBlock>

          {/* Tech stack */}
          {tech.length > 0 && (
            <ProductDetailSidebarBlock label="Tech Stack">
              <div className="flex flex-wrap gap-1.5">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="font-barlow text-[10px] tracking-[0.1em] uppercase font-bold border border-[hsl(var(--surface1))] px-2 py-0.5 text-[hsl(var(--text))]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </ProductDetailSidebarBlock>
          )}

          {/* Year */}
          {createdAt && (
            <ProductDetailSidebarBlock label="Launched">
              <span
                className="font-Barlow text-3xl font-black tracking-tight"
                style={{ color: accent }}
              >
                {createdAt}
              </span>
            </ProductDetailSidebarBlock>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <a
              href={liveUrl || "#"}
              target={liveUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`font-barlow text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3 text-center transition-colors duration-300 ${
                liveUrl
                  ? "bg-[hsl(var(--text))] text-[hsl(var(--base))] hover:bg-[hsl(var(--highlight))]"
                  : "bg-[hsl(var(--surface1))] text-[hsl(var(--subtext1))] cursor-not-allowed opacity-50"
              }`}
            >
              Live Link ↗
            </a>
            <Link
              to="/contact"
              className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold border border-[hsl(var(--surface1))] text-[hsl(var(--text))] px-6 py-3 hover:border-[hsl(var(--highlight))] hover:text-[hsl(var(--highlight))] transition-colors duration-300 text-center"
            >
              Get in Touch →
            </Link>
          </div>
        </aside>
      </section>

      <ProjectGallery images={productImages} title={name} />

      {/* ── FOOTER STRIP ──────────────────────────────────────────────────── */}
      <footer className="border-t border-[hsl(var(--surface1))] px-6 md:px-14 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link
          to="/products"
          className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold text-[hsl(var(--text))] hover:text-[hsl(var(--highlight))] transition-colors"
        >
          ← Back to All Products
        </Link>
        <a
          href={liveUrl || "#"}
          target={liveUrl ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`font-barlow text-[11px] tracking-[0.2em] uppercase font-bold transition-colors ${
            liveUrl
              ? "text-[hsl(var(--highlight))] hover:text-[hsl(var(--text))]"
              : "text-[hsl(var(--subtext1))] cursor-not-allowed opacity-50"
          }`}
        >
          Live Link ↗
        </a>
      </footer>
    </main>
  );
}
