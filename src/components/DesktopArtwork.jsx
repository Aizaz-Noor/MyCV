import { lazy, Suspense, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
const Background3D = lazy(() => import("./Background3D"));

function Poster() {
  return (
    <picture className="desktop-sculpture-poster">
      <source media="(min-width: 1024px)" srcSet="/artwork/desktop-sculpture.png" />
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
        width="600" height="600" alt="" aria-hidden="true" decoding="async" />
    </picture>
  );
}

function LiveArtwork() {
  const [ready, setReady] = useState(false);
  return (
    <div className="desktop-artwork" data-ready={ready} aria-hidden="true">
      <Poster />
      <div className="hero-webgl">
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <Background3D onReady={() => setReady(true)} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default function DesktopArtwork({ enabled }) {
  // Local readiness resets when graphics eligibility changes, without resetting
  // the hero, orbit, dialogs, form or the rest of the application.
  return enabled ? <LiveArtwork /> : (
    <div className="desktop-artwork" data-ready="false" aria-hidden="true"><Poster /></div>
  );
}
