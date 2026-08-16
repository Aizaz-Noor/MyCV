import React, { useState } from 'react';
import MagneticButton from '../components/MagneticButton';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name } = e.target;
    setSubmitError(null);
    setErrors(prev => {
      if (!prev[name]) return prev;
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Inject access_key from env or default fallback
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "e7f3a8dd-fb55-4527-9641-6b23afd91138";
    formData.set('access_key', accessKey);
    
    const newErrors = {};
    const emailStr = formData.get('email');
    if (!formData.get('name')) newErrors.name = 'Required';
    
    if (!emailStr) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.get('subject')) newErrors.subject = 'Required';
    if (!formData.get('message')) newErrors.message = 'Required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);
    
    try {
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: 'POST',
        body: json,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setSubmitError("Failed to deliver message. Please reach out directly via email.");
      }
    } catch (error) {
      setSubmitError("Network error. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="section-container" id="contact">
      <div className="section-content">
        
        <div className="section-header-centered" style={{ marginBottom: '4rem' }}>
          <h2 className="heading-lg accent-underline" style={{ marginBottom: '1.5rem' }}>
            Get In Touch: <span className="g-text">Ask Me Anything</span>
          </h2>

          <p className="text-body" style={{ maxWidth: '420px', marginBottom: '3rem' }}>
            Open to software engineering roles, internships, backend, CLI, or AI-adjacent work.
          </p>

          <div style={{ marginBottom: '2rem', maxWidth: '600px', width: '100%' }}>
            <h3 style={{
              fontSize: '1rem',
              color: 'var(--text-1)',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '0.5rem',
              display: 'inline-block'
            }}>
              What I'm Building Toward
            </h3>
            <ul style={{
              listStyleType: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              color: 'var(--text-1)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              textAlign: 'left'
            }}>
              <li><span style={{ color: 'var(--accent)', marginRight: '8px' }}>▹</span>Strengthening my foundation in DevOps, cloud infrastructure, and CI/CD practices.</li>
              <li><span style={{ color: 'var(--accent)', marginRight: '8px' }}>▹</span>Exploring AI automation, intelligent workflows, and agent-based applications.</li>
              <li><span style={{ color: 'var(--accent)', marginRight: '8px' }}>▹</span>Building scalable, reliable, and maintainable software that solves real-world problems.</li>
            </ul>
          </div>
        </div>

        {/* 2-Panel Layout Unified Card */}
        <div className="contact-unified-card">
          
          {/* Left Panel: Info Cards */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
            
            {/* Email Box */}
            <a href="mailto:aizaznoorkhuwaja@gmail.com" style={{ textDecoration: 'none' }}>
              <div className="contact-info-item">
                <div className="contact-info-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '2px' }}>Email</span>
                  <span className="text-link contact-info-text">aizaznoorkhuwaja@gmail.com</span>
                </div>
              </div>
            </a>
            
            {/* Location Box */}
            <a href="https://maps.google.com/?q=Lahore,Pakistan" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div className="contact-info-item">
                <div className="contact-info-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '2px' }}>Location</span>
                  <span className="contact-info-text">Lahore, Pakistan</span>
                </div>
              </div>
            </a>
            
            {/* LinkedIn Box */}
            <a href="https://linkedin.com/in/aizaz-noor" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div className="contact-info-item">
                <div className="contact-info-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '2px' }}>LinkedIn</span>
                  <span className="text-link contact-info-text">linkedin.com/in/aizaz-noor</span>
                </div>
              </div>
            </a>


          </div>

          {/* Right Panel: Formspree Form */}
          <div style={{ flex: '1 1 400px' }}>
            <form 
              action="https://api.web3forms.com/submit" 
              method="POST"
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <input type="hidden" name="access_key" value="e7f3a8dd-fb55-4527-9641-6b23afd91138" />
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 150px' }}>
                  <div className={`floating-input-group ${errors.name ? 'error' : ''}`}>
                    <input type="text" id="name" name="name" placeholder=" " maxLength="100" onChange={handleChange} />
                    <label htmlFor="name">Name</label>
                  </div>
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>
                
                <div style={{ flex: '1 1 150px' }}>
                  <div className={`floating-input-group ${errors.email ? 'error' : ''}`}>
                    <input type="email" id="email" name="email" placeholder=" " maxLength="255" onChange={handleChange} />
                    <label htmlFor="email">Email</label>
                  </div>
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>
              </div>

              <div>
                <div className={`floating-input-group ${errors.subject ? 'error' : ''}`}>
                  <input type="text" id="subject" name="subject" placeholder=" " maxLength="150" onChange={handleChange} />
                  <label htmlFor="subject">Subject</label>
                </div>
                {errors.subject && <span className="error-msg">{errors.subject}</span>}
              </div>

              <div>
                <div className={`floating-input-group ${errors.message ? 'error' : ''}`}>
                  <textarea id="message" name="message" placeholder=" " maxLength="3000" onChange={handleChange}></textarea>
                  <label htmlFor="message">Message</label>
                </div>
                {errors.message && <span className="error-msg">{errors.message}</span>}
              </div>

              {submitError && (
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  fontSize: '0.85rem',
                  textAlign: 'center'
                }}>
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-submit-glass ${isSubmitting ? 'sending' : ''} ${isSuccess ? 'success' : ''}`}
                style={{ width: '100%', marginTop: '0.5rem', position: 'relative' }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="spinner" viewBox="0 0 50 50" style={{ width: '20px', height: '20px', marginRight: '8px', animation: 'spin 1s linear infinite' }} aria-hidden="true">
                      <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" stroke="currentColor" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </>
                ) : isSuccess ? (
                  '✓ Message Delivered!'
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

        </div>

      </div>


    </section>
  );
}
