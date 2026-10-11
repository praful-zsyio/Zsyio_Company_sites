import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "../utils/hooks";
import clsx from "clsx";

const BackToTopButton = () => {
  const isVisible = useScrollPosition(300);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 1500); // Fade out 1.5s after scroll stops
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

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
        h-14 w-14
        items-center justify-center
        
        bg-[hsla(var(--highlight))]
        shadow-lg shadow-[hsla(var(--highlight)/0.25)]
        transition-all duration-500 ease-out
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-[hsla(var(--highlight)/0.4)]
        focus:outline-none
        hover:!opacity-100
        `,
        isVisible
          ? (isScrolling ? "opacity-100 visible translate-y-0" : "opacity-30 visible translate-y-0")
          : "opacity-0 invisible translate-y-4"
      )}
    >
      <ArrowUp
        size={24}
        strokeWidth={3}
        className="text-[hsla(var(--base))] group-hover:scale-110 transition-transform duration-300"
      />
    </button>
  );
};

export default BackToTopButton;