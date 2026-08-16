import { useState, useEffect, useRef } from 'react';

export default function ResumeModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="resume-modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Resume viewer"
    >
      <div className="resume-modal-card" ref={modalRef}>
        <div className="resume-modal-header">
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
              My Resume: <span style={{ color: 'var(--accent)' }}>On Paper!</span>
            </h2>
          </div>
          <button
            className="resume-modal-close"
            onClick={onClose}
            aria-label="Close resume modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="resume-modal-body">
          <iframe
            src="/resume.pdf"
            title="Aizaz Noor Resume"
            width="100%"
            height="100%"
            style={{ border: 'none', borderRadius: '12px' }}
          />
        </div>
        <div className="resume-modal-footer">
          <a
            href="/resume.pdf"
            download="Aizaz_Noor_Resume.pdf"
            className="btn btn-primary"
            style={{ fontSize: '0.85rem', padding: '10px 24px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
