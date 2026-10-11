import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const endpoint = "https://github-contributions-api.jogruber.de/**";
const contributions = Array.from({ length: 365 }, (_, index) => ({
  date: new Date(Date.UTC(2025, 9, 12) + index * 86400000)
    .toISOString()
    .slice(0, 10),
  count: index % 5,
  level: index % 5,
}));
for (const width of [320, 1440])
  test(`real calendar data and refined sections at ${width}px`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.route(endpoint, (route) =>
      route.fulfill({ json: { contributions } }),
    );
    await page.goto("/");
    await expect(
      page
        .locator("#home")
        .getByRole("button", { name: "Resume", exact: true }),
    ).toBeVisible();
    await page.locator(".github-activity").scrollIntoViewIfNeeded();
    await expect(page.locator(".contribution-calendar rect")).toHaveCount(365);
    await expect(page.locator(".activity-stats")).toContainText("730");
    await page
      .getByText("View daily contribution details", { exact: true })
      .click();
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByRole("table").locator("tbody tr")).toHaveCount(365);
    const scan = await new AxeBuilder({ page })
      .include(".activity-panel")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    await page.emulateMedia({ forcedColors: "active" });
    await expect(page.getByRole("table")).toBeVisible();
    await page.emulateMedia({ forcedColors: "none" });
    const region = page.getByRole("region", {
      name: /GitHub contribution calendar/,
    });
    await region.focus();
    await page.keyboard.press("End");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator(".journey-card")).toHaveCount(2);
    await expect(page.locator(".portrait-photo img")).toHaveJSProperty(
      "naturalWidth",
      800,
    );
    await page
      .getByRole("button", { name: "Project details", exact: true })
      .click();
    await page
      .getByRole("button", {
        name: /Enlarge NovaWorks Project details screenshot/,
      })
      .click();
    await expect(
      page.getByRole("dialog").getByAltText(/NovaWorks project details/),
    ).toBeVisible();
    await page.keyboard.press("Escape");
  });
test("contribution failure is honest, retry works and navigation stays available", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  let success = false;
  await page.route(endpoint, (route) =>
    route.fulfill(
      success
        ? { json: { contributions } }
        : { status: 503, body: "unavailable" },
    ),
  );
  await page.goto("/");
  await page.locator(".github-activity").scrollIntoViewIfNeeded();
  await expect(page.locator(".activity-message")).toContainText(
    "temporarily unavailable",
  );
  await expect(page.locator(".contribution-calendar")).toHaveCount(0);
  success = true;
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(page.locator(".contribution-calendar rect")).toHaveCount(365);
  await expect(page.locator("nav")).toBeVisible();
});
test("timeline enters on scroll once and respects the pause control", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route(endpoint, (route) =>
    route.fulfill({ json: { contributions } }),
  );
  await page.addInitScript(() => {
    window.journeyEntrances = 0;
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      if (this.classList.contains("journey-entry")) window.journeyEntrances++;
      return animate.apply(this, args);
    };
  });
  await page.goto("/");
  const cards = page.locator(".journey-entry");
  await cards.first().scrollIntoViewIfNeeded();
  await expect
    .poll(() => page.evaluate(() => window.journeyEntrances))
    .toBeGreaterThan(0);
  await cards.last().scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.journeyEntrances)).toBe(2);
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  await expect
    .poll(() =>
      cards.evaluateAll((nodes) =>
        nodes.reduce((sum, node) => sum + node.getAnimations().length, 0),
      ),
    )
    .toBe(0);
  await page
    .getByRole("button", { name: "Resume animations", exact: true })
    .click();
  await expect.poll(() => page.evaluate(() => window.journeyEntrances)).toBe(2);
});
