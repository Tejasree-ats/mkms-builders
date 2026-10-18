import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  Layers, 
  ShieldCheck, 
  Send, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Sliders,
  Sparkles,
  Globe,
  ExternalLink
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/projects';

const TYPOLOGIES = [
  { id: 'residential', label: 'Residential Framing', baseMonths: 18, foundation: 'Bored Cast-in-Situ Piling' },
  { id: 'commercial', label: 'Commercial Building', baseMonths: 22, foundation: 'Heavy Raft & Diaphragm Wall' },
  { id: 'institutional', label: 'Institutional Campus', baseMonths: 20, foundation: 'Column-Beam Footing' },
  { id: 'specialized', label: 'Wind & Water Utility', baseMonths: 14, foundation: 'Heavy Pedestal & Anchors' },
];

export default function ConsultationSection({ prefilledProject = '' }) {
  const [selectedTypology, setSelectedTypology] = useState(TYPOLOGIES[0].id);
  const [areaSqFt, setAreaSqFt] = useState(65000);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Chennai (Nandanam / Kotturpuram / OMR / ECR)',
    notes: prefilledProject ? `Inquiry regarding similar scope to: ${prefilledProject}` : ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentTypology = TYPOLOGIES.find(t => t.id === selectedTypology) || TYPOLOGIES[0];
  const scaleMultiplier = Math.max(0.6, areaSqFt / 80000);
  const estimatedMonths = Math.round(currentTypology.baseMonths * Math.sqrt(scaleMultiplier));
  const estimatedSteelTons = Math.round((areaSqFt * 4.0) / 1000);
  const estimatedConcreteM3 = Math.round((areaSqFt * 0.35));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your Name and Contact Phone number.');
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#e2b170', '#ffffff', '#c49557', '#ffd700']
      });
    } catch {
      // safe fallback
    }

    setIsSubmitted(true);
  };

  return (
    <section 
      id="consultation"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: 'clamp(4rem, 8vw, 8rem) clamp(16px, 4vw, 36px)',
        maxWidth: '1360px',
        margin: '0 auto',
        overflowX: 'hidden'
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div className="blueprint-tag" style={{ marginBottom: '14px' }}>
          <Sparkles size={13} />
          <span>SECTION 05 • CONSULTATION & ENGAGEMENT</span>
        </div>
        <h2 style={{ fontSize: 'clamp(2.0rem, 4.5vw, 3.8rem)', color: '#ffffff', marginBottom: '14px', letterSpacing: '-0.02em' }}>
          Commission Your Project With <span className="text-gold-gradient">M.K.M.S. Builders</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '720px', margin: '0 auto', fontSize: '1.02rem', lineHeight: '1.68' }}>
          Real Estate Builders, Developers, Civil Contractors & Building Consultants. 
          Over 50 successful projects delivered across Chennai and Tamil Nadu under the leadership of Reyaj (Proprietor) & Er. A. Shajahan Sait.
        </p>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '24px',
          alignItems: 'start',
          maxWidth: '100%'
        }}
      >
        {/* LEFT COLUMN: Interactive Structural Calculator */}
        <div 
          className="editorial-panel"
          style={{
            borderRadius: '2px',
            padding: 'clamp(20px, 4vw, 36px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Sliders size={18} color="#e2b170" />
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', letterSpacing: '0.04em' }}>
              PROJECT SCOPE & TIMELINE ESTIMATOR
            </h3>
          </div>

          <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Select Project Typology
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '24px' }}>
            {TYPOLOGIES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTypology(t.id)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '2px',
                  border: selectedTypology === t.id ? '1px solid #e2b170' : '1px solid var(--border-hairline)',
                  background: selectedTypology === t.id ? 'rgba(226, 177, 112, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  color: selectedTypology === t.id ? '#ffffff' : 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  touchAction: 'manipulation',
                  minHeight: '44px'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Built-up Area Slider */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Planned Built-Up Area
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '800', color: '#e2b170' }}>
                {areaSqFt.toLocaleString()} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SQ. FT.</span>
              </span>
            </div>
            <div style={{ padding: '8px 0', touchAction: 'pan-x' }}>
              <input 
                type="range"
                min="5000"
                max="350000"
                step="5000"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#e2b170',
                  cursor: 'pointer',
                  height: '8px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  touchAction: 'manipulation'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              <span>5K SQ.FT</span>
              <span>150K SQ.FT</span>
              <span>350K+ SQ.FT</span>
            </div>
          </div>

          {/* Real-time Dynamic Metrics */}
          <div style={{ background: 'rgba(5, 6, 8, 0.85)', border: '1px solid var(--border-hairline)', borderRadius: '2px', padding: '18px', marginBottom: '20px' }}>
            <div className="editorial-mono" style={{ color: 'var(--gold-primary)', marginBottom: '12px' }}>
              ESTIMATED CIVIL ENGINEERING METRICS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>Timeline</div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff' }}>~{estimatedMonths} Months</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>Foundation</div>
                <div style={{ fontSize: '0.84rem', fontWeight: '600', color: '#ffffff' }}>{currentTypology.foundation}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>Fe550D Steel</div>
                <div style={{ fontSize: '1.02rem', fontWeight: '700', color: '#e2b170' }}>~{estimatedSteelTons.toLocaleString()} MT</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem' }}>Concrete Volume</div>
                <div style={{ fontSize: '1.02rem', fontWeight: '700', color: '#e2b170' }}>~{estimatedConcreteM3.toLocaleString()} m³</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            <ShieldCheck size={16} color="#e2b170" flexShrink={0} />
            <span>50+ Projects Track Record • Reyaj & Er. A. Shajahan Sait</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Direct Consultation Form */}
        <div
          className="editorial-panel"
          style={{
            borderRadius: '2px',
            padding: 'clamp(20px, 4vw, 36px)',
          }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <Send size={16} color="#e2b170" />
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                  SCHEDULE BUILDER BRIEFING
                </h3>
              </div>

              <div style={{ display: 'grid', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. K. Sundaram"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: '2px',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      touchAction: 'manipulation'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      CONTACT PHONE *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-hairline)',
                        borderRadius: '2px',
                        color: '#ffffff',
                        fontSize: '16px',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        touchAction: 'manipulation'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      placeholder="client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-hairline)',
                        borderRadius: '2px',
                        color: '#ffffff',
                        fontSize: '16px',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        touchAction: 'manipulation'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    SITE LOCATION IN CHENNAI / TAMIL NADU
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: '2px',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontFamily: 'var(--font-body)',
                      outline: 'none',
                      touchAction: 'manipulation'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    CONSTRUCTION SCOPE (FRAMING, UTILITIES, ROOFING)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your plot dimensions, residential / commercial requirements..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: '2px',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontFamily: 'var(--font-body)',
                      resize: 'vertical',
                      outline: 'none',
                      touchAction: 'manipulation'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-gold"
                style={{ width: '100%', padding: '14px', fontSize: '0.88rem' }}
              >
                <span>TRANSMIT CONSULTATION REQUEST</span>
                <Send size={15} />
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 8px', animation: 'fadeIn 0.4s ease' }}>
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(226, 177, 112, 0.15)',
                  border: '2px solid #e2b170',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#e2b170'
                }}
              >
                <CheckCircle size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '8px' }}>
                Consultation Request Logged
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Thank you, <strong>{formData.name}</strong>. Mr. Reyaj (Proprietor) and Er. A. Shajahan Sait at M.K.M.S. Builders will review your specifications for {formData.location}.
              </p>

              <div 
                style={{
                  background: 'rgba(226, 177, 112, 0.06)',
                  border: '1px solid rgba(226, 177, 112, 0.25)',
                  borderRadius: '2px',
                  padding: '14px',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  marginBottom: '20px'
                }}
              >
                <div style={{ color: '#e2b170', fontWeight: '700', marginBottom: '6px' }}>
                  DIRECT CHENNAI OFFICE CONTACTS:
                </div>
                <div style={{ color: '#ffffff', marginBottom: '4px' }}>
                  <strong>Landline:</strong> {COMPANY_PROFILE.phone}
                </div>
                <div style={{ color: '#ffffff', marginBottom: '4px' }}>
                  <strong>Mobile:</strong> {COMPANY_PROFILE.mobile}
                </div>
                <div style={{ color: '#ffffff', marginBottom: '4px' }}>
                  <strong>Website:</strong> <a href={COMPANY_PROFILE.website} target="_blank" rel="noopener noreferrer" style={{ color: '#e2b170' }}>{COMPANY_PROFILE.websiteDisplay}</a>
                </div>
                <div style={{ color: '#ffffff' }}>
                  <strong>Office:</strong> {COMPANY_PROFILE.address}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={`tel:${COMPANY_PROFILE.phone.replace(/[^0-9+]/g, '')}`}
                  className="btn-gold"
                  style={{ textDecoration: 'none', padding: '10px 18px', fontSize: '0.82rem' }}
                >
                  <Phone size={14} />
                  <span>CALL OFFICE</span>
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-outline"
                  style={{ padding: '10px 18px', fontSize: '0.82rem' }}
                >
                  NEW INQUIRY
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chennai Headquarters Institutional Card */}
      <div 
        style={{
          marginTop: '48px',
          padding: 'clamp(20px, 3.5vw, 32px)',
          background: 'rgba(10, 12, 16, 0.75)',
          border: '1px solid var(--border-hairline)',
          borderRadius: '2px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '20px',
          color: 'var(--text-muted)',
          fontSize: '0.82rem'
        }}
      >
        <div>
          <div style={{ color: '#ffffff', fontWeight: '700', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={15} color="#e2b170" flexShrink={0} /> CHENNAI REGISTERED OFFICE
          </div>
          <div>New #23 / Old #15, Chamiers Road</div>
          <div>(Pasumpon Muthuramalinga Thevar Road)</div>
          <div>Rathna Nagar, Nandanam, Chennai – 600035</div>
        </div>

        <div>
          <div style={{ color: '#ffffff', fontWeight: '700', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={15} color="#e2b170" flexShrink={0} /> COMMUNICATIONS
          </div>
          <div>Landline: {COMPANY_PROFILE.phone}</div>
          <div>Direct: {COMPANY_PROFILE.mobile}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <Globe size={13} color="#e2b170" />
            <a href={COMPANY_PROFILE.website} target="_blank" rel="noopener noreferrer" style={{ color: '#e2b170', textDecoration: 'none' }}>
              {COMPANY_PROFILE.websiteDisplay}
            </a>
          </div>
        </div>

        <div>
          <div style={{ color: '#ffffff', fontWeight: '700', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={15} color="#e2b170" flexShrink={0} /> PRINCIPALS
          </div>
          <div>Proprietor: Mr. Reyaj</div>
          <div>Managing Partner: Er. A. Shajahan Sait</div>
          <div>50+ Projects Across Tamil Nadu</div>
        </div>
      </div>
    </section>
  );
}
