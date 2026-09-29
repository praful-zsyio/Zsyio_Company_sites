import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getServices } from "../../services/api";
import ServiceCard from "./ServiceCard";

gsap.registerPlugin(ScrollTrigger);

/**
 * ServicesGrid — fetches services from DB, renders a responsive grid.
 * Card stagger is driven by GSAP ScrollTrigger (plays + reverses on scroll).
 *
 * Props:
 *  - cols  {string}  Tailwind grid-cols classes
 *  - gap   {string}  Tailwind gap classes
 *  - limit {number}  Cap visible cards (e.g. 6 for homepage preview)
 */
const ServicesGrid = ({
  cols  = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  gap   = "gap-1 md:gap-1",
  limit = null,
}) => {
  const gridRef = useRef(null);
  const stRef   = useRef(null);   // keep ScrollTrigger instance for cleanup
  const [services,   setServices]   = useState([]);
  const [loading,    setLoading]    = useState(true);

  /* ── Fetch ── */
  useEffect(() => {
    getServices()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setServices(data);
      })
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setLoading(false));
  }, []);

  /* ── GSAP stagger — wait a tick so React has flushed the cards to DOM ── */
  useEffect(() => {
    if (!services.length) return;

    const id = setTimeout(() => {
      if (!gridRef.current) return;
      const cards = gsap.utils.toArray(gridRef.current.querySelectorAll("article"));
      if (!cards.length) return;

      // Start hidden
      gsap.set(cards, { opacity: 0, y: 48, willChange: "transform, opacity" });

      stRef.current = ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 85%",
        // play on scroll down, stay visible, reverse only on scroll back up
        onEnter: () =>
          gsap.to(cards, {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: { amount: 0.5, from: "start" },
            ease: "power3.out",
            overwrite: "auto",
          }),
        onLeaveBack: () =>
          gsap.to(cards, {
            opacity: 0, y: 48,
            duration: 0.4,
            stagger: { amount: 0.3, from: "end" },
            ease: "power2.in",
            overwrite: "auto",
          }),
      });

      ScrollTrigger.refresh();
    }, 0);

    return () => {
      clearTimeout(id);
      stRef.current?.kill();
      stRef.current = null;
    };
  }, [services]);

  /* ── Handlers ── */

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className={`grid ${cols} ${gap} mb-12`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-72 border border-[hsl(var(--surface1))] bg-[hsl(var(--mantle))]/60 animate-pulse" />
        ))}
      </div>
    );
  }

  /* ── Empty state ── */
  if (services.length === 0) {
    return (
      <div className="text-center text-[hsl(var(--subtext1))] py-12 mb-12">
        <p className="text-lg font-medium">No services found.</p>
        <p className="text-sm mt-2 opacity-70">Services will appear here once added to the database.</p>
      </div>
    );
  }

  const visibleServices = limit ? services.slice(0, limit) : services;

  return (
    <div
      ref={gridRef}
      className={`grid ${cols} ${gap} mb-12 bg-[hsl(var(--lavender))]`}
    >
      {visibleServices.map((service, index) => {
        const key = service.slug || service.id || index;
        return (
          <ServiceCard
            key={key}
            service={service}
          />
        );
      })}
    </div>
  );
};

export default ServicesGrid;
