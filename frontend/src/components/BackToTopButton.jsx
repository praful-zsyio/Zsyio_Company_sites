import React from "react";
import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "../utils/hooks";
import clsx from "clsx";

const BackToTopButton = () => {
  const isVisible = useScrollPosition(300);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={clsx(
        `
        group
        fixed bottom-8 right-8 z-50
        hidden md:flex
        h-18 w-18
        items-center justify-center
        rounded-full
        backdrop-blur-full
        bg-linear-to-br
        from-[hsl(var(--mantle))]/80
        to-[hsl(var(--base))]/70
        border border-[hsl(var(--surface2))]
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:scale-105
        hover:border-[hsl(var(--blue))]
        hover:shadow-[0_12px_45px_rgba(56,189,248,0.35)]
        focus:outline-none
        focus:ring-2
        focus:ring-[hsl(var(--blue))]/50
        focus:ring-offset-2
        focus:ring-offset-[hsl(var(--mantle))]/80
        `,
        isVisible
          ? "opacity-100 visible translate-y-0 scale-100"
          : "opacity-0 invisible translate-y-6 scale-90"
      )}
    >
      {/* Glow Layer */}
      <span
        className="
          absolute inset-0 rounded-full
          bg-[hsl(var(--blue))]/10
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      {/* Icon */}
      <ArrowUp
        size={36}
        strokeWidth={3}
        className="
          relative
          text-[hsl(var(--blue))]
          transition-transform duration-300
          group-hover:-translate-y-1
        "
      />
    </button>
  );
};

export default BackToTopButton;