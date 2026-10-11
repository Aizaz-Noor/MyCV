import test from "node:test";
import assert from "node:assert/strict";
import { parseContributions } from "../src/services/contributions.js";
test("contribution calendar sorts dates and preserves real counts", () => {
  assert.deepEqual(
    parseContributions({
      contributions: [
        { date: "2026-10-02", count: 2, level: 1 },
        { date: "2026-10-01", count: 0, level: 0 },
      ],
    }),
    [
      { date: "2026-10-01", count: 0, level: 0 },
      { date: "2026-10-02", count: 2, level: 1 },
    ],
  );
});
test("calendar rejects malformed, duplicate and incomplete data rather than inventing activity", () => {
  const good = { date: "2026-10-01", count: 1, level: 1 };
  for (const contributions of [
    [],
    [{ ...good, date: "2026-02-30" }],
    [{ ...good, count: -1 }],
    [{ ...good, level: 7 }],
    [good, good],
    [good, { ...good, date: "2026-10-03" }],
  ])
    assert.throws(() => parseContributions({ contributions }));
  assert.throws(() => parseContributions({ error: "Unavailable" }));
});
