import { useNavigate } from "react-router-dom";
import * as LucideIcons from "lucide-react";

/**
 * ServiceCard — Reusable card for a single service item.
 *
 * Props:
 *  - service     {object}   Service data object from the DB
 */
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const Icon = LucideIcons[service?.icon] || LucideIcons.HelpCircle;
  const key = service?.slug || service?.id;
  const baseRate = Number(service?.base_rate || 0);

  return (
    <article className="p-8 md:p-10 bg-[hsla(var(--card-bg))] font-barlow flex flex-col gap-6 justify-between h-full hover:-translate-y-1 transition-transform duration-300  border border-[hsl(var(--surface0))] hover:border-[hsl(var(--lavender)/0.5)]">
      <div className="flex justify-between items-start">
        <Icon className="text-[hsl(var(--lavender))] w-8 h-8 shrink-0" />
        <h3 className="font-black text-[hsl(var(--lavender))] font-medium text-lg uppercase text-right leading-tight max-w-[70%]">{service?.title}</h3>
      </div>
      <p className="flex-grow text-[hsl(var(--text)/0.8)]">{service?.description}</p>
      
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[hsl(var(--subtext1))]">Starts from</span>
          <span className="text-[hsl(var(--lavender))] font-bold text-base">&#8377;{baseRate.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
