import { useEffect, useRef, useState } from "react";
import { FiGithub, FiArrowUpRight, FiRefreshCw } from "react-icons/fi";
import Reveal from "./Reveal";
import {
  CONTRIBUTIONS_URL,
  parseContributions,
} from "../services/contributions";
const COLORS = ["#242b40", "#454b79", "#646ac0", "#8b91ef", "#bcc0ff"];
const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});
const dateLabel = (date) => dateFormatter.format(new Date(`${date}T00:00:00Z`));
export default function GitHubActivity() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () => !("IntersectionObserver" in window),
  );
  const [attempt, setAttempt] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [state, setState] = useState({ status: "loading", days: [] });
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    const controller = new AbortController();
    let disposed = false;
    const timer = setTimeout(() => controller.abort(), 10000);
    fetch(CONTRIBUTIONS_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unavailable");
        return response.json();
      })
      .then(parseContributions)
      .then((days) => {
        if (!disposed) setState({ status: "ready", days });
      })
      .catch(() => {
        if (!disposed) setState({ status: "error", days: [] });
      })
      .finally(() => clearTimeout(timer));
    return () => {
      disposed = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [visible, attempt]);
  const { days, status } = state;
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const active = days.filter((day) => day.count > 0).length;
  const offset = days.length
    ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay()
    : 0;
  const columns = Math.ceil((days.length + offset) / 7);
  const months = [];
  let previous = "";
  days.forEach((day, index) => {
    const key = day.date.slice(0, 7);
    if (key !== previous) {
      const x = Math.floor((index + offset) / 7) * 14;
      if (!months.length || x - months.at(-1).x > 28)
        months.push({
          key,
          x,
          label: new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en", {
            month: "short",
            timeZone: "UTC",
          }),
        });
      previous = key;
    }
  });
  return (
    <div ref={ref} className="github-activity">
      <Reveal>
        <section className="activity-panel" aria-labelledby="activity-title">
          <div className="activity-heading">
            <div>
              <p className="eyebrow">
                <FiGithub aria-hidden="true" /> Code, day by day
              </p>
              <h3 id="activity-title">
                A year of <em>building.</em>
              </h3>
            </div>
            <a
              href="https://github.com/Aizaz-Noor?tab=overview"
              target="_blank"
              rel="noreferrer"
            >
              Explore my GitHub <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="activity-body" aria-busy={status === "loading"}>
            {status === "loading" && (
              <p role="status" className="activity-message">
                Loading GitHub contributions…
              </p>
            )}
            {status === "error" && (
              <div className="activity-message">
                <p role="status">
                  Contributions are temporarily unavailable. You can still
                  explore my work on GitHub.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setState({ status: "loading", days: [] });
                    setAttempt((value) => value + 1);
                  }}
                >
                  <FiRefreshCw aria-hidden="true" /> Try again
                </button>
              </div>
            )}
            {status === "ready" && (
              <>
                <div className="activity-stats">
                  <p>
                    <strong>{total.toLocaleString("en")}</strong> contributions
                  </p>
                  <p>
                    <strong>{active}</strong> active days
                  </p>
                  <span>
                    {dateLabel(days[0].date)} — {dateLabel(days.at(-1).date)}
                  </span>
                </div>
                <div
                  className="calendar-scroll"
                  tabIndex={0}
                  role="region"
                  aria-label="GitHub contribution calendar. Scroll horizontally to see the full year."
                >
                  <svg
                    className="contribution-calendar"
                    viewBox={`0 0 ${columns * 14 + 28} 130`}
                    role="img"
                    aria-labelledby="calendar-title calendar-description"
                  >
                    <title id="calendar-title">
                      GitHub contributions over the last year
                    </title>
                    <desc id="calendar-description">
                      {total} contributions on {active} active days. Brighter
                      cells indicate more contributions. Individual dates are
                      available in the activity details below.
                    </desc>
                    {months.map((month) => (
                      <text key={month.key} x={month.x + 28} y="12">
                        {month.label}
                      </text>
                    ))}
                    {[
                      ["Mon", 1],
                      ["Wed", 3],
                      ["Fri", 5],
                    ].map(([label, row]) => (
                      <text key={label} x="0" y={row * 14 + 34}>
                        {label}
                      </text>
                    ))}
                    {days.map((day, index) => (
                      <rect
                        key={day.date}
                        x={Math.floor((index + offset) / 7) * 14 + 28}
                        y={((index + offset) % 7) * 14 + 24}
                        width="10"
                        height="10"
                        rx="2"
                        fill={COLORS[day.level]}
                      >
                        <title>
                          {dateLabel(day.date)}: {day.count} contributions
                        </title>
                      </rect>
                    ))}
                  </svg>
                </div>
                <div className="activity-footer">
                  <span>
                    Public GitHub activity · updated hourly by the data provider
                  </span>
                  <span className="calendar-legend">
                    Less{" "}
                    {COLORS.map((color) => (
                      <i
                        key={color}
                        style={{ background: color }}
                        aria-hidden="true"
                      />
                    ))}{" "}
                    More
                  </span>
                </div>
                <details className="activity-details" onToggle={(event) => setDetailsOpen(event.currentTarget.open)}>
                  <summary>View daily contribution details</summary>
                  {detailsOpen && <div
                    className="activity-table-wrap"
                    tabIndex={0}
                    role="region"
                    aria-label="Daily contribution details"
                  >
                    <table>
                      <caption>
                        Daily GitHub contributions for the displayed year
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Contributions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {days.map((day) => (
                          <tr key={day.date}>
                            <th scope="row">{dateLabel(day.date)}</th>
                            <td>{day.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>}
                </details>
              </>
            )}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
