import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Maximize2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, onClose, onSelectForConsultation }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(5, 6, 8, 0.94)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 24px)',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={onClose}
    >
      <div
        className="editorial-panel"
        style={{
          width: '100%',
          maxWidth: '880px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '2px',
          padding: '0',
          position: 'relative',
          color: '#ffffff',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(226, 177, 112, 0.08)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project preview"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '42px',
            height: '42px',
            borderRadius: '2px',
            background: 'rgba(5, 6, 8, 0.85)',
            border: '1px solid var(--border-hairline)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            touchAction: 'manipulation'
          }}
        >
          <X size={18} />
        </button>

        {/* Project Image Banner */}
        <div style={{ height: 'clamp(220px, 32vh, 360px)', position: 'relative', overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10, 12, 16, 0.95) 5%, rgba(10, 12, 16, 0.3) 60%, rgba(10, 12, 16, 0.7) 100%)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: 'clamp(16px, 4vw, 32px)',
              right: 'clamp(16px, 4vw, 32px)'
            }}
          >
            <div className="blueprint-tag" style={{ marginBottom: '8px' }}>
              {project.category}
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)', color: '#ffffff', marginBottom: '8px', lineHeight: '1.15' }}>
              {project.title}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={14} color="#e2b170" /> {project.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={14} color="#e2b170" /> {project.year}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Maximize2 size={14} color="#e2b170" /> {project.area}
              </span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
          <div className="editorial-mono" style={{ color: 'var(--gold-primary)', marginBottom: '8px' }}>
            ARCHITECTURAL & CIVIL ENGINEERING PROFILE
          </div>
          <p style={{ color: 'var(--text-bright)', fontSize: '0.98rem', lineHeight: '1.75', marginBottom: '28px' }}>
            {project.description}
          </p>

          {/* Specifications Grid */}
          <div className="editorial-mono" style={{ color: 'var(--text-dim)', marginBottom: '12px' }}>
            TECHNICAL PARAMETERS
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '12px',
              marginBottom: '32px'
            }}
          >
            {project.specs.map((spec, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '2px',
                  padding: '14px'
                }}
              >
                <div style={{ color: 'var(--text-dim)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  {spec.label}
                </div>
                <div style={{ color: '#f8fafc', fontWeight: '600', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={13} color="#e2b170" flexShrink={0} /> {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-hairline)', paddingTop: '20px' }}>
            <button
              onClick={onClose}
              className="btn-outline"
              style={{ minHeight: '44px', padding: '10px 22px' }}
            >
              CLOSE PREVIEW
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectForConsultation(project.title);
              }}
              className="btn-gold"
              style={{ minHeight: '44px', padding: '10px 22px' }}
            >
              <span>INQUIRE ABOUT SCOPE</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
