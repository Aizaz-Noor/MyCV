# Aizaz Noor — 3D Software Engineering Portfolio

> A high-performance, interactive 3D portfolio and software showcase engineered with React 19, Three.js, React Three Fiber, Vite 8, Apple-grade Liquid Glass design system, and Emil Kowalski tactile spring physics.

[![Live Site](https://img.shields.io/badge/Live_Site-aizaznoorkhuwaja.vercel.app-818cf8?style=for-the-badge&logo=vercel&logoColor=white)](https://aizaznoorkhuwaja.vercel.app/)
[![Release: v1.0.0](https://img.shields.io/badge/Release-v1.0.0-34d399?style=for-the-badge&logo=github)](https://github.com/Aizaz-Noor)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## ✦ Overview

This repository contains the source code for **Aizaz Noor**'s personal portfolio and software showcase. Designed for maximum responsiveness, visual elegance, and performance, it pairs a hardware-accelerated 3D WebGL particle tunnel with an Apple-inspired Liquid Glass UI layer.

### 🌟 Key Highlights

- **3D WebGL Particle Tunnel & VisionOS Parallax:**
  - Driven by `@react-three/fiber` with custom GLSL vertex and fragment shaders.
  - Dynamically interpolates camera Z-depth on scroll and responds to desktop cursor movement with subtle, organic 3D rotational parallax.
- **Apple-Grade Liquid Glass Design System:**
  - Layered frosted glass panels (`backdrop-filter: blur(28px) saturate(190%)`) with 1px top-edge specular rim light catches.
  - Multi-stage ambient occlusion shadows and squircle geometry.
- **Emil Kowalski Tactile Physics:**
  - Fluid spring easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`) and tactile compression press feedback (`scale(0.982) translateY(1px)`) across all interactive controls.
- **Engineered for Speed:**
  - Zero-re-render custom cursor and magnetic buttons using direct DOM style writes.
  - Automatic WebGL frame-throttling & tab-hidden RAF pause to preserve battery and GPU cycles.
  - Touch device optimizations disabling expensive backdrop filters on mobile.
  - Vite 8 / Rolldown vendor chunk splitting for optimal caching.
- **Interactive Project & Profile Showcase:**
  - Bento grid cards with live architecture flowcharts.
  - GitHub contribution heatmap with real-time API integrations.
  - In-browser interactive PDF resume modal viewer.

---

## 🚀 Live Demo

- **Production URL:** [https://aizaznoorkhuwaja.vercel.app/](https://aizaznoorkhuwaja.vercel.app/)
- **Fallback URL:** [https://portfolio-seven-opal-48.vercel.app/](https://portfolio-seven-opal-48.vercel.app/)

---

## 🛠️ Tech Stack

### Core Frontend
- **Framework:** React 19 (`react`, `react-dom`)
- **Build Tool:** Vite 8 (`vite`, `@vitejs/plugin-react`)
- **Language:** Modern JavaScript (ES2024+)

### 3D Graphics & Animation
- **WebGL Rendering:** Three.js (`three`)
- **React 3D Canvas:** React Three Fiber (`@react-three/fiber`)
- **3D Utilities:** Drei (`@react-three/drei`)
- **Shader Math:** Custom GLSL Vertex & Fragment Shaders

### UI & Styling
- **Styling Architecture:** Vanilla CSS3 with CSS Custom Properties, Apple Glass tokens, and CSS Grid / Flexbox.
- **Typography:** Asynchronously loaded Google Fonts (`Inter` for body copy, `Outfit` for display headlines).
- **Icons:** React Icons (`react-icons`) & Lucide React (`lucide-react`).

### Services & Deployment
- **Contact Form:** Web3Forms API
- **GitHub Heatmap:** GitHub REST API v3
- **Hosting & CI/CD:** Vercel

---

## 📂 Project Structure

```
portfolio/
├── public/                 # Static assets (images, certificates, favicons, resume)
│   ├── favicon.png         # Site favicon
│   ├── logo.png            # Personal brand logo
│   ├── resume.pdf          # Full engineering resume
│   └── *.pdf / *.jpg       # Verified credential documents & photos
├── src/
│   ├── components/         # Reusable UI & 3D WebGL components
│   │   ├── Background3D.jsx# WebGL Canvas wrapper & VisionOS camera rig
│   │   ├── CustomCursor.jsx# Zero-re-render custom mouse cursor
│   │   ├── Footer.jsx      # Site footer with navigation & socials
│   │   ├── GithubStats.jsx # Real-time GitHub API integration
│   │   ├── MagneticButton.jsx# Cursor magnetic pull wrapper
│   │   ├── Navbar.jsx      # macOS-inspired frosted pill navbar
│   │   ├── ParticleTunnel.jsx# Custom GLSL 3D particle vortex
│   │   ├── Preloader.jsx   # Initial native loader
│   │   ├── ResumeModal.jsx # In-browser resume PDF viewer modal
│   │   ├── Reveal.jsx      # Scroll-triggered entrance animations
│   │   ├── ScrollProgress.jsx# Reading progress bar
│   │   └── TiltCard.jsx    # 3D interactive card tilt effect
│   ├── hooks/              # Custom React hooks
│   │   └── useScrollSpy.js # MutationObserver-based active section spy
│   ├── pages/              # Main portfolio sections
│   │   ├── Hero.jsx        # Landing hero with typewriter & CTAs
│   │   ├── About.jsx       # Personal overview & engineering philosophy
│   │   ├── Experience.jsx  # Experience & education timeline
│   │   ├── TechStack.jsx   # Interactive 3D flip cards for skills
│   │   ├── Projects.jsx    # Selected project showcase bento grid
│   │   ├── Certifications.jsx# Verified certifications showcase
│   │   ├── Profiles.jsx    # Social & coding profile cards
│   │   └── Contact.jsx     # Contact form with Web3Forms integration
│   ├── App.jsx             # Main application layout & section orchestration
│   ├── main.jsx            # React 19 DOM root entry point
│   └── index.css           # Global design tokens, resets, & responsive CSS
├── index.html              # HTML entry point with async font loading & SEO meta
├── package.json            # Node.js dependencies & scripts
├── vite.config.js          # Vite config with Rolldown vendor chunk splitting
└── README.md               # Project documentation
```

---

## 💻 Getting Started

Follow these steps to run the portfolio locally on your machine.

### Prerequisites

- **Node.js**: `v18.0.0` or higher (Recommended: `v20.x`)
- **Package Manager**: `npm` (v9+) or `pnpm` / `yarn`
- **Git**: Installed and configured

### 1. Clone the Repository

```bash
git clone https://github.com/Aizaz-Noor/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `npm run build` | `vite build` | Compiles and minifies production assets into `dist/`. |
| `npm run dev` | `vite` | Starts the local development server with HMR. |
| `npm run preview` | `vite preview` | Locally serves the production build from `dist/` for testing. |
| `npm run lint` | `eslint .` | Runs ESLint to check for code quality and syntax issues. |

---

## ⚡ Performance Architecture

1. **WebGL Off-Screen & Tab-Hidden Pause:**
   When the browser tab is hidden or backgrounded, `Background3D.jsx` pauses WebGL frame updates to preserve battery and CPU/GPU cycles.
2. **Mobile Frame Throttling:**
   On mobile screens (`<768px`), WebGL renders every second frame, cutting GPU load by 50%.
3. **Zero-Re-render DOM Trackers:**
   Components like `CustomCursor.jsx`, `MagneticButton.jsx`, and `Hero.jsx` (typewriter) write directly to DOM node styles/attributes via `useRef`, eliminating React re-render cascades.
4. **Mobile CSS Backdrop Blur Disabling:**
   On touch devices (`@media (hover: none)`), heavy `backdrop-filter: blur(...)` calls are replaced with opaque fallback backgrounds (`rgba(14, 14, 18, 0.92)`), avoiding mobile GPU compositing slowdowns.
5. **Async Font Loading:**
   Google Fonts load asynchronously via the `media=print` swap strategy, removing 300–800ms of render-blocking delay on initial paint.
6. **Vite Manual Chunk Splitting:**
   Vendor libraries (`three`, `@react-three/fiber`, `react-icons`, `react`) are separated into standalone cached chunks in `vite.config.js`.

---

## 🌐 Deployment

Configured for continuous deployment via **Vercel**:

1. Push your changes to the `main` branch on GitHub.
2. Connect your GitHub repository to Vercel.
3. Vercel will automatically detect Vite and run:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Author

**Aizaz Noor**
- **Website:** [aizaznoorkhuwaja.vercel.app](https://aizaznoorkhuwaja.vercel.app/)
- **GitHub:** [@Aizaz-Noor](https://github.com/Aizaz-Noor)
- **LinkedIn:** [in/aizaz-noor](https://www.linkedin.com/in/aizaz-noor)
