import React, { useState, useEffect } from "react";
import { getCart, removeFromCart, clearCart } from "../../utils/cart";
import { submitContact } from "../../services/api";

const CartAndContact = () => {
    const [cart, setCart] = useState([]);
    const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Load cart on mount and listen for storage changes (optional, but good for sync)
    useEffect(() => {
        // Initial load
        setCart(getCart());

        // Poll or listen for changes? 
        // Since we are in the same SPA, we might need a custom event or just poll.
        // For simplicity, we'll just load once. Ideally, use a Context for Cart.
        // Let's add a simple interval to check for cart updates if user navigates back/forth
        const interval = setInterval(() => {
            const currentCart = getCart();
            setCart(prev => {
                if (JSON.stringify(prev) !== JSON.stringify(currentCart)) return currentCart;
                return prev;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleRemoveFromCart = (index) => {
        setCart(removeFromCart(index));
    };

    const handleSubmitCart = async () => {
        if (!contactForm.name || !contactForm.email || !contactForm.phone) {
            setSubmitStatus("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        // Construct the message from cart details
        let cartDetails = "Requested Estimation:\n\n";
        cart.forEach((item, idx) => {
            cartDetails += `${idx + 1}. ${item.title}: ₹${item.amount.toLocaleString('en-IN')}\n`;
        });
        const cartTotal = cart.reduce((sum, item) => sum + item.amount, 0);
        cartDetails += `\nTotal Estimated Cost: ₹${cartTotal.toLocaleString('en-IN')}`;
        cartDetails += `\n\nUser Message: ${contactForm.message}`;

        try {
            await submitContact({
                name: contactForm.name,
                email: contactForm.email,
                phone: contactForm.phone,
                message: cartDetails
            });
            setSubmitStatus("Success! Your estimation request has been sent to contact@zsyio.com.");
            clearCart();
            setCart([]);
            setContactForm({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("Failed to send request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) return null;

    const cartTotal = cart.reduce((sum, item) => sum + item.amount, 0);

    return (
  <section className="py-16 max-w-5xl mx-auto px-6">
    <div className="rounded-3xl border border-[hsl(var(--surface2))] bg-[hsl(var(--mantle))]/70 backdrop-blur-2xl p-8 md:p-10 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Project Estimation Cart
          </h2>
          <p className="text-sm text-[hsl(var(--subtext1))] mt-1">
            Review your selected services before submitting your request.
          </p>
        </div>

        <span className="text-xs uppercase tracking-widest text-[hsl(var(--subtext0))]">
          {cart.length} Items
        </span>
      </div>

      {/* CART ITEMS */}
      <div className="space-y-5">
        {cart.map((item, index) => (
          <div
            key={index}
            className="
              flex justify-between items-center
              rounded-xl
              border border-[hsl(var(--surface1))]
              bg-[hsl(var(--base))]/60
              px-5 py-4
            "
          >
            <div>
              <p className="font-medium text-base">{item.title}</p>
              <p className="text-sm text-[hsl(var(--subtext1))]">
                ₹{item.amount.toLocaleString("en-IN")}
              </p>
            </div>

            <button
              onClick={() => handleRemoveFromCart(index)}
              className="text-xs uppercase tracking-wide text-red-400"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="
        flex justify-between items-center
        rounded-2xl
        bg-[hsl(var(--base))]/80
        text-[hsl(var(--text))]
        px-6 py-5
        border border-[hsl(var(--surface1))]
      ">
        <span className="text-lg font-medium">Grand Total</span>
        <span className="text-3xl font-bold text-[hsl(var(--blue))]">
          ₹{cartTotal.toLocaleString("en-IN")}
        </span>
      </div>

      {/* FORM SECTION */}
      <div className="border-t border-[hsl(var(--surface1))] pt-8 space-y-6">

        <div>
          <h3 className="text-xl font-semibold">
            Receive Detailed Quote
          </h3>
          <p className="text-sm text-[hsl(var(--subtext1))] mt-1">
            Submit your request and our team will respond within 24 hours.
          </p>
        </div>

        {/* INPUT GRID */}
        <div className="grid gap-5 md:grid-cols-2">
          <input
            type="text"
            placeholder="Full Name"
            className="rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--base))]/70 p-4 outline-none focus:border-[hsl(var(--blue))]"
            value={contactForm.name}
            onChange={(e) => setContactForm(p => ({ ...p, name: e.target.value }))}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--base))]/70 p-4 outline-none focus:border-[hsl(var(--blue))]"
            value={contactForm.email}
            onChange={(e) => setContactForm(p => ({ ...p, email: e.target.value }))}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--base))]/70 p-4 outline-none focus:border-[hsl(var(--blue))] md:col-span-2"
            value={contactForm.phone}
            onChange={(e) => setContactForm(p => ({ ...p, phone: e.target.value }))}
          />
        </div>

        <textarea
          rows="3"
          placeholder="Additional Message (Optional)"
          className="w-full rounded-xl border border-[hsl(var(--surface2))] bg-[hsl(var(--base))]/70 p-4 outline-none focus:border-[hsl(var(--blue))]"
          value={contactForm.message}
          onChange={(e) => setContactForm(p => ({ ...p, message: e.target.value }))}
        />

        {submitStatus && (
          <p
            className={`text-center text-sm ${
              submitStatus.includes("Success")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {submitStatus}
          </p>
        )}

        {/* CTA */}
        <button
          onClick={handleSubmitCart}
          disabled={isSubmitting}
          className="
            w-full rounded-2xl
            bg-[hsl(var(--blue))]
            text-[hsl(var(--base))]
            font-semibold
            py-4
            text-lg
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isSubmitting ? "Sending..." : "Submit Estimation Request"}
        </button>

      </div>
    </div>
  </section>
);
};

export default CartAndContact;
