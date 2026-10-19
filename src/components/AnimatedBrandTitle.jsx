import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * AnimatedBrandTitle
 * Refined, responsive architectural brand title for "MKMS Builders".
 * Features staggered letter convergence with a subtle spring finish
 * and a restrained metallic gold light sweep.
 */
export default function AnimatedBrandTitle({ className = '', style = {} }) {
  const containerRef = useRef(null);
  const text = 'MKMS Builders';
  const letters = text.split('');

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered letter reveal with subtle spring finish
      gsap.fromTo(
        '.brand-letter',
        {
          opacity: 0,
          y: 20,
          scale: 0.92,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.75,
          stagger: 0.038,
          ease: 'back.out(1.4)',
          delay: 0.15,
          onComplete: () => {
            // Trigger a single, restrained metallic light sweep once assembled
            if (containerRef.current) {
              containerRef.current.classList.add('metallic-sheen-active');
            }
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`animated-brand-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        position: 'relative',
        cursor: 'default',
        userSelect: 'none',
        ...style
      }}
    >
      <span
        className="brand-text-wrapper"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.85rem, 3.6vw, 3.0rem)',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          lineHeight: '1.1',
          display: 'inline-flex',
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
          color: '#ffffff',
          position: 'relative'
        }}
      >
        {letters.map((char, index) => {
          if (char === ' ') {
            return (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  width: '0.28em'
                }}
              >
                &nbsp;
              </span>
            );
          }

          // Distinguish 'MKMS' with subtle champagne gold tone and 'Builders' with crisp white/platinum
          const isAcronym = index < 4;

          return (
            <span
              key={index}
              className="brand-letter"
              style={{
                display: 'inline-block',
                position: 'relative',
                color: isAcronym ? 'var(--gold-bright)' : '#ffffff',
                textShadow: isAcronym 
                  ? '0 0 20px rgba(226, 177, 112, 0.25)' 
                  : '0 2px 10px rgba(0, 0, 0, 0.5)',
                willChange: 'transform, opacity, filter'
              }}
            >
              {char}
            </span>
          );
        })}
      </span>

      {/* Restrained Metallic Light Sweep Effect */}
      <span className="brand-sheen-overlay" />

      <style>{`
        .animated-brand-container {
          overflow: hidden;
          padding: 2px 0;
        }

        .brand-sheen-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.35) 45%,
            rgba(226, 177, 112, 0.6) 50%,
            transparent 65%
          );
          background-size: 200% 100%;
          background-position: -120% 0;
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0;
        }

        .metallic-sheen-active .brand-sheen-overlay {
          animation: singleSheenSweep 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes singleSheenSweep {
          0% {
            background-position: -120% 0;
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            background-position: 220% 0;
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .brand-letter {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .brand-sheen-overlay {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
