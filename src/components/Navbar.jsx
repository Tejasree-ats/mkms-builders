import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Compass, PhoneCall, Menu, X, Phone, Globe } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { COMPANY_PROFILE } from '../data/projects';

export default function Navbar({ onOpenContact }) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [chennaiTime, setChennaiTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setChennaiTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleAudioToggle = () => {
    const active = audioEngine.toggle();
    setIsAudioActive(active);
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isScrolled ? '12px clamp(16px, 4vw, 36px)' : '18px clamp(16px, 4vw, 48px)',
          background: isScrolled ? 'rgba(5, 6, 8, 0.94)' : 'linear-gradient(to bottom, rgba(5, 6, 8, 0.85) 0%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-hairline)' : '1px solid transparent',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '100vw',
          overflowX: 'hidden'
        }}
      >
        {/* Brand Monogram & Title */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div 
            style={{
              width: '38px',
              height: '38px',
              border: '1px solid var(--gold-primary)',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(226, 177, 112, 0.08)',
              position: 'relative',
              flexShrink: 0
            }}
          >
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: '700', color: '#e2b170' }}>
              M
            </span>
            <span 
              style={{ 
                position: 'absolute', 
                top: '-3px', 
                right: '-3px', 
                width: '5px', 
                height: '5px', 
                background: '#e2b170' 
              }} 
            />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', fontWeight: '800', letterSpacing: '0.12em', color: '#ffffff' }}>
              M.K.M.S. BUILDERS
            </div>
            <div className="editorial-mono" style={{ color: 'var(--gold-primary)', fontSize: '0.62rem' }}>
              CIVIL CONTRACTORS • CHENNAI
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links (Hidden on screens < 960px) */}
        <nav 
          style={{ 
            alignItems: 'center', 
            gap: '28px' 
          }} 
          className="desktop-nav"
        >
          <button 
            onClick={() => scrollTo('hero')} 
            style={{ background: 'none', border: 'none', color: '#cfd4dc', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
          >
            THE MONOLITH
          </button>
          <button 
            onClick={() => scrollTo('mastery')} 
            style={{ background: 'none', border: 'none', color: '#cfd4dc', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
          >
            CIVIL MASTERY
          </button>
          <button 
            onClick={() => scrollTo('portfolio')} 
            style={{ background: 'none', border: 'none', color: '#cfd4dc', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
          >
            50+ WORKS
          </button>
          <button 
            onClick={() => scrollTo('codex')} 
            style={{ background: 'none', border: 'none', color: '#cfd4dc', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
          >
            CODEX
          </button>
        </nav>

        {/* Right Controls: Desktop Live Clock + Audio + Call CTA / Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Desktop Chennai IST Live Badge */}
          <div 
            className="desktop-clock"
            style={{
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '2px',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)'
            }}
          >
            <Compass size={13} color="#e2b170" />
            <span>CHENNAI {chennaiTime} IST</span>
          </div>

          {/* Audio Synthesizer Button */}
          <button
            onClick={handleAudioToggle}
            title={isAudioActive ? 'Mute Atmospheric Audio' : 'Enable Atmospheric Audio'}
            style={{
              background: isAudioActive ? 'rgba(226, 177, 112, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: isAudioActive ? '1px solid var(--gold-primary)' : '1px solid var(--border-hairline)',
              color: isAudioActive ? 'var(--gold-bright)' : '#ffffff',
              padding: '8px 12px',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              transition: 'all 0.25s ease',
              touchAction: 'manipulation',
              minHeight: '40px'
            }}
          >
            {isAudioActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="audio-label">{isAudioActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Desktop Direct Commission CTA */}
          <button
            onClick={onOpenContact}
            className="btn-gold desktop-cta"
            style={{
              padding: '8px 18px',
              fontSize: '0.78rem',
              minHeight: '40px'
            }}
          >
            <PhoneCall size={13} />
            <span>COMMISSION</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-hairline)',
              color: '#ffffff',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px',
              cursor: 'pointer',
              touchAction: 'manipulation'
            }}
          >
            {mobileMenuOpen ? <X size={20} color="#e2b170" /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: 'rgba(5, 6, 8, 0.98)',
            backdropFilter: 'blur(25px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '96px 24px 32px',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="editorial-mono" style={{ color: 'var(--gold-primary)', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '10px' }}>
              NAVIGATION INDEX
            </div>

            <button
              onClick={() => scrollTo('hero')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: '800',
                textAlign: 'left',
                cursor: 'pointer',
                padding: '8px 0'
              }}
            >
              01 // THE MONOLITH
            </button>

            <button
              onClick={() => scrollTo('mastery')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: '800',
                textAlign: 'left',
                cursor: 'pointer',
                padding: '8px 0'
              }}
            >
              02 // CIVIL MASTERY
            </button>

            <button
              onClick={() => scrollTo('portfolio')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: '800',
                textAlign: 'left',
                cursor: 'pointer',
                padding: '8px 0'
              }}
            >
              03 // 50+ WORKS
            </button>

            <button
              onClick={() => scrollTo('codex')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: '800',
                textAlign: 'left',
                cursor: 'pointer',
                padding: '8px 0'
              }}
            >
              04 // THE CODEX
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="btn-gold"
              style={{
                marginTop: '12px',
                width: '100%',
                padding: '16px',
                fontSize: '0.92rem'
              }}
            >
              <PhoneCall size={16} />
              <span>COMMISSION A PROJECT</span>
            </button>
          </div>

          {/* Mobile Drawer Bottom Info */}
          <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '20px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>
              DIRECT CHENNAI HOTLINES:
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={`tel:${COMPANY_PROFILE.phone.replace(/[^0-9+]/g, '')}`}
                style={{
                  color: 'var(--gold-primary)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Phone size={14} /> {COMPANY_PROFILE.phone}
              </a>
              <span style={{ color: 'var(--border-hairline)' }}>|</span>
              <a
                href={`tel:${COMPANY_PROFILE.mobile.replace(/[^0-9+]/g, '')}`}
                style={{
                  color: 'var(--gold-primary)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Phone size={14} /> {COMPANY_PROFILE.mobile}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Media Query Styles for Navbar */}
      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .desktop-clock { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-menu-toggle { display: flex !important; }
        }
        @media (min-width: 961px) {
          .desktop-nav { display: flex !important; }
          .desktop-clock { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .mobile-menu-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
}
