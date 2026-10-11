export const CONTRIBUTIONS_URL =
  "https://github-contributions-api.jogruber.de/v4/Aizaz-Noor?y=last";

export function parseContributions(payload) {
  if (!Array.isArray(payload?.contributions) || !payload.contributions.length)
    throw new Error("No contribution data");
  const seen = new Set();
  const days = payload.contributions
    .map((day) => {
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
        Number.isNaN(Date.parse(day.date)) ||
        new Date(day.date).toISOString().slice(0, 10) !== day.date ||
        !Number.isInteger(day.count) ||
        day.count < 0 ||
        !Number.isInteger(day.level) ||
        day.level < 0 ||
        day.level > 4 ||
        seen.has(day.date)
      )
        throw new Error("Invalid contribution data");
      seen.add(day.date);
      return { date: day.date, count: day.count, level: day.level };
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-366);
  for (let i = 1; i < days.length; i++)
    if (Date.parse(days[i].date) - Date.parse(days[i - 1].date) !== 86400000)
      throw new Error("Incomplete contribution calendar");
  return days;
}
