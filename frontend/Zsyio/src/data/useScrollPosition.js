import { useState, useEffect } from 'react';

/**
 * A custom hook to track the window's scroll position.
 * @param {number} threshold - The scrollY value (in pixels) after which isScrolled becomes true.
 * @returns {boolean} - A boolean indicating if the scroll position is past the threshold.
 */
export const useScrollPosition = (threshold = 10) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    // Call handler once to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};