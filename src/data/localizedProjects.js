import { featuredProjects, moreProjects } from "./projects";
export function localizedProjects(t) {
  const localize = (project) => {
    const copy = { ...project };
    if (Array.isArray(project.tags))
      copy.tags = project.tags.map((tag) =>
        tag === "AI integration" ? t(tag) : tag,
      );
    for (const field of [
      "category",
      "subtitle",
      "description",
      "problem",
      "approach",
      "outcome",
      "role",
      "caption",
    ])
      if (project[field]) copy[field] = t(`projects.${project.id}.${field}`);
    if (project.previews)
      copy.previews = project.previews.map((preview, index) => ({
        ...preview,
        label: t(`projects.${project.id}.previews.${index}.label`),
        alt: t(`projects.${project.id}.previews.${index}.alt`),
      }));
    return copy;
  };
  return {
    featured: featuredProjects.map(localize),
    more: moreProjects.map(localize),
  };
}
