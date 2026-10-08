// Content verified against public GitHub READMEs on 2026-10-08.
export const featuredProjects = [
  {
    id: "lifeflow",
    number: "01",
    category: "Web application / academic project",
    name: "LifeFlow",
    subtitle: "A clearer view of blood-bank operations.",
    description:
      "A React frontend bringing donor records, blood inventory, requests, and staff workflows into one coherent interface.",
    problem:
      "Blood-bank staff need to navigate inventory and patient requests without losing context.",
    approach:
      "Separate public donor pages from a modular staff portal, with dedicated views for inventory, screening, and reporting.",
    outcome:
      "A portfolio demonstration of healthcare workflows. The public demo is not a live clinical service.",
    tags: ["React 19", "Tailwind CSS", "Vite"],
    image: "/projects/lifeflow-dashboard.webp",
    imageAlt:
      "LifeFlow staff dashboard showing blood inventory, requests, and operational metrics",
    repo: "https://github.com/Aizaz-Noor/LifeFlow-BloodBank-Frontend",
    demo: "https://life-flow-blood-bank-frontend.vercel.app",
  },
  {
    id: "tandem",
    number: "02",
    category: "Desktop application / networking",
    name: "Tandem",
    subtitle: "Multiple connections. One control surface.",
    description:
      "A Windows desktop app for selecting network adapters, dispatching proxy-aware connections, and configuring an optional cloud tunnel.",
    problem:
      "Managing Wi-Fi and tethered connections involves scattered settings and difficult network state.",
    approach:
      "Connect a Tauri and React interface to a Python sidecar, with distinct local-dispatch and cloud-tunnel modes.",
    outcome:
      "Published Windows installers and an operational guide. Local mode distributes separate connections; multi-adapter speed gains remain unverified.",
    tags: ["Tauri", "React", "TypeScript", "Python"],
    repo: "https://github.com/Aizaz-Noor/Tandem",
    release: "https://github.com/Aizaz-Noor/Tandem/releases/latest",
  },
];
export const moreProjects = [
  {
    name: "Weekly Habit Tracker",
    category: "Web / personal productivity",
    description:
      "A weekly check-in grid with cross-week streaks and browser-local persistence.",
    tags: "React · TypeScript · localStorage",
    repo: "https://github.com/Aizaz-Noor/habit-tracker",
    demo: "https://habit-tracker-beryl-chi.vercel.app",
  },
  {
    name: "ANK-CINEMA",
    category: "CLI / developer tooling",
    description:
      "Parallel media search, info-hash deduplication, and aria2c download integration.",
    tags: "Python · Rich · aria2c",
    repo: "https://github.com/Aizaz-Noor/ANK-CINEMA",
  },
  {
    name: "Newton's Glitch",
    category: "Game / simulation",
    description:
      "A JavaFX game with adaptive difficulty, particle effects, weather, and reactive audio.",
    tags: "Java · JavaFX · Maven",
    repo: "https://github.com/Aizaz-Noor/Newtons-Glitch",
  },
  {
    name: "Hostel Kharcha Manager",
    category: "CLI / shared expenses",
    description:
      "A C++ terminal app for shared expenses, debt calculations, and monthly reports.",
    tags: "C++ · Data structures · File I/O",
    repo: "https://github.com/Aizaz-Noor/Hostel-Kharcha-Manager",
  },
];
