import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartAndContact from "../components/services/CartAndContact";
import ProjectMarquee from "../components/projects/ProjectMarquee";
import { getProducts } from "../services/api";
import ProductsHero from "../components/products/ProductsHero";
import ProductsSidebar from "../components/products/ProductsSidebar";
import ProductRow from "../components/products/ProductRow";
import { usePageSEO } from "../utils/seo";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  usePageSEO({
    title: "Software Products & Accelerators",
    description: "Production-ready enterprise platforms, developer toolkits, and software accelerators built by Zsyio.",
    url: "/products",
  });

  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const allCategories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
  ];

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[hsl(var(--text))]">
        <p className="font-barlow text-[11px] tracking-[0.2em] uppercase font-bold animate-pulse">
          Loading Products...
        </p>
      </div>
    );
  }

  return (
    <main className="pt-20 md:pt-28 text-[hsl(var(--text))] min-h-screen">
      <ProductsHero products={products} allCategories={allCategories} />

      <ProjectMarquee
        items={[
          "Platform Engineering",
          "Data Pipelines",
          "Cloud Security",
          "Product Analytics",
          "Developer Tools",
        ]}
      />

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">
        <ProductsSidebar
          allCategories={allCategories}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filteredCount={filtered.length}
        />

        {/* Product rows */}
        <main>
          {filtered.map((product, i) => (
            <ProductRow
              key={product.id || product._id || i}
              product={product}
              index={i}
              isLast={i === filtered.length - 1}
            />
          ))}

          {filtered.length === 0 && (
            <div className="px-8 py-20">
              <p className="font-Barlow text-3xl font-black uppercase tracking-tight text-[hsl(var(--subtext1))]">
                No products in this category yet.
              </p>
            </div>
          )}
        </main>
      </div>

      <ProjectMarquee
        items={[
          "Ship Faster",
          "Break Less",
          "Scale Confidently",
          "Built for Real Teams",
          "Platform Engineering",
          "Data Pipelines",
          "Cloud Security",
          "Product Analytics",
          "Developer Tools",
        ]}
      />

      <CartAndContact />
    </main>
  );
}
