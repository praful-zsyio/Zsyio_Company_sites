import React, { useState } from "react";
import { submitPrivacyConsent } from "../services/api";

const PrivacyPolicyPage = () => {
  const [status, setStatus] = useState(null); // 'accepted' | 'rejected' | null
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleConsent = async (consentStatus) => {
    setLoading(true);
    setMessage("");

    try {
      await submitPrivacyConsent(consentStatus);
      setStatus(consentStatus);
      setMessage(
        consentStatus === "accepted"
          ? "Thank you for accepting our Privacy Policy."
          : "You have rejected the Privacy Policy."
      );
    } catch (error) {
      console.error("Error submitting consent:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-28 pb-32 max-w-full mx-auto px-6 text-[hsl(var(--text))] bg-[hsl(var(--base))]">

      {/* HEADER */}
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-[hsl(var(--subtext1))] max-w-2xl mx-auto">
          Your privacy matters to us. Please review how we collect, use,
          and safeguard your information.
        </p>
        <p className="text-sm text-[hsl(var(--subtext1))]">
          Last Updated: October 26, 2023
        </p>
      </div>

      {/* CONTENT CARD */}
      <div
        className="
          rounded-(--radius-xl)
          bg-[hsl(var(--mantle))]
          border border-[hsl(var(--surface1))]
          shadow-(--shadow-soft)
          p-10
          space-y-12
        "
      >

        {/* INTRODUCTION */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            1. Introduction
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            Welcome to <span className="font-semibold text-[hsl(var(--text))]">Zsyio</span>.
            We are committed to protecting your personal data and ensuring
            transparency in how information is handled.
          </p>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* DATA COLLECTION */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2. Data We Collect
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            We collect information you provide directly to us, such as when
            creating an account, subscribing to communications, or contacting support.
          </p>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* DATA USAGE */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. How We Use Your Data
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            Your information is used to provide, maintain, and improve our
            services, personalize your experience, and communicate important updates.
          </p>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* COOKIES */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Cookies & Tracking
          </h2>
          <p className="text-[hsl(var(--subtext1))] leading-relaxed">
            We use cookies and similar technologies to enhance user experience,
            analyze site traffic, and optimize performance.
          </p>
        </section>

        <div className="border-t border-[hsl(var(--surface1))]" />

        {/* CONSENT SECTION */}
        <section className="space-y-6">

          <h2 className="text-2xl font-semibold">
            Consent
          </h2>

          {!status ? (
            <>
              <p className="text-[hsl(var(--subtext1))]">
                Do you accept our Privacy Policy?
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => handleConsent("accepted")}
                  disabled={loading}
                  className="
                    px-6 py-3
                    rounded-lg
                    font-semibold
                    bg-[hsl(var(--blue))]
                    text-white
                    hover:opacity-90
                    transition
                    disabled:opacity-50
                  "
                >
                  {loading ? "Processing..." : "Accept"}
                </button>

                <button
                  onClick={() => handleConsent("rejected")}
                  disabled={loading}
                  className="
                    px-6 py-3
                    rounded-lg
                    font-semibold
                    border border-[hsl(var(--surface1))]
                    bg-[hsl(var(--surface0))]
                    text-[hsl(var(--text))]
                    hover:bg-[hsl(var(--surface1))]
                    transition
                    disabled:opacity-50
                  "
                >
                  {loading ? "Processing..." : "Reject"}
                </button>
              </div>

              {message && (
                <p className="text-sm text-red-500">
                  {message}
                </p>
              )}
            </>
          ) : (
            <div
              className="
                bg-[hsl(var(--surface0))]
                border border-[hsl(var(--surface1))]
                rounded-lg
                px-6 py-4
                space-y-2
              "
            >
              <p className="font-semibold">
                {message}
              </p>
              {status === "rejected" && (
                <p className="text-sm text-[hsl(var(--subtext1))]">
                  Some features may be limited.
                </p>
              )}
              <button
                onClick={() => {
                  setStatus(null);
                  setMessage("");
                }}
                className="
                  mt-2
                  text-[hsl(var(--blue))]
                  font-semibold
                  hover:underline
                "
              >
                Review Policy Again
              </button>
            </div>
          )}

        </section>

      </div>
    </section>
  );
};

export default PrivacyPolicyPage;