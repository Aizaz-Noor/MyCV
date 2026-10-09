import {
  SiReact,
  SiPython,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVite,
  SiLinux,
  SiDocker,
  SiGnubash,
  SiVercel,
  SiTauri,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
const ICONS = {
  React: [SiReact, "#61dafb"],
  Python: [SiPython, "#ffd35c"],
  "Node.js": [SiNodedotjs, "#7fc76b"],
  JavaScript: [SiJavascript, "#f7df1e"],
  TypeScript: [SiTypescript, "#68a8ed"],
  "C++": [SiCplusplus, "#82b6ff"],
  Java: [FaJava, "#f3a568"],
  JavaFX: [FaJava, "#f3a568"],
  HTML: [SiHtml5, "#f28b64"],
  CSS: [SiCss, "#64b9f5"],
  Express: [SiExpress, "#eceef5"],
  MySQL: [SiMysql, "#7ccce9"],
  MongoDB: [SiMongodb, "#78d59a"],
  Git: [SiGit, "#f38878"],
  GitHub: [SiGithub, "#eceef5"],
  Vite: [SiVite, "#bc9dff"],
  Linux: [SiLinux, "#e9cd6a"],
  Docker: [SiDocker, "#69bcf5"],
  Bash: [SiGnubash, "#94d5aa"],
  Vercel: [SiVercel, "#eceef5"],
  Tauri: [SiTauri, "#7fe0e9"],
};
export default function TechIcon({ name, className = "", size = 24 }) {
  const item = ICONS[name];
  if (!item) return null;
  const [Icon, color] = item;
  return (
    <Icon
      className={`tech-brand-icon ${className}`}
      size={size}
      style={{ color }}
      aria-hidden="true"
      focusable="false"
    />
  );
}

