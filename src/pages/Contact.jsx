import { useLocale } from "../hooks/useLocale";
import React, { useEffect, useRef, useState } from "react";
import { sendContact, validateContact } from "../services/contact";

const ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
  "e7f3a8dd-fb55-4527-9641-6b23afd91138";

export default function Contact() {
  const { t } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    // Keep native validation in the no-JavaScript form; use inline errors after hydration.
    formRef.current.noValidate = true;
  }, []);

  const handleChange = (e) => {
    const { name } = e.target;
    setSubmitError(null);
    setIsSuccess(false);
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { values, errors: newErrors } = validateContact(new FormData(form));

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      form.elements[Object.keys(newErrors)[0]]?.focus();
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await sendContact(values, ACCESS_KEY);
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      setSubmitError(
        error.name === "AbortError"
          ? "contact.errors.timeout"
          : "contact.errors.delivery",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="section-container" id="contact">
      <div className="section-content">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("06 / Start a conversation")}</p>
            <h2 className="heading-lg accent-underline">
              {t("Let's build")}
              <br />
              <span className="g-text">{t("something useful.")}</span>
            </h2>
          </div>
          <p className="text-body contact-intro">
            {t(
              "Have a project in mind, an internship opportunity, or a technical challenge? I'd like to hear about it.",
            )}
          </p>
        </div>
        <div className="contact-unified-card ios-surface">
          <div className="contact-details">
            <a href="mailto:aizaznoorkhuwaja@gmail.com">
              <div className="contact-info-item">
                <div className="contact-info-icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-info-copy">
                  <span className="contact-info-label">{t("Email")}</span>
                  <span className="text-link contact-info-text">
                    <bdi dir="ltr" lang="en">
                      aizaznoorkhuwaja@gmail.com
                    </bdi>
                  </span>
                </div>
              </div>
            </a>
            <a
              href="https://maps.google.com/?q=Lahore,Pakistan"
              target="_blank"
              rel="noreferrer"
            >
              <div className="contact-info-item">
                <div className="contact-info-icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="contact-info-copy">
                  <span className="contact-info-label">{t("Location")}</span>
                  <span className="contact-info-text">
                    {t("Lahore, Pakistan")}
                  </span>
                </div>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/aizaz-noor"
              target="_blank"
              rel="noreferrer"
            >
              <div className="contact-info-item">
                <div className="contact-info-icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div className="contact-info-copy">
                  <span className="contact-info-label">LinkedIn</span>
                  <span className="text-link contact-info-text">
                    <bdi dir="ltr" lang="en">
                      linkedin.com/in/aizaz-noor
                    </bdi>
                  </span>
                </div>
              </div>
            </a>
          </div>
          <div className="contact-form-panel">
            <form
              ref={formRef}
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <input type="hidden" name="access_key" value={ACCESS_KEY} />
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                className="honeypot"
                aria-hidden="true"
              />
              <div className="contact-fields-row">
                <div className="contact-field">
                  <div
                    className={`floating-input-group ${errors.name ? "error" : ""}`}
                  >
                    <input
                      type="text"
                      dir="auto"
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder=" "
                      maxLength={100}
                      required
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    <label htmlFor="name">{t("Name")}</label>
                  </div>
                  {errors.name && (
                    <span id="name-error" className="error-msg">
                      {t(errors.name)}
                    </span>
                  )}
                </div>

                <div className="contact-field">
                  <div
                    className={`floating-input-group ${errors.email ? "error" : ""}`}
                  >
                    <input
                      type="email"
                      dir="ltr"
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder=" "
                      maxLength={255}
                      required
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    <label htmlFor="email">{t("Email")}</label>
                  </div>
                  {errors.email && (
                    <span id="email-error" className="error-msg">
                      {t(errors.email)}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div
                  className={`floating-input-group ${errors.subject ? "error" : ""}`}
                >
                  <input
                    type="text"
                    dir="auto"
                    id="subject"
                    name="subject"
                    placeholder=" "
                    maxLength={150}
                    required
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                  />
                  <label htmlFor="subject">{t("Subject")}</label>
                </div>
                {errors.subject && (
                  <span id="subject-error" className="error-msg">
                    {t(errors.subject)}
                  </span>
                )}
              </div>

              <div>
                <div
                  className={`floating-input-group ${errors.message ? "error" : ""}`}
                >
                  <textarea
                    dir="auto"
                    id="message"
                    name="message"
                    placeholder=" "
                    maxLength={3000}
                    required
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  ></textarea>
                  <label htmlFor="message">{t("Message")}</label>
                </div>
                {errors.message && (
                  <span id="message-error" className="error-msg">
                    {t(errors.message)}
                  </span>
                )}
              </div>

              {Object.keys(errors).length > 0 && (
                <p role="alert" className="form-status">
                  {t("Please correct the highlighted fields.")}
                </p>
              )}

              {submitError && (
                <div role="alert" className="contact-provider-error">
                  {t(submitError)}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-submit-glass ${isSubmitting ? "sending" : ""} ${isSuccess ? "success" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="spinner"
                      viewBox="0 0 50 50"
                      aria-hidden="true"
                    >
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="5"
                        stroke="currentColor"
                        strokeDasharray="31.4 31.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    {t("Sending...")}
                  </>
                ) : isSuccess ? (
                  t("Send another message")
                ) : (
                  t("Send Message")
                )}
              </button>
              {isSuccess && (
                <p role="status" className="form-status">
                  {t("Your message was sent. Thank you.")}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
