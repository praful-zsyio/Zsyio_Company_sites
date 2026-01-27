import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServices } from "../../services/api";
import * as Icons from "lucide-react";
import { Box } from "lucide-react"; // Start with specific fallback

const ServicesGrid = ({ isInView }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((response) => {
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else if (response.data.results) {
          setServices(response.data.results);
        } else {
          console.error("Unexpected API response format", response.data);
          setServices([]);
        }
      })
      .catch((error) => console.error("Error fetching services:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center pb-20">Loading services...</div>;

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
    >
      {services.map((service) => {
        // Icon handling
        // Safely access icon from Icons object, fallback to Box
        let IconComponent = Box;
        if (service.icon && Icons[service.icon]) {
          IconComponent = Icons[service.icon];
        }

        return (
          <motion.article
            key={service.id}
            className="rounded-2xl border bg-[hsl(var(--mantle))]/80 p-6 flex flex-col"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[hsl(var(--blue))]/15 mb-4">
              <IconComponent className="w-6 h-6 text-[hsl(var(--blue))]" />
            </div>

            <h3 className="text-lg font-semibold mb-2">
              {service.title}
            </h3>

            <p className="text-sm text-[hsl(var(--subtext1))] grow">
              {service.description}
            </p>

            <button
              onClick={() => navigate(`/estimate/${service.slug || service.id}`)}
              className="mt-6 rounded-lg border border-blue-400 px-4 py-2 text-sm"
            >
              Get Estimation
            </button>
          </motion.article>
        );
      })}
    </motion.div>
  );
};

export default ServicesGrid;
