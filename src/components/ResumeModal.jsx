import { useEffect, useRef } from 'react';

export default function ResumeModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="resume-modal-dialog"
      aria-labelledby="resume-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="resume-modal-card">
        <div className="resume-modal-header">
          <h2 id="resume-dialog-title">Resume</h2>
          <button ref={closeRef} type="button" className="resume-modal-close" onClick={onClose} aria-label="Close resume viewer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="resume-modal-body">
          <iframe src="/resume.pdf" title="Aizaz Noor resume PDF" width="100%" height="100%" />
        </div>
        <div className="resume-modal-footer">
          <a href="/resume.pdf" download="Aizaz_Noor_Resume.pdf" className="btn btn-primary">Download PDF</a>
        </div>
      </div>
    </dialog>
  );
}
