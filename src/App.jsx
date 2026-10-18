import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowDown, 
  ChevronRight, 
  Eye, 
  Award, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  SlidersHorizontal,
  ExternalLink,
  ShieldAlert,
  Building,
  GraduationCap,
  Factory,
  Compass,
  ArrowUpRight,
  Maximize2,
  FileText
} from 'lucide-react';

import ArchitecturalCanvas from './components/ArchitecturalCanvas';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';
import ConsultationSection from './components/ConsultationSection';
import { PROJECTS, ENGINEERING_PHASES, COMPANY_PROFILE } from './data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroPinProgress, setHeroPinProgress] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [consultationPrefill, setConsultationPrefill] = useState('');

  const heroContainerRef = useRef(null);
  const heroViewportRef = useRef(null);
  const initialContentRef = useRef(null);
  const transformedContentRef = useRef(null);

  // Global scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP PINNED HERO TIMELINE & REDUCED MOTION AUDIT
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        // If reduced motion is preferred: keep elements visible without heavy scrub or pinning
        gsap.set(initialContentRef.current, { opacity: 1, y: 0 });
        gsap.set(transformedContentRef.current, { opacity: 1, y: 0, position: 'relative', top: 'auto', transform: 'none' });
        return;
      }

      // 1. Initial Page Load Stagger
      gsap.from('.hero-entry-item', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.1
      });

      // 2. PINNED HERO TRANSFORMATION TIMELINE (Adaptive scroll track on mobile)
      const pinEndDistance = isMobile ? '+=100%' : '+=140%';

      const heroTL = gsap.timeline({
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: 'top top',
          end: pinEndDistance,
          pin: heroViewportRef.current,
          scrub: 0.8, // Snappier and lighter scrub for touch
          anticipatePin: 1,
          onUpdate: (self) => {
            setHeroPinProgress(self.progress);
          }
        }
      });

      // Phase A: Initial headline glides upward and dissolves
      heroTL.to(initialContentRef.current, {
        y: -70,
        opacity: 0,
        filter: 'blur(8px)',
        scale: 0.96,
        duration: 0.4,
        ease: 'power2.inOut',
        pointerEvents: 'none'
      }, 0);

      // Phase B: Transformed Headline & Proof Matrix ascends smoothly from below
      heroTL.fromTo(transformedContentRef.current,
        {
          y: 70,
          opacity: 0,
          filter: 'blur(8px)',
          scale: 0.98,
          pointerEvents: 'none'
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1.0,
          duration: 0.44,
          ease: 'power2.out',
          pointerEvents: 'auto'
        },
        0.28
      );

      // Phase C: Progress indicator bar sync
      heroTL.to('.hero-scroll-progress-fill', {
        scaleX: 1,
        ease: 'none',
        duration: 1.0
      }, 0);

      // Section 2 Editorial Matrix Stagger
      gsap.from('.matrix-cell', {
        scrollTrigger: {
          trigger: '#mastery',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out'
      });

      // Section 3 Architectural Folio Reveals
      gsap.from('.folio-spread', {
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        y: 45,
        opacity: 0,
        stagger: 0.16,
        duration: 1.0,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const handleOpenContactWithProject = (projectTitle) => {
    setConsultationPrefill(projectTitle);
    const el = document.getElementById('consultation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-deep)', maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* Film Grain & Hairline Drafting Guides */}
      <div className="film-grain" />
      <div className="architectural-drafting-lines">
        <div className="drafting-line" />
        <div className="drafting-line" />
        <div className="drafting-line" />
        <div className="drafting-line" />
      </div>

      {/* Atmospheric Ambient Lighting */}
      <div className="ambient-glow-top" />
      <div className="ambient-glow-accent" style={{ top: '35%', right: '-100px' }} />
      <div className="ambient-glow-accent" style={{ top: '70%', left: '-100px' }} />

      {/* FIXED 3D WEBGL ARCHITECTURAL CANVAS */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none' // Zero interference with vertical touch scrolling!
        }}
      >
        <ArchitecturalCanvas 
          scrollProgress={scrollProgress}
          heroPinProgress={heroPinProgress}
          activePhase={activePhaseIndex}
        />
      </div>

      {/* Header Navigation */}
      <Navbar onOpenContact={() => handleOpenContactWithProject('')} />

      {/* MAIN ART-DIRECTED EDITORIAL STACK */}
      <main style={{ position: 'relative', zIndex: 5, maxWidth: '100vw', overflowX: 'hidden' }}>

        {/* ===================================================================
            SECTION 1: PINNED HERO TRANSFORMATION
            =================================================================== */}
        <div 
          id="hero-scroll-container"
          ref={heroContainerRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '100vw',
            minHeight: '200vh' // Calibrated distance for mobile & desktop
          }}
        >
          {/* PINNED VIEWPORT */}
          <div
            id="hero-pin-viewport"
            ref={heroViewportRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '100vw',
              minHeight: '100vh',
              height: '100dvh', // Modern dynamic viewport height for mobile Safari/Chrome
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(70px, 10vh, 100px) clamp(16px, 4vw, 64px) 28px',
              margin: '0 auto'
            }}
          >
            {/* 1A. INITIAL HERO STATE */}
            <div
              ref={initialContentRef}
              style={{
                position: 'absolute',
                top: '50%',
                left: 'clamp(16px, 4vw, 64px)',
                right: 'clamp(16px, 4vw, 64px)',
                transform: 'translateY(-50%)',
                maxWidth: '840px',
                zIndex: 10,
                pointerEvents: heroPinProgress > 0.35 ? 'none' : 'auto'
              }}
            >
              <div 
                className="hero-entry-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div className="blueprint-tag">
                  <span className="status-beacon" />
                  <span>REG. CIVIL CONTRACTORS • EST. 1989</span>
                </div>
                <span className="editorial-mono" style={{ color: 'var(--text-dim)' }}>
                  FOLIO 01
                </span>
              </div>

              {/* Responsive Monolith Headline */}
              <h1 
                className="hero-entry-item"
                style={{
                  fontSize: 'clamp(2.4rem, 6.2vw, 5.4rem)',
                  lineHeight: '1.02',
                  marginBottom: '18px',
                  fontWeight: '800'
                }}
              >
                <div>SCULPTING THE</div>
                <div className="text-gold-gradient">CHENNAI SKYLINE</div>
                <div style={{ fontSize: 'clamp(1.4rem, 3.4vw, 3.0rem)', color: 'var(--text-muted)', fontWeight: '600' }}>
                  FOR GENERATIONS.
                </div>
              </h1>

              {/* Subtitle */}
              <p 
                className="hero-entry-item"
                style={{
                  fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
                  color: 'var(--text-bright)',
                  lineHeight: '1.65',
                  maxWidth: '640px',
                  marginBottom: '26px',
                  textShadow: '0 2px 14px rgba(0,0,0,0.9)'
                }}
              >
                Real Estate Builders, Developers, Civil Contractors & Building Consultants. 
                Led by <strong>Reyaj (Proprietor)</strong> & <strong>Er. A. Shajahan Sait</strong> (Chartered Civil Engineer).
              </p>

              {/* Action Buttons (Touch Friendly) */}
              <div className="hero-entry-item" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <button
                  onClick={() => handleOpenContactWithProject('')}
                  className="btn-gold"
                >
                  <span>COMMISSION A PROJECT</span>
                  <ChevronRight size={15} />
                </button>

                <a
                  href="#portfolio"
                  className="btn-outline"
                >
                  <Eye size={15} />
                  <span>50+ WORKS</span>
                </a>
              </div>

              {/* Geodetic Coordinates */}
              <div 
                className="hero-entry-item"
                style={{
                  marginTop: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-dim)',
                  letterSpacing: '0.1em'
                }}
              >
                <span>LAT: 13.028° N</span>
                <span>•</span>
                <span>LONG: 80.244° E</span>
                <span>•</span>
                <span>CHAMIERS ROAD • NANDANAM</span>
              </div>
            </div>

            {/* 1B. TRANSFORMED HERO STATE */}
            <div
              ref={transformedContentRef}
              style={{
                position: 'absolute',
                top: '50%',
                left: 'clamp(16px, 4vw, 64px)',
                right: 'clamp(16px, 4vw, 64px)',
                transform: 'translateY(-50%)',
                maxWidth: '800px',
                zIndex: 12,
                opacity: 0,
                pointerEvents: 'none'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  flexWrap: 'wrap'
                }}
              >
                <div className="blueprint-tag" style={{ background: 'rgba(226, 177, 112, 0.12)', borderColor: 'var(--gold-primary)' }}>
                  <Award size={13} />
                  <span>TRACK RECORD • 50+ EXECUTED CONTRACTS</span>
                </div>
                <span className="editorial-mono" style={{ color: 'var(--gold-muted)' }}>
                  FOLIO 02
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2.0rem, 4.8vw, 4.0rem)',
                  lineHeight: '1.06',
                  marginBottom: '16px',
                  fontWeight: '800'
                }}
              >
                <div className="text-gold-gradient">50+ MONUMENTAL WORKS</div>
                <div style={{ color: '#ffffff' }}>CONSTRUCTED ACROSS TAMIL NADU</div>
              </h2>

              <p 
                style={{
                  fontSize: 'clamp(0.92rem, 1.5vw, 1.05rem)',
                  color: 'var(--text-bright)',
                  lineHeight: '1.65',
                  maxWidth: '620px',
                  marginBottom: '22px'
                }}
              >
                Full building erection, structural framing (concrete, steel, light gauge steel), 
                and turnkey finishing for prominent institutional campuses, corporate townships, and heavy utilities.
              </p>

              {/* Verified Project Chips (Stacked adaptively on mobile) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '10px', marginBottom: '22px' }}>
                <div 
                  className="editorial-panel" 
                  style={{ 
                    padding: '12px 14px', 
                    borderRadius: '2px', 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <GraduationCap size={20} color="#e2b170" />
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#ffffff' }}>
                      Utility Public School
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Kotturpuram, Chennai
                    </div>
                  </div>
                </div>

                <div 
                  className="editorial-panel" 
                  style={{ 
                    padding: '12px 14px', 
                    borderRadius: '2px', 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <Factory size={20} color="#e2b170" />
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#ffffff' }}>
                      Dharani Sugars Complex
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Admin & Quarters, Kallakurichi
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformed CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <a
                  href="#portfolio"
                  className="btn-gold"
                >
                  <span>INSPECT COMPLETED PORTFOLIO</span>
                  <ChevronRight size={14} />
                </a>

                <div className="editorial-mono" style={{ color: 'var(--gold-primary)', padding: '4px 8px' }}>
                  PROPRIETOR: REYAJ • ER. A. SHAJAHAN SAIT
                </div>
              </div>
            </div>

            {/* SCROLL TRANSFORMATION PROGRESS BAR */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: 'clamp(16px, 4vw, 64px)',
                right: 'clamp(16px, 4vw, 64px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                zIndex: 15,
                pointerEvents: 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, maxWidth: '380px' }}>
                <span className="editorial-mono" style={{ color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                  TRANSFORM
                </span>
                <div style={{ flex: 1, height: '2px', background: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
                  <div
                    className="hero-scroll-progress-fill"
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #e2b170, #ffd700)',
                      transformOrigin: 'left',
                      transform: 'scaleX(0)'
                    }}
                  />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#e2b170', fontWeight: '700' }}>
                  {Math.round(heroPinProgress * 100)}%
                </span>
              </div>

              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--gold-primary)',
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  pointerEvents: 'auto'
                }}
                onClick={() => {
                  const el = document.getElementById('mastery');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>CIVIL MASTERY</span>
                <ArrowDown size={12} style={{ animation: 'bounce 2s infinite' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            SECTION 2: CIVIL MASTERY (CODEX MATRIX)
            =================================================================== */}
        <section
          id="mastery"
          style={{
            position: 'relative',
            zIndex: 10,
            padding: 'clamp(4rem, 8vw, 8rem) clamp(16px, 4vw, 64px)',
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            overflowX: 'hidden'
          }}
        >
          {/* Section Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '32px', alignItems: 'end', marginBottom: '48px', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '28px' }}>
            <div>
              <div className="blueprint-tag" style={{ marginBottom: '14px' }}>
                <Layers size={13} />
                <span>SECTION 02 • CAPABILITIES</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.0rem, 4.5vw, 3.8rem)', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1.08' }}>
                Engineered by <br />
                <span className="text-gold-gradient">M.K.M.S. Builders Chennai</span>
              </h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-bright)', fontSize: '1.02rem', lineHeight: '1.68', marginBottom: '12px' }}>
                35+ years of verified contractor excellence. Comprehensive execution from geotechnical foundation boring to full framing (concrete, structural steel, and light gauge steel) and municipal utilities.
              </p>
              <div className="editorial-mono" style={{ color: 'var(--text-dim)', fontSize: '0.68rem' }}>
                HEADQUARTERS: CHAMIERS ROAD, NANDANAM, CHENNAI – 600035
              </div>
            </div>
          </div>

          {/* Architectural Codex Matrix */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '1px',
              background: 'var(--border-hairline)',
              border: '1px solid var(--border-hairline)',
              maxWidth: '100%'
            }}
          >
            <div className="matrix-cell" style={{ background: 'var(--bg-surface)', padding: 'clamp(24px, 4vw, 36px)', position: 'relative' }}>
              <div style={{ marginBottom: '16px' }}>
                <span className="editorial-mono" style={{ color: 'var(--gold-muted)' }}>CODEX / 01</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5vw, 3.4rem)', fontWeight: '800', color: 'var(--gold-primary)', lineHeight: '1', marginBottom: '10px' }}>
                50+
              </div>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>
                Executed Developments
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.65' }}>
                Delivered across residential apartment complexes, multi-acre educational campuses, and corporate administrative quarters.
              </div>
            </div>

            <div className="matrix-cell" style={{ background: 'var(--bg-surface)', padding: 'clamp(24px, 4vw, 36px)', position: 'relative' }}>
              <div style={{ marginBottom: '16px' }}>
                <span className="editorial-mono" style={{ color: 'var(--gold-muted)' }}>CODEX / 02</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', fontWeight: '800', color: 'var(--gold-primary)', lineHeight: '1.5', marginBottom: '10px' }}>
                FRAMING
              </div>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>
                Concrete, Steel & LGS
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.65' }}>
                Heavy reinforced concrete columns, high-tensile industrial steel framing, and modern light-gauge steel for accelerated delivery.
              </div>
            </div>

            <div className="matrix-cell" style={{ background: 'var(--bg-surface)', padding: 'clamp(24px, 4vw, 36px)', position: 'relative' }}>
              <div style={{ marginBottom: '16px' }}>
                <span className="editorial-mono" style={{ color: 'var(--gold-muted)' }}>CODEX / 03</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', fontWeight: '800', color: 'var(--gold-primary)', lineHeight: '1.5', marginBottom: '10px' }}>
                UTILITIES
              </div>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>
                Wind & Water Engineering
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.65' }}>
                Dynamic wind turbine foundation pedestals, municipal water distribution systems, and industrial waterproofing barriers.
              </div>
            </div>

            <div className="matrix-cell" style={{ background: 'var(--bg-surface)', padding: 'clamp(24px, 4vw, 36px)', position: 'relative' }}>
              <div style={{ marginBottom: '16px' }}>
                <span className="editorial-mono" style={{ color: 'var(--gold-muted)' }}>CODEX / 04</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', fontWeight: '800', color: 'var(--gold-primary)', lineHeight: '1.5', marginBottom: '10px' }}>
                MANAGEMENT
              </div>
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', marginBottom: '8px' }}>
                Reyaj & Er. Shajahan Sait
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.65' }}>
                Proprietary oversight and chartered civil engineering sign-off ensuring compliance with Indian Standard civil codes.
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: ARCHITECTURAL PORTFOLIO SPREADS
            =================================================================== */}
        <section
          id="portfolio"
          style={{
            position: 'relative',
            zIndex: 10,
            padding: 'clamp(4rem, 8vw, 8rem) clamp(16px, 4vw, 64px)',
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            overflowX: 'hidden'
          }}
        >
          {/* Section Header */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px', gap: '20px' }}>
            <div>
              <div className="blueprint-tag" style={{ marginBottom: '12px' }}>
                <Award size={13} />
                <span>SECTION 03 • MONUMENTAL PORTFOLIO</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.0rem, 4.5vw, 3.8rem)', color: '#ffffff', letterSpacing: '-0.02em' }}>
                Selected Projects & <span className="text-gold-gradient">Key Commissions</span>
              </h2>
            </div>
            <div className="editorial-mono" style={{ color: 'var(--text-dim)', maxWidth: '340px' }}>
              TAP ANY MONOGRAPH ENTRY TO VIEW FULL TECHNICAL DOSSIER.
            </div>
          </div>

          {/* SPREAD 1: HERO FEATURE — UTILITY PUBLIC SCHOOL (KOTTURPURAM) */}
          <div 
            className="editorial-panel folio-spread"
            onClick={() => setSelectedProject(PROJECTS[0])}
            style={{
              padding: 'clamp(20px, 3.5vw, 40px)',
              marginBottom: '32px',
              cursor: 'pointer',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '28px',
              alignItems: 'center'
            }}
          >
            {/* Visual */}
            <div style={{ position: 'relative', height: 'clamp(240px, 35vh, 420px)', overflow: 'hidden', borderRadius: '2px', width: '100%' }}>
              <img 
                src={PROJECTS[0].image} 
                alt={PROJECTS[0].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 12, 16, 0.85) 0%, transparent 60%)' }} />
              
              <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span className="blueprint-tag">MKMS / PROJ-01</span>
                <span className="blueprint-tag">▲ EL +24.80M</span>
              </div>

              <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                <span className="blueprint-tag" style={{ background: 'rgba(5, 6, 8, 0.9)', color: '#ffffff' }}>
                  <Maximize2 size={12} color="#e2b170" /> EXPAND
                </span>
              </div>
            </div>

            {/* Typography */}
            <div>
              <div className="editorial-mono" style={{ color: 'var(--gold-primary)', marginBottom: '10px' }}>
                FOLIO 01 / 04 • {PROJECTS[0].category.toUpperCase()}
              </div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 3.0vw, 2.4rem)', color: '#ffffff', marginBottom: '14px', lineHeight: '1.15' }}>
                {PROJECTS[0].title}
              </h3>
              <p style={{ color: 'var(--text-bright)', fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '22px' }}>
                {PROJECTS[0].description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '24px', borderTop: '1px solid var(--border-hairline)', paddingTop: '16px' }}>
                <div>
                  <div className="editorial-mono" style={{ color: 'var(--text-dim)', marginBottom: '2px' }}>LOCATION</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.88rem' }}>Kotturpuram, Chennai</div>
                </div>
                <div>
                  <div className="editorial-mono" style={{ color: 'var(--text-dim)', marginBottom: '2px' }}>STRUCTURAL SYSTEM</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.88rem' }}>RCC Column-Beam</div>
                </div>
                <div>
                  <div className="editorial-mono" style={{ color: 'var(--text-dim)', marginBottom: '2px' }}>CAMPUS AREA</div>
                  <div style={{ color: 'var(--gold-primary)', fontWeight: '700', fontSize: '0.92rem' }}>85,000 SQ. FT.</div>
                </div>
                <div>
                  <div className="editorial-mono" style={{ color: 'var(--text-dim)', marginBottom: '2px' }}>STATUS</div>
                  <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.88rem' }}>Turnkey Handover</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontWeight: '700', fontSize: '0.84rem' }}>
                <span>REVIEW COMPLETE SPECIFICATION DOSSIER</span>
                <ChevronRight size={15} />
              </div>
            </div>
          </div>

          {/* SPREAD 2: DUAL COLUMNS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px', marginBottom: '32px' }}>
            {/* Dharani Sugars Complex */}
            <div 
              className="editorial-panel folio-spread"
              onClick={() => setSelectedProject(PROJECTS[1])}
              style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', borderRadius: '2px', marginBottom: '18px' }}>
                  <img 
                    src={PROJECTS[1].image} 
                    alt={PROJECTS[1].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <span className="blueprint-tag">FOLIO 02 / 04</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <span className="blueprint-tag" style={{ color: '#ffffff' }}>145,000 SQ. FT.</span>
                  </div>
                </div>

                <div className="editorial-mono" style={{ color: 'var(--gold-primary)', marginBottom: '6px' }}>
                  {PROJECTS[1].category.toUpperCase()}
                </div>
                <h3 style={{ fontSize: '1.45rem', color: '#ffffff', marginBottom: '10px' }}>
                  {PROJECTS[1].title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '18px' }}>
                  {PROJECTS[1].description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="editorial-mono" style={{ color: 'var(--text-dim)', fontSize: '0.66rem' }}>
                  CLIENT: DHARANI SUGARS LTD
                </span>
                <span style={{ color: 'var(--gold-primary)', fontWeight: '700', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  SPECS <ChevronRight size={13} />
                </span>
              </div>
            </div>

            {/* Chamiers Commercial Centre */}
            <div 
              className="editorial-panel folio-spread"
              onClick={() => setSelectedProject(PROJECTS[2])}
              style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', borderRadius: '2px', marginBottom: '18px' }}>
                  <img 
                    src={PROJECTS[2].image} 
                    alt={PROJECTS[2].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <span className="blueprint-tag">FOLIO 03 / 04</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <span className="blueprint-tag" style={{ color: '#ffffff' }}>62,000 SQ. FT.</span>
                  </div>
                </div>

                <div className="editorial-mono" style={{ color: 'var(--gold-primary)', marginBottom: '6px' }}>
                  {PROJECTS[2].category.toUpperCase()}
                </div>
                <h3 style={{ fontSize: '1.45rem', color: '#ffffff', marginBottom: '10px' }}>
                  {PROJECTS[2].title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '18px' }}>
                  {PROJECTS[2].description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="editorial-mono" style={{ color: 'var(--text-dim)', fontSize: '0.66rem' }}>
                  CHAMIERS RD • NANDANAM
                </span>
                <span style={{ color: 'var(--gold-primary)', fontWeight: '700', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  SPECS <ChevronRight size={13} />
                </span>
              </div>
            </div>
          </div>

          {/* SPREAD 3: FULL WIDTH STRIP */}
          <div 
            className="editorial-panel folio-spread"
            onClick={() => setSelectedProject(PROJECTS[3])}
            style={{
              padding: '24px clamp(16px, 3vw, 32px)',
              cursor: 'pointer',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '18px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '42px', height: '42px', border: '1px solid var(--gold-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(226, 177, 112, 0.08)', flexShrink: 0 }}>
                <Layers size={18} color="#e2b170" />
              </div>
              <div>
                <div className="editorial-mono" style={{ color: 'var(--gold-primary)', fontSize: '0.66rem' }}>FOLIO 04 / 04 • SPECIALIZED UTILITY ENGINEERING</div>
                <div style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', fontWeight: '800', color: '#ffffff' }}>
                  Wind Engineering Foundations & Industrial Water Supply Networks
                </div>
              </div>
            </div>

            <button className="btn-outline" style={{ padding: '8px 18px', minHeight: '40px' }}>
              PARAMETERS <ChevronRight size={14} />
            </button>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: THE CODEX (4 STAGES)
            =================================================================== */}
        <section
          id="codex"
          style={{
            position: 'relative',
            zIndex: 10,
            padding: 'clamp(4rem, 8vw, 8rem) clamp(16px, 4vw, 64px)',
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            overflowX: 'hidden'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 44px' }}>
            <div className="blueprint-tag" style={{ marginBottom: '12px' }}>
              <SlidersHorizontal size={13} />
              <span>SECTION 04 • THE ENGINEERING CODEX</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.0rem, 4.5vw, 3.8rem)', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              4 Stages of <span className="text-gold-gradient">Execution Rigor</span>
            </h2>
            <p style={{ color: 'var(--text-bright)', fontSize: '1.02rem', lineHeight: '1.68' }}>
              From initial geotechnical borehole core extraction through to certified turnkey commissioning. 
              Tap each stage to observe structural reconfigurations.
            </p>
          </div>

          {/* Phase Selectors */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '12px',
              marginBottom: '28px'
            }}
          >
            {ENGINEERING_PHASES.map((p, idx) => (
              <button
                key={p.phase}
                type="button"
                onClick={() => setActivePhaseIndex(idx)}
                style={{
                  background: activePhaseIndex === idx ? 'rgba(226, 177, 112, 0.15)' : 'rgba(12, 15, 22, 0.75)',
                  border: activePhaseIndex === idx ? '1px solid var(--gold-primary)' : '1px solid var(--border-hairline)',
                  borderRadius: '2px',
                  padding: '18px 20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  touchAction: 'manipulation',
                  minHeight: '48px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="editorial-mono" style={{ color: 'var(--gold-primary)', fontWeight: '700' }}>
                    STAGE {p.phase} / 04
                  </span>
                  {activePhaseIndex === idx && (
                    <span className="status-beacon" />
                  )}
                </div>
                <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.96rem', marginBottom: '4px' }}>
                  {p.title}
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem', lineHeight: '1.45' }}>
                  {p.tagline}
                </div>
              </button>
            ))}
          </div>

          {/* Active Stage Card */}
          <div 
            className="editorial-panel"
            style={{
              padding: 'clamp(24px, 4vw, 44px)',
              maxWidth: '1060px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '28px',
              alignItems: 'center'
            }}
          >
            <div>
              <div className="editorial-mono" style={{ color: 'var(--gold-primary)', marginBottom: '8px' }}>
                STAGE SPECIFICATION: 0{activePhaseIndex + 1} OF 04
              </div>
              <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.7rem)', color: '#ffffff', marginBottom: '14px' }}>
                {ENGINEERING_PHASES[activePhaseIndex].title}
              </h3>
              <p style={{ color: 'var(--text-bright)', fontSize: '0.98rem', lineHeight: '1.75', marginBottom: '20px' }}>
                {ENGINEERING_PHASES[activePhaseIndex].description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ENGINEERING_PHASES[activePhaseIndex].stats.map((stat, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-hairline)',
                      padding: '7px 12px',
                      borderRadius: '2px',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <CheckCircle2 size={12} color="#e2b170" /> {stat}
                  </span>
                ))}
              </div>
            </div>

            <div 
              style={{
                background: 'rgba(5, 6, 8, 0.85)',
                border: '1px solid var(--border-hairline)',
                padding: '24px',
                color: 'var(--text-muted)',
                fontSize: '0.84rem'
              }}
            >
              <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.9rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={15} color="#e2b170" /> IS 456:2000 CIVIL AUDITING
              </div>
              <p style={{ lineHeight: '1.65', marginBottom: '14px' }}>
                Every concrete pour is sampled for slump consistency and tested for 7-day and 28-day compressive cube strength under the direct supervision of Reyaj & Er. A. Shajahan Sait.
              </p>
              <div className="editorial-mono" style={{ color: 'var(--gold-primary)', fontSize: '0.7rem' }}>
                PROPRIETOR: REYAJ • BAI FELLOW: ER. A. SHAJAHAN SAIT
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: FINAL REVEAL & CONSULTATION
            =================================================================== */}
        <ConsultationSection prefilledProject={consultationPrefill} />

        {/* Editorial Footer */}
        <footer
          style={{
            borderTop: '1px solid var(--border-hairline)',
            padding: '44px clamp(16px, 4vw, 64px)',
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            color: 'var(--text-dim)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            overflowX: 'hidden'
          }}
        >
          <div>
            <div style={{ color: '#ffffff', fontWeight: '800', letterSpacing: '0.12em', fontSize: '0.92rem', marginBottom: '4px' }}>
              M.K.M.S. BUILDERS & DEVELOPERS
            </div>
            <div>REAL ESTATE • CIVIL CONTRACTORS • BUILDING CONSULTANTS</div>
            <div style={{ color: 'var(--gold-muted)', marginTop: '4px' }}>PROPRIETOR: MR. REYAJ • ER. A. SHAJAHAN SAIT</div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <div>{COMPANY_PROFILE.address}</div>
            <div style={{ color: 'var(--gold-primary)', marginTop: '4px', fontSize: '0.84rem' }}>
              LANDLINE: {COMPANY_PROFILE.phone} • {COMPANY_PROFILE.websiteDisplay}
            </div>
          </div>
        </footer>
      </main>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectForConsultation={handleOpenContactWithProject}
      />
    </div>
  );
}
