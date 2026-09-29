import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PARTNERS = [
  '✦ Google Cloud',
  '✦ Amazon Web Services',
  '✦ Microsoft Azure',
  '✦ Vercel',
  '✦ Stripe',
  '✦ Cloudflare',
  '✦ MongoDB',
  '✦ OpenAI',
  '✦ Figma',
  '✦ GitHub',
  '✦ Docker',
  '✦ Datadog',
];

const PartnerMarquee = () => {
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
      duration: 35, // Slightly slower than the top marquee for variety
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
        background: 'linear-gradient(90deg, hsla(var(--lavender)/0.04) 0%, hsla(var(--lavender)/0.08) 50%, hsla(var(--lavender)/0.04) 100%)',
        borderTop: '1px solid hsla(var(--lavender))',
        borderBottom: '1px solid hsla(var(--lavender))',
        position: 'relative',
        marginTop: '2rem',
        marginBottom: '2rem',
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
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'hsla(var(--lavender))',
            padding: '0 2rem 0 3rem',
            fontFamily: 'var(--font-barlow, "Barlow", sans-serif)',
          }}
        >
          Partnered With:
        </span>
        
        {PARTNERS.map((text, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'hsla(var(--text)/0.75)',
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

export default PartnerMarquee;
