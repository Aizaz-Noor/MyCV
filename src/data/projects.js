// Content verified against public GitHub READMEs on 2026-10-10.
export const featuredProjects = [
  {
    id: "novaworks",
    number: "01",
    category: "AI web application / team project",
    name: "NovaWorks",
    subtitle: "From meeting notes to assigned work.",
    description:
      "An AI-assisted workspace that turns a meeting's final decisions into saved projects, tasks, owners, deadlines, and effort estimates.",
    problem:
      "Moving from a meeting to assigned work requires repeated manual entry and makes final decisions easy to lose.",
    approach:
      "Validate AI-extracted work as a complete batch, save it atomically, and give administrators, managers, and developers role-scoped views.",
    outcome:
      "A working shared demo with persistent storage, duplicate-safe replay, and fictional demo accounts.",
    role: "Product direction, UI/UX, frontend, integration, and repository ownership with Code Nomads.",
    tags: ["React 19", "Express 5", "PostgreSQL", "AI integration"],
    previews: [
      {
        label: "Admin workspace",
        image: "/projects/novaworks-workspace.png",
        alt: "NovaWorks administrator workspace showing three projects created from meeting decisions",
        width: 1366,
        height: 768,
      },
      {
        label: "Project details",
        image: "/projects/novaworks-project.png",
        alt: "NovaWorks project details with task owners, deadlines, and effort estimates",
        width: 1280,
        height: 1345,
      },
    ],
    caption: "Actual interface · fictional demo data",
    repo: "https://github.com/Aizaz-Noor/Nova-Works",
    demo: "https://nova-works-zeta.vercel.app",
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
    previews: [
      {
        label: "Dashboard",
        image: "/projects/tandem-dashboard.webp",
        alt: "Tandem desktop dashboard showing network speed meters and adapter controls in the offline backend state",
        width: 1366,
        height: 900,
      },
    ],
    caption: "Actual app interface · local capture with backend offline",
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
