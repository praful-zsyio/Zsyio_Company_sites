import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MARQUEE_ITEMS = [
  'Digital Transformation',
  'AI & ML Innovation',
  'Web & Mobile Excellence',
  'Cloud Solutions',
  'Data Analytics',
  'Cybersecurity',
  'UI/UX Design',
  'E-commerce Development',
  'IoT Solutions',
  'DevOps Solutions',
  'Quality Assurance',
  'Blockchain Development',
];

const MarqueeStrip = () => {
  const trackRef  = useRef(null);
  const tweenRef  = useRef(null);
  // -1 = scrolling down (default, leftward), +1 = scrolling up (rightward)
  const dirRef    = useRef(-1);
  const lastY     = useRef(window.scrollY);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate for seamless loop
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.parentElement.appendChild(clone);

    const totalWidth = track.scrollWidth;

    tweenRef.current = gsap.to([track, clone], {
      x: `-=${totalWidth}`,
      duration: totalWidth / 45,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    // ── Scroll direction detection ──
    const onScroll = () => {
      const currentY = window.scrollY;
      const newDir = currentY > lastY.current ? -1 : 1;
      lastY.current = currentY;

      if (newDir !== dirRef.current) {
        dirRef.current = newDir;
        // Smoothly flip timeScale: negative = reverse direction
        gsap.to(tweenRef.current, {
          timeScale: newDir,   // -1 reverses, 1 plays forward
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      tweenRef.current?.kill();
      window.removeEventListener('scroll', onScroll);
      if (clone.parentElement) clone.parentElement.removeChild(clone);
    };
  }, []);

  return (
    <div
      className="marquee-strip"
      style={{
        height: '60px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(90deg, hsla(var(--highlight)/0.08) 0%, hsla(var(--highlight)/0.04) 50%, hsla(var(--highlight)/0.08) 100%)',
        borderTop: '1px solid hsla(var(--highlight))',
        borderBottom: '1px solid hsla(var(--highlight))',
        position: 'relative',
      }}
    >
      {/* Scrolling track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {Array(10).fill(MARQUEE_ITEMS).flat().map((text, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'hsla(var(--highlight)/0.85)',
              padding: '0 3rem',
              fontFamily: 'var(--font-barlow, "Barlow", sans-serif)',
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
