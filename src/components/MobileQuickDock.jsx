import React from 'react';
import { Phone, MessageSquare, Calculator, ExternalLink } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/projects';

export default function MobileQuickDock({ onOpenQuote }) {
  return (
    <div 
      className="mobile-quick-dock"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: 'rgba(7, 9, 13, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-hairline)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px'
      }}
    >
      {/* Call Landline */}
      <a
        href={`tel:${COMPANY_PROFILE.phone.replace(/[^0-9+]/g, '')}`}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          padding: '8px 4px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '2px',
          color: '#ffffff',
          textDecoration: 'none',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.66rem',
          letterSpacing: '0.04em',
          touchAction: 'manipulation'
        }}
      >
        <Phone size={14} color="#e2b170" />
        <span>CALL OFFICE</span>
      </a>

      {/* Direct Mobile / Partner */}
      <a
        href={`tel:${COMPANY_PROFILE.mobile.replace(/[^0-9+]/g, '')}`}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          padding: '8px 4px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '2px',
          color: '#ffffff',
          textDecoration: 'none',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.66rem',
          letterSpacing: '0.04em',
          touchAction: 'manipulation'
        }}
      >
        <Phone size={14} color="#4ade80" />
        <span>PARTNER LINE</span>
      </a>

      {/* Request Quote / RFQ */}
      <button
        onClick={onOpenQuote}
        style={{
          flex: 1.3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '10px 8px',
          background: 'linear-gradient(135deg, #e2b170 0%, #b88640 100%)',
          border: 'none',
          borderRadius: '2px',
          color: '#050608',
          fontFamily: 'var(--font-display)',
          fontSize: '0.74rem',
          fontWeight: '800',
          letterSpacing: '0.05em',
          cursor: 'pointer',
          touchAction: 'manipulation'
        }}
      >
        <Calculator size={14} />
        <span>GET QUOTE</span>
      </button>

      {/* IndiaMART Official Storefront */}
      <a
        href={COMPANY_PROFILE.indiaMartUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          padding: '8px 4px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '2px',
          color: '#ffffff',
          textDecoration: 'none',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.66rem',
          letterSpacing: '0.04em',
          touchAction: 'manipulation'
        }}
      >
        <ExternalLink size={14} color="#e2b170" />
        <span>INDIAMART</span>
      </a>

      <style>{`
        @media (min-width: 961px) {
          .mobile-quick-dock { display: none !important; }
        }
      `}</style>
    </div>
  );
}
