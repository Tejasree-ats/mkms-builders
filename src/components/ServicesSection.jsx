import React, { useState } from 'react';
import { 
  Building, 
  GraduationCap, 
  Factory, 
  Compass, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BUSINESS_SERVICES } from '../data/projects';

const ICON_MAP = {
  Building: Building,
  GraduationCap: GraduationCap,
  Factory: Factory,
  Compass: Compass,
  Layers: Layers,
  CheckCircle2: CheckCircle2
};

export default function ServicesSection({ onSelectServiceForQuote }) {
  const [activeServiceId, setActiveServiceId] = useState(BUSINESS_SERVICES[0].id);
  const [mobileExpandedId, setMobileExpandedId] = useState(BUSINESS_SERVICES[0].id);

  const activeService = BUSINESS_SERVICES.find(s => s.id === activeServiceId) || BUSINESS_SERVICES[0];

  return (
    <section 
      id="services"
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '32px', alignItems: 'end', marginBottom: '48px', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '28px' }}>
        <div>
          <div className="blueprint-tag" style={{ marginBottom: '14px' }}>
            <Layers size={13} />
            <span>BUSINESS OFFERINGS • 40+ YEARS EXPERTISE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.0rem, 4.5vw, 3.8rem)', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1.08' }}>
            Comprehensive Civil & <br />
            <span className="text-gold-gradient">Contracting Capabilities</span>
          </h2>
        </div>
        <div>
          <p style={{ color: 'var(--text-bright)', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '14px' }}>
            As detailed in our verified IndiaMART business profile, M.K.M.S. Builders executes residential housing complexes, major educational and industrial buildings, high-torque wind turbine foundations, and municipal water supply systems.
          </p>
          <div className="editorial-mono" style={{ color: 'var(--gold-primary)', fontSize: '0.72rem' }}>
            EMPANELLED: PWD TAMIL NADU • CPWD • SOUTHERN RAILWAY CIVIL DIVISION
          </div>
        </div>
      </div>

      {/* DESKTOP & TABLET TWO-COLUMN INTERACTIVE VERTICAL BROWSER */}
      <div 
        className="services-desktop-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1.6fr',
          gap: '32px',
          alignItems: 'stretch'
        }}
      >
        {/* Left Column: Interactive Service Selectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {BUSINESS_SERVICES.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] || Building;
            const isActive = activeServiceId === service.id;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveServiceId(service.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 20px',
                  background: isActive ? 'rgba(226, 177, 112, 0.14)' : 'rgba(12, 15, 22, 0.75)',
                  border: isActive ? '1px solid var(--gold-primary)' : '1px solid var(--border-hairline)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s ease',
                  touchAction: 'manipulation'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div 
                    style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '2px', 
                      background: isActive ? 'rgba(226, 177, 112, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-hairline)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? 'var(--gold-bright)' : '#ffffff'
                    }}
                  >
                    <IconComponent size={18} />
                  </div>
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.98rem' }}>
                      {service.title}
                    </div>
                    <div className="editorial-mono" style={{ color: isActive ? 'var(--gold-primary)' : 'var(--text-dim)', fontSize: '0.66rem' }}>
                      {service.badge}
                    </div>
                  </div>
                </div>

                <div style={{ color: isActive ? 'var(--gold-primary)' : 'var(--text-dim)' }}>
                  <ArrowRight size={16} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Architectural Service Dossier */}
        <div 
          className="editorial-panel"
          style={{
            padding: 'clamp(28px, 4vw, 44px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div className="blueprint-tag">
                <span>SERVICE SPECIFICATION // {activeService.badge}</span>
              </div>
              <span className="editorial-mono" style={{ color: 'var(--gold-primary)' }}>
                IS 456 & IS 800 STANDARDS
              </span>
            </div>

            <h3 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: '#ffffff', marginBottom: '16px' }}>
              {activeService.title}
            </h3>

            <p style={{ color: 'var(--text-bright)', fontSize: '1.05rem', lineHeight: '1.75', marginBottom: '28px' }}>
              {activeService.description}
            </p>

            <div className="editorial-mono" style={{ color: 'var(--text-dim)', marginBottom: '14px' }}>
              CORE TECHNICAL DELIVERABLES & CAPABILITIES:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {activeService.keyPoints.map((point, i) => (
                <div 
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    background: 'rgba(5, 6, 8, 0.6)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '2px',
                    color: '#ffffff',
                    fontSize: '0.86rem'
                  }}
                >
                  <CheckCircle2 size={15} color="#e2b170" flexShrink={0} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-hairline)', paddingTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              <ShieldCheck size={16} color="#e2b170" />
              <span>Supervised by Er. A. Shajahan Sait (Chartered Engineer)</span>
            </div>

            <button
              onClick={() => onSelectServiceForQuote(activeService.title)}
              className="btn-gold"
              style={{ padding: '12px 24px', fontSize: '0.82rem' }}
            >
              <span>INQUIRE FOR THIS VERTICAL</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE ACCORDION CARD VIEW (High Touch Interactivity on Mobile) */}
      <div 
        className="services-mobile-layout"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {BUSINESS_SERVICES.map((service) => {
          const IconComponent = ICON_MAP[service.icon] || Building;
          const isExpanded = mobileExpandedId === service.id;

          return (
            <div
              key={service.id}
              className="editorial-panel"
              style={{
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              <button
                type="button"
                onClick={() => setMobileExpandedId(isExpanded ? null : service.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 18px',
                  background: isExpanded ? 'rgba(226, 177, 112, 0.12)' : 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  touchAction: 'manipulation'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IconComponent size={20} color="#e2b170" />
                  <div>
                    <div style={{ fontSize: '0.96rem', fontWeight: '700' }}>{service.title}</div>
                    <div className="editorial-mono" style={{ color: 'var(--gold-primary)', fontSize: '0.64rem' }}>{service.badge}</div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={18} color="#e2b170" /> : <ChevronDown size={18} color="var(--text-dim)" />}
              </button>

              {isExpanded && (
                <div style={{ padding: '18px', borderTop: '1px solid var(--border-hairline)', background: 'rgba(5, 6, 8, 0.7)' }}>
                  <p style={{ color: 'var(--text-bright)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '16px' }}>
                    {service.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                    {service.keyPoints.map((point, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#ffffff' }}>
                        <CheckCircle2 size={14} color="#e2b170" flexShrink={0} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="btn-gold"
                    style={{ width: '100%', padding: '12px', fontSize: '0.82rem' }}
                  >
                    <span>GET QUOTATION FOR {service.title}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .services-desktop-layout { display: none !important; }
          .services-mobile-layout { display: flex !important; }
        }
        @media (min-width: 961px) {
          .services-desktop-layout { display: grid !important; }
          .services-mobile-layout { display: none !important; }
        }
      `}</style>
    </section>
  );
}
