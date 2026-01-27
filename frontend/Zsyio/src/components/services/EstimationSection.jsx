import { useParams, useNavigate } from "react-router-dom";
import { DEFAULT_INPUTS } from "../../data/estimationRules";
import { useEffect, useState, useCallback } from "react";
import { getServices, calculateEstimate } from "../../services/api";
import { getCart, addToCart, removeFromCart } from "../../utils/cart";

// Simple debounce implementation
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
} // Ensure you have this or implement simple debounce

/* ---------------- COMPONENT ---------------- */

const EstimateSection = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams(); // This is likely the SLUG or ID from URL
  const [service, setService] = useState(null);

  const [inputs, setInputs] = useState(
    () => DEFAULT_INPUTS[serviceId] || {}
  );
  const [total, setTotal] = useState(0);

  /* 🛒 CART STATE */
  const [cart, setCart] = useState(() => getCart());

  // 1. Fetch Service Details
  useEffect(() => {
    // We fetch all and find by slug/id for simplicity since we haven't set up detailed retrieve by slug yet
    getServices()
      .then((res) => {
        const found = res.data.find(s => s.slug === serviceId || s.id == serviceId);
        setService(found);
      })
      .catch(err => console.error("Error fetching service:", err));
  }, [serviceId]);

  // 2. Calculate Estimate via API
  const fetchEstimate = useCallback(
    debounce((currentInputs, currentServiceId) => {
      if (!currentServiceId) return;
      calculateEstimate({
        service_type: currentServiceId,
        ...currentInputs
      })
        .then(res => setTotal(res.data.estimated_cost))
        .catch(err => console.error("Estimation error:", err));
    }, 500),
    []
  );

  useEffect(() => {
    if (serviceId) {
      fetchEstimate(inputs, serviceId);
    }
  }, [inputs, serviceId, fetchEstimate]);


  if (!service) {
    return <p className="pt-32 text-center">Loading Service...</p>;
  }

  /* 🛒 CART HANDLERS */
  const handleAddToCart = () => {
    const updatedCart = addToCart({
      id: service.id,
      title: service.title,
      amount: total,
    });
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (index) => {
    setCart(removeFromCart(index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="pt-28 pb-32 max-w-4xl mx-auto px-6">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="
          mb-6 inline-flex items-center gap-2
          text-sm font-medium
          text-[hsl(var(--subtext1))]
          hover:text-[hsl(var(--text))]
          transition
        "
      >
        ← Back
      </button>

      <h1 className="text-3xl font-semibold mb-8">
        {service.title} – Cost Estimation
      </h1>

      <div className="rounded-2xl border bg-[hsl(var(--mantle))]/80 p-8 space-y-6">

        {/* WEB DESIGNING */}
        {serviceId === "web-designing" && (
          <>
            <Input
              label="Number of Pages"
              value={inputs.pages}
              onChange={(v) => setInputs(p => ({ ...p, pages: v }))}
            />
            <Input
              label="Design Iterations"
              value={inputs.iterations}
              onChange={(v) => setInputs(p => ({ ...p, iterations: v }))}
            />
            <Checkbox
              label="Include Logo Design"
              checked={inputs.logo}
              onChange={(v) => setInputs(p => ({ ...p, logo: v }))}
            />
          </>
        )}

        {/* WEB DEVELOPMENT */}
        {serviceId === "web-development" && (
          <>
            <Input
              label="Number of Pages"
              value={inputs.pages}
              onChange={(v) => setInputs(p => ({ ...p, pages: v }))}
            />

            {["cms", "auth", "payments"].map((key) => (
              <Checkbox
                key={key}
                label={key.toUpperCase()}
                checked={inputs.features?.[key]}
                onChange={(v) =>
                  setInputs(p => ({
                    ...p,
                    features: {
                      ...p.features,
                      [key]: v,
                    },
                  }))
                }
              />
            ))}
          </>
        )}

        {/* WEB DEPLOYMENT */}
        {serviceId === "deployment" && (
          <Input
            label="Number of Environments"
            value={inputs.environments}
            onChange={(v) =>
              setInputs(p => ({ ...p, environments: v }))
            }
          />
        )}

        {/* COMPANY DETAILS */}
        {serviceId === "company-details" && (
          <Input
            label="Number of Pages"
            value={inputs.pages}
            onChange={(v) => setInputs(p => ({ ...p, pages: v }))}
          />
        )}

        {/* HOSTING */}
        {serviceId === "hosting" && (
          <Input
            label="Years of Hosting"
            value={inputs.years}
            onChange={(v) => setInputs({ years: v })}
          />
        )}

        {/* APP DEVELOPMENT */}
        {serviceId === "app-development" && (
          <>
            <Input
              label="Number of Screens"
              value={inputs.screens}
              onChange={(v) => setInputs(p => ({ ...p, screens: v }))}
            />

            <label className="flex flex-col gap-2">
              <span>Platform</span>
              <select
                value={inputs.platform}
                onChange={(e) =>
                  setInputs(p => ({ ...p, platform: e.target.value }))
                }
                className="border rounded-md p-2 bg-transparent"
              >
                <option className="text-black" value="single">
                  Android or iOS
                </option>
                <option className="text-black" value="both">
                  Android + iOS
                </option>
              </select>
            </label>
          </>
        )}

        {/* LOGO DESIGN */}
        {serviceId === "logo-designing" && (
          <>
            <Input
              label="Concepts"
              value={inputs.concepts}
              onChange={(v) => setInputs(p => ({ ...p, concepts: v }))}
            />
            <Input
              label="Revisions"
              value={inputs.revisions}
              onChange={(v) => setInputs(p => ({ ...p, revisions: v }))}
            />
          </>
        )}

        {/* DATA SOLUTIONS */}
        {serviceId === "data-solutions" && (
          <>
            <Input
              label="Dashboards"
              value={inputs.dashboards}
              onChange={(v) => setInputs(p => ({ ...p, dashboards: v }))}
            />
            <Input
              label="Integrations"
              value={inputs.integrations}
              onChange={(v) => setInputs(p => ({ ...p, integrations: v }))}
            />
          </>
        )}

        {/* TOTAL */}
        <div className="border-t pt-6 flex justify-between items-center">
          <span className="text-lg font-semibold">Estimated Total</span>
          <span className="text-2xl font-bold text-blue-400">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="
            w-full rounded-xl mt-4
            bg-[hsl(var(--blue))]
            text-white font-semibold
            py-3
            hover:opacity-90 transition
          "
        >
          Add to Cart
        </button>
      </div>

      {/* CART SUMMARY */}
      {cart.length > 0 && (
        <div className="mt-12 rounded-2xl border bg-[hsl(var(--mantle))]/80 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Estimation Cart
          </h2>

          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-[hsl(var(--subtext1))]">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(index)}
                  className="text-sm text-red-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold">Grand Total</span>
            <span className="text-2xl font-bold text-blue-400">
              ₹{cartTotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default EstimateSection;

/* ---------------- REUSABLE INPUTS ---------------- */

const Input = ({ label, value, onChange }) => (
  <label className="flex flex-col gap-2">
    <span>{label}</span>
    <input
      type="number"
      min="1"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border rounded-md p-2 bg-transparent"
    />
  </label>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span>{label}</span>
  </label>
);
