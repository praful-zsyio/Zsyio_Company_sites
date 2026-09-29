import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as LucideIcons from "lucide-react";
import { getServices } from "../../services/api";

gsap.registerPlugin(ScrollTrigger);

/* ─── Individual Card ─── */
const ServiceDetailCard = ({ service, index }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const Icon = LucideIcons[service?.icon] || LucideIcons.HelpCircle;
  const baseRate = Number(service?.base_rate || 0);
  const isEven = index % 2 === 0;

  const handleEnquiry = () => {
    const msg = `I am interested in your ${service?.title} service.\n\nDescription of my requirements:\n`;
    navigate(`/contact?message=${encodeURIComponent(msg)}&service=${encodeURIComponent(service?.title || '')}`);
  };

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.set(cardRef.current, { opacity: 0, y: 40 });
    const st = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 88%",
      onEnter: () =>
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: (index % 2) * 0.1,
        }),
      onLeaveBack: () =>
        gsap.to(cardRef.current, { opacity: 0, y: 40, duration: 0.4 }),
    });
    return () => st.kill();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"} gap-0 border-b border-[hsl(var(--surface1))] group`}
    >
      {/* ── Number + Icon panel ── */}
      <div className="flex lg:flex-col items-center justify-between lg:justify-center gap-6 lg:gap-8 px-8 md:px-10 py-8 lg:py-10 lg:w-48 shrink-0 border-b lg:border-b-0 border-r-0 lg:border-r border-[hsl(var(--surface1))] bg-[hsla(var(--lavender)/0.03)] group-hover:bg-[hsla(var(--lavender)/0.07)] transition-colors duration-500">
        <span className="font-Barlow font-black text-[4rem] lg:text-[5rem] leading-none text-[hsla(var(--lavender))] select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Icon className="w-9 h-9 text-[hsl(var(--lavender))] shrink-0" />
      </div>

      {/* ── Content ── */}
      <div className="flex-1 px-8 md:px-12 py-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
        {/* Title + description */}
        <div className="flex-1 space-y-4">
          <h3 className="font-Barlow font-black text-2xl md:text-3xl uppercase tracking-tight text-[hsl(var(--text))] group-hover:text-[hsl(var(--lavender))] transition-colors duration-300">
            {service?.title}
          </h3>
          <p className="font-barlow text-sm md:text-base leading-relaxed text-[hsl(var(--text))] max-w-xl">
            {service?.description}
          </p>
          {/* Typical project duration */}
          <div className="flex items-center gap-2 pt-1">
            <LucideIcons.Clock className="w-3.5 h-3.5 text-[hsl(var(--lavender))] shrink-0" />
            <span className="font-barlow text-[11px] uppercase tracking-[.18em] text-[hsl(var(--subtext1))]">
              Typical timeline:
            </span>
            <span className="font-barlow text-[11px] uppercase tracking-[.18em] font-bold text-[hsl(var(--lavender))]">
              {service?.timeline || service?.estimated_duration || "2–4 Weeks"}
            </span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-col items-start lg:items-end gap-5 shrink-0">
          <div className="text-right">
            <p className="font-barlow text-xs uppercase tracking-[.15em] text-[hsl(var(--subtext1))] mb-1">
              Starting from
            </p>
            <p className="font-Barlow font-black text-3xl text-[hsl(var(--lavender))]">
              &#8377;{baseRate.toLocaleString("en-IN")}
            </p>
          </div>
          <button
            onClick={handleEnquiry}
            className="font-barlow flex items-center gap-3 bg-[hsl(var(--lavender))] text-[hsl(var(--base))] px-7 py-3 font-bold uppercase tracking-wider text-sm hover:scale-105 hover:shadow-lg hover:shadow-[hsla(var(--lavender)/0.25)] transition-all duration-300 rounded-xl"
          >
            Enquire Now
            <LucideIcons.ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Grid ─── */
const ServicesPageGrid = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    getServices()
      .then((res) => setServices(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!headerRef.current || !services.length) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });
    }, headerRef);
    return () => ctx.revert();
  }, [services]);

  if (loading) {
    return (
      <div className="px-6 md:px-10 py-20 space-y-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-36 border border-[hsl(var(--surface1))] bg-[hsl(var(--mantle))]/60 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="text-center text-[hsl(var(--subtext1))] py-24">
        <p className="text-lg font-medium">No services found.</p>
      </div>
    );
  }

  return (
    <section className="mt-20 md:mt-28 px-6 md:px-10 pb-24">
      {/* ── Section header ── */}
      <div ref={headerRef} className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="font-barlow text-[11px] uppercase tracking-[.25em] text-[hsl(var(--lavender))] mb-3">
            What we offer
          </p>
          <h2 className="font-Barlow font-black text-[2.5rem] md:text-[4rem] uppercase leading-none tracking-tight text-[hsl(var(--text))]">
            All Services
          </h2>
        </div>
        <p className="font-barlow text-sm text-[hsl(var(--subtext1))] max-w-xs md:text-right leading-relaxed">
          Every service is delivered by an experienced team focused on quality and results.
        </p>
      </div>

      {/* ── Bordered list layout ── */}
      <div className="border-t border-[hsl(var(--surface1))]">
        {services.map((service, index) => (
          <ServiceDetailCard
            key={service.slug || service.id || index}
            service={service}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesPageGrid;
