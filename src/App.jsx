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
  FileText,
  Briefcase,
  PhoneCall,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import ArchitecturalCanvas from './components/ArchitecturalCanvas';
import Navbar from './components/Navbar';
import ServicesSection from './components/ServicesSection';
import ProjectModal from './components/ProjectModal';
import ConsultationSection from './components/ConsultationSection';
import MobileQuickDock from './components/MobileQuickDock';
import AnimatedBrandTitle from './components/AnimatedBrandTitle';
import { PROJECTS, ENGINEERING_PHASES, COMPANY_PROFILE, BUSINESS_SERVICES } from './data/projects';

gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_FILTERS = [
  { id: 'all', label: 'All Works' },
  { id: 'Recently Completed', label: 'Recently Completed' },
  { id: 'Under Progress', label: 'Under Progress' },
  { id: 'Housing', label: 'Housing Projects' },
  { id: 'Wind & Utilities', label: 'Wind & Utilities' }
];

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroPinProgress, setHeroPinProgress] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [consultationPrefill, setConsultationPrefill] = useState('');
  
  // Interactive Filter & Mobile Accordion State
  const [activeFilter, setActiveFilter] = useState('all');
  const [mobileProjectDrawerId, setMobileProjectDrawerId] = useState(null);

  const heroContainerRef = useRef(null);
  const heroViewportRef = useRef(null);
  const initialContentRef = useRef(null);
  const transformedContentRef = useRef(null);

  // Global scroll tracker
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

  // GSAP PINNED HERO TIMELINE
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set(initialContentRef.current, { opacity: 1, y: 0 });
        gsap.set(transformedContentRef.current, { opacity: 1, y: 0, position: 'relative', top: 'auto', transform: 'none' });
        return;
      }

      gsap.from('.hero-entry-item', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.1
      });

      const pinEndDistance = isMobile ? '+=100%' : '+=140%';

      const heroTL = gsap.timeline({
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: 'top top',
          end: pinEndDistance,
          pin: heroViewportRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            setHeroPinProgress(self.progress);
          }
        }
      });

      heroTL.to(initialContentRef.current, {
        y: -70,
        opacity: 0,
        filter: 'blur(8px)',
        scale: 0.96,
        duration: 0.4,
        ease: 'power2.inOut',
        pointerEvents: 'none'
      }, 0);

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

      heroTL.to('.hero-scroll-progress-fill', {
        scaleX: 1,
        ease: 'none',
        duration: 1.0
      }, 0);

      gsap.from('.trust-card', {
        scrollTrigger: {
          trigger: '#trust-bar',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
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

  // Filter projects dynamically
  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'Recently Completed') return proj.tag === 'Recently Completed';
    if (activeFilter === 'Under Progress') return proj.tag === 'Under Progress';
    if (activeFilter === 'Housing') return proj.category === 'Housing';
    if (activeFilter === 'Wind & Utilities') return proj.category === 'Wind & Utilities';
    return true;
  });

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-deep)', maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* Background Ambience */}
      <div className="film-grain" />
      <div className="ambient-glow-top" />
      <div className="ambient-glow-accent" style={{ top: '35%', right: '-100px' }} />
      <div className="ambient-glow-accent" style={{ top: '70%', left: '-100px' }} />

      {/* FIXED 3D CANVAS */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none'
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

      {/* MAIN BUSINESS CONTENT STACK */}
      <main style={{ position: 'relative', zIndex: 5, maxWidth: '100vw', overflowX: 'hidden', paddingBottom: '70px' }}>

        {/* ===================================================================
            SECTION 1: PINNED HERO SCROLL SEQUENCE
            =================================================================== */}
        <div 
          id="hero-scroll-container"
          ref={heroContainerRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '100vw',
            minHeight: '200vh'
          }}
        >
          <div
            id="hero-pin-viewport"
            ref={heroViewportRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '100vw',
              minHeight: '100vh',
              height: '100dvh',
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
                maxWidth: '680px',
                zIndex: 10,
                pointerEvents: heroPinProgress > 0.35 ? 'none' : 'auto'
              }}
            >
              {/* Eyebrow Credentials Badge */}
              <div 
                className="hero-entry-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  flexWrap: 'wrap'
                }}
              >
                <div className="blueprint-tag">
                  <span className="status-beacon" />
                  <span>EST. 1980s • PWD & CPWD EMPANELLED CONTRACTORS</span>
                </div>
                <span className="editorial-mono" style={{ color: 'var(--gold-primary)', fontSize: '0.66rem' }}>
                  IS 456 & IS 800 STANDARDS
                </span>
              </div>

              {/* REFINED ANIMATED BRAND TITLE */}
              <div className="hero-entry-item" style={{ marginBottom: '6px' }}>
                <AnimatedBrandTitle />
              </div>

              {/* Proportioned Architectural Main Headline */}
              <h1 
                className="hero-entry-item"
                style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.15rem)',
                  lineHeight: '1.24',
                  marginBottom: '14px',
                  fontWeight: '700',
                  color: '#ffffff',
                  letterSpacing: '-0.02em'
                }}
              >
                Master Civil Engineering & <span className="text-gold-gradient">Turnkey Construction</span>
              </h1>

              {/* Concise, Professional Description */}
              <p 
                className="hero-entry-item"
                style={{
                  fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
                  color: 'var(--text-bright)',
                  lineHeight: '1.65',
                  maxWidth: '580px',
                  marginBottom: '24px',
                  textShadow: '0 2px 12px rgba(0,0,0,0.85)'
                }}
              >
                Civil Engineering Contractors, Real Estate Builders, Developers & Building Consultants. 
                Guided directly by <strong>Er. A. Shajahan Sait (Chartered Engineer)</strong> and <strong>Mr. Reyaj (Proprietor)</strong> with over 50 delivered developments across Tamil Nadu.
              </p>

              {/* Clean Action Buttons */}
              <div className="hero-entry-item" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <button
                  onClick={() => handleOpenContactWithProject('')}
                  className="btn-gold"
                >
                  <span>REQUEST TENDER QUOTATION</span>
                  <ChevronRight size={15} />
                </button>

                <a
                  href="#services"
                  className="btn-outline"
                >
                  <Briefcase size={14} />
                  <span>SERVICES DIRECTORY</span>
                </a>
              </div>

              {/* Geodetic Vitals Stamp */}
              <div 
                className="hero-entry-item"
                style={{
                  marginTop: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-dim)',
                  letterSpacing: '0.08em'
                }}
              >
                <span>CHAMIERS ROAD, NANDANAM</span>
                <span>•</span>
                <span>LANDLINE: +91 44 2435 2904</span>
                <span>•</span>
                <span>PARTNERSHIP FIRM</span>
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
                maxWidth: '680px',
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
                  marginBottom: '12px',
                  flexWrap: 'wrap'
                }}
              >
                <div className="blueprint-tag" style={{ background: 'rgba(226, 177, 112, 0.12)', borderColor: 'var(--gold-primary)' }}>
                  <Award size={13} />
                  <span>VERIFIED TRACK RECORD • 50+ EXECUTED CONTRACTS</span>
                </div>
                <a 
                  href={COMPANY_PROFILE.indiaMartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-mono" 
                  style={{ color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                >
                  <span>INDIAMART PROFILE</span>
                  <ExternalLink size={11} />
                </a>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.65rem, 3.2vw, 2.6rem)',
                  lineHeight: '1.2',
                  marginBottom: '14px',
                  fontWeight: '800'
                }}
              >
                <div className="text-gold-gradient">50+ Monumental Contracts Delivered</div>
                <div style={{ color: '#ffffff', fontSize: '0.85em', fontWeight: '600', marginTop: '4px' }}>Across Government, Industry & Housing</div>
              </h2>

              <p 
                style={{
                  fontSize: 'clamp(0.88rem, 1.35vw, 1.0rem)',
                  color: 'var(--text-bright)',
                  lineHeight: '1.65',
                  maxWidth: '580px',
                  marginBottom: '20px'
                }}
              >
                From major institutional campuses like <strong>Utility Public School (Kotturpuram)</strong> to large industrial complexes like <strong>Dharani Sugars Limited</strong>, wind turbine foundations, and Southern Railway works.
              </p>

              {/* Verified Project Chips */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '10px', marginBottom: '20px' }}>
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
                      Kotturpuram, Chennai (Completed)
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
                      Dharani Sugars Limited
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
                  <span>BROWSE COMPLETED PORTFOLIO</span>
                  <ChevronRight size={14} />
                </a>

                <a
                  href="#services"
                  className="btn-outline"
                >
                  <span>ALL 6 SERVICE VERTICALS</span>
                </a>
              </div>
            </div>

            {/* PROGRESS BAR */}
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
                  OVERVIEW
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
                  const el = document.getElementById('trust-bar');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>COMPANY VITALS</span>
                <ArrowDown size={12} style={{ animation: 'bounce 2s infinite' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            SECTION 2: CORPORATE TRUST & CREDENTIALS BAR (BUSINESS ARCHITECTURE)
            =================================================================== */}
        <section 
          id="trust-bar"
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '40px clamp(16px, 4vw, 64px)',
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            borderBottom: '1px solid var(--border-hairline)'
          }}
        >
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '16px'
            }}
          >
            <div className="editorial-panel trust-card" style={{ padding: '20px 22px' }}>
              <div className="editorial-mono" style={{ color: 'var(--gold-muted)', marginBottom: '6px' }}>ESTABLISHED</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>40+ Years</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Continuous operations in civil contracting and real estate development since the 1980s.</div>
            </div>

            <div className="editorial-panel trust-card" style={{ padding: '20px 22px' }}>
              <div className="editorial-mono" style={{ color: 'var(--gold-muted)', marginBottom: '6px' }}>GOVT. EMPANELMENT</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--gold-primary)', marginBottom: '4px' }}>PWD & CPWD</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Empanelled with Public Works Dept, Central PWD, and Southern Railway Civil Division.</div>
            </div>

            <div className="editorial-panel trust-card" style={{ padding: '20px 22px' }}>
              <div className="editorial-mono" style={{ color: 'var(--gold-muted)', marginBottom: '6px' }}>TECHNICAL LEADERSHIP</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>Er. A. Shajahan Sait</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Managing Partner, Chartered Civil Engineer & Fellow Member of Builders Association of India (BAI).</div>
            </div>

            <div className="editorial-panel trust-card" style={{ padding: '20px 22px' }}>
              <div className="editorial-mono" style={{ color: 'var(--gold-muted)', marginBottom: '6px' }}>PROJECT SCALE</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>50+ Completed</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Executed across residential housing, commercial spaces, schools, industrial townships & wind works.</div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: CORE BUSINESS SERVICES (FROM INDIAMART CATALOG)
            =================================================================== */}
        <ServicesSection onSelectServiceForQuote={(serviceTitle) => handleOpenContactWithProject(serviceTitle)} />

        {/* ===================================================================
            SECTION 4: MONUMENTAL PORTFOLIO (INTERACTIVE WITH INDIAMART DATA)
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
          {/* Header & IndiaMART Link */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', gap: '20px' }}>
            <div>
              <div className="blueprint-tag" style={{ marginBottom: '12px' }}>
                <Award size={13} />
                <span>PROJECT CATALOG • INDIAMART VERIFIED</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.0rem, 4.5vw, 3.8rem)', color: '#ffffff', letterSpacing: '-0.02em' }}>
                Major Projects & <span className="text-gold-gradient">Monumental Works</span>
              </h2>
            </div>
            
            <a
              href={COMPANY_PROFILE.indiaMartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ fontSize: '0.78rem', minHeight: '44px', padding: '10px 18px' }}
            >
              <span>VIEW FULL INDIAMART STOREFRONT</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* INTERACTIVE CATEGORY FILTER TABS (Mobile & Desktop) */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '16px',
              marginBottom: '36px',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none'
            }}
          >
            {PORTFOLIO_FILTERS.map((filter) => {
              const isSelected = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '2px',
                    background: isSelected ? 'var(--gold-primary)' : 'rgba(12, 15, 22, 0.85)',
                    border: isSelected ? '1px solid var(--gold-bright)' : '1px solid var(--border-hairline)',
                    color: isSelected ? '#050608' : '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: isSelected ? '800' : '600',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    touchAction: 'manipulation',
                    flexShrink: 0
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* PROJECT CARDS SPREAD (Interactive Cards with In-Card Quick Drawers) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '24px'
            }}
          >
            {filteredProjects.map((project) => {
              const isMobileDrawerOpen = mobileProjectDrawerId === project.id;

              return (
                <div
                  key={project.id}
                  className="editorial-panel"
                  style={{
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px'
                  }}
                >
                  <div>
                    {/* Image Preview with Status Badge */}
                    <div style={{ position: 'relative', height: '230px', overflow: 'hidden', borderRadius: '2px', marginBottom: '18px' }}>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 12, 16, 0.9) 0%, transparent 60%)' }} />

                      <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                        <span className="blueprint-tag" style={{ background: 'rgba(5, 6, 8, 0.85)' }}>
                          {project.tag}
                        </span>
                      </div>

                      <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                        <span className="blueprint-tag" style={{ color: '#ffffff', background: 'rgba(5, 6, 8, 0.9)' }}>
                          {project.area}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                      <span className="editorial-mono" style={{ color: 'var(--gold-primary)' }}>
                        {project.category.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: project.status === 'Completed' ? '#4ade80' : '#e2b170', fontFamily: 'var(--font-mono)' }}>
                        ● {project.status.toUpperCase()}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.45rem', color: '#ffffff', marginBottom: '10px', lineHeight: '1.2' }}>
                      {project.title}
                    </h3>

                    <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                      CLIENT: {project.client}
                    </div>

                    <p style={{ color: 'var(--text-bright)', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '18px' }}>
                      {project.description}
                    </p>

                    {/* Quick Expandable Drawer on Mobile / Accordion view */}
                    {isMobileDrawerOpen && (
                      <div 
                        style={{
                          background: 'rgba(5, 6, 8, 0.85)',
                          border: '1px solid var(--border-hairline)',
                          padding: '16px',
                          marginBottom: '18px',
                          animation: 'fadeIn 0.2s ease'
                        }}
                      >
                        <div className="editorial-mono" style={{ color: 'var(--gold-primary)', marginBottom: '10px' }}>
                          TECHNICAL PARAMETERS:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {project.specs.map((spec, sidx) => (
                            <div key={sidx} style={{ fontSize: '0.78rem' }}>
                              <span style={{ color: 'var(--text-dim)' }}>{spec.label}: </span>
                              <span style={{ color: '#ffffff', fontWeight: '600' }}>{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Controls */}
                  <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setMobileProjectDrawerId(isMobileDrawerOpen ? null : project.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--gold-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 0',
                        touchAction: 'manipulation'
                      }}
                    >
                      {isMobileDrawerOpen ? (
                        <><span>HIDE SPECS</span> <ChevronUp size={14} /></>
                      ) : (
                        <><span>QUICK SPECS</span> <ChevronDown size={14} /></>
                      )}
                    </button>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn-outline"
                      style={{ padding: '8px 16px', fontSize: '0.74rem', minHeight: '38px' }}
                    >
                      <span>FULL DOSSIER</span>
                      <Maximize2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: THE ENGINEERING CODEX (4 STAGES)
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
              <span>QUALITY CONTROL & PROTOCOLS</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.0rem, 4.5vw, 3.8rem)', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              4 Stages of <span className="text-gold-gradient">Execution Rigor</span>
            </h2>
            <p style={{ color: 'var(--text-bright)', fontSize: '1.02rem', lineHeight: '1.68' }}>
              From initial geotechnical borehole core extraction through to certified turnkey commissioning conforming to IS 456 & IS 800 standards.
            </p>
          </div>

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
            SECTION 6: ESTIMATION & FORMAL RFQ PORTAL
            =================================================================== */}
        <ConsultationSection prefilledProject={consultationPrefill} />

        {/* ===================================================================
            CORPORATE COLOPHON & FOOTER WITH INDIAMART VERIFICATION
            =================================================================== */}
        <footer
          style={{
            borderTop: '1px solid var(--border-hairline)',
            padding: '48px clamp(16px, 4vw, 64px) 36px',
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
            <div style={{ color: '#ffffff', fontWeight: '800', letterSpacing: '0.12em', fontSize: '0.94rem', marginBottom: '4px' }}>
              M.K.M.S. BUILDERS (PARTNERSHIP FIRM)
            </div>
            <div>CIVIL CONTRACTORS • REAL ESTATE BUILDERS • BUILDING CONSULTANTS</div>
            <div style={{ color: 'var(--gold-primary)', marginTop: '4px' }}>
              LEADERSHIP: MR. REYAJ (PROPRIETOR) • ER. A. SHAJAHAN SAIT (CHARTERED ENGINEER)
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <div>{COMPANY_PROFILE.address}</div>
            <div style={{ color: '#ffffff', marginTop: '4px' }}>
              LANDLINE: {COMPANY_PROFILE.phone} • MOBILE: {COMPANY_PROFILE.mobile}
            </div>
            <div style={{ marginTop: '4px' }}>
              <a 
                href={COMPANY_PROFILE.indiaMartUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--gold-primary)', textDecoration: 'none' }}
              >
                VERIFIED INDIAMART STOREFRONT ↗
              </a>
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

      {/* Mobile Sticky Quick Action Dock (Call, Quote, IndiaMART) */}
      <MobileQuickDock onOpenQuote={() => handleOpenContactWithProject('General Contracting / Tender Scope')} />
    </div>
  );
}
