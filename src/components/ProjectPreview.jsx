import LanguageToggle from "./LanguageToggle";
import { useLocale } from "../hooks/useLocale";
import { useEffect, useId, useRef, useState } from "react";
import { FiMaximize2, FiX } from "react-icons/fi";
export default function ProjectPreview({ project }) {
  const { t } = useLocale();
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const preview = project.previews[index];
  const dialog = useRef(null);
  const close = useRef(null);
  const titleId = useId();
  useEffect(() => {
    if (!expanded) return;
    const element = dialog.current;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    close.current?.focus();
    return () => {
      if (element.open) element.close();
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [expanded]);
  return (
    <>
      {project.previews.length > 1 && (
        <div
          className="preview-switch"
          role="group"
          aria-label={t("{name} interface preview", { name: project.name })}
        >
          {project.previews.map((view, viewIndex) => (
            <button
              key={view.image}
              type="button"
              aria-pressed={viewIndex === index}
              onClick={() => setIndex(viewIndex)}
            >
              {view.label}
            </button>
          ))}
        </div>
      )}
      <figure className="project-browser">
        <div className="browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <small>
            <bdi dir="ltr" lang="en">
              {project.name}
            </bdi>{" "}
            / {preview.label}
          </small>
          <FiMaximize2 />
        </div>
        <button
          className="preview-enlarge"
          type="button"
          aria-label={t("Enlarge {name} {label} screenshot", {
            name: project.name,
            label: preview.label,
          })}
          onClick={() => setExpanded(true)}
          style={{ "--preview-ratio": `${preview.width} / ${preview.height}` }}
        >
          <img
            className="preview-image"
            src={preview.image}
            alt={preview.alt}
            width={preview.width}
            height={preview.height}
            loading="lazy"
          />
        </button>
        <figcaption>{project.caption}</figcaption>
      </figure>
      <p className="preview-hint">
        <span>{t("Select the image to explore the details.")}</span>
        <FiMaximize2 aria-hidden="true" />
      </p>
      {expanded && (
        <dialog
          ref={dialog}
          className="preview-dialog"
          aria-labelledby={titleId}
          onCancel={(event) => {
            event.preventDefault();
            setExpanded(false);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setExpanded(false);
          }}
        >
          <div className="preview-dialog-header">
            <LanguageToggle />
            <h4 id={titleId}>
              <bdi dir="ltr" lang="en">
                {project.name}
              </bdi>{" "}
              / {preview.label}
            </h4>
            <button
              ref={close}
              type="button"
              aria-label={t("Close project screenshot")}
              onClick={() => setExpanded(false)}
            >
              <FiX aria-hidden="true" />
            </button>
          </div>
          <img
            src={preview.image}
            alt={preview.alt}
            width={preview.width}
            height={preview.height}
          />
          <p>{project.caption}</p>
        </dialog>
      )}
    </>
  );
}
