import { test, expect } from "@playwright/test";

test.setTimeout(60_000);

test.use({ isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

for (const width of [320, 390, 768]) {
  test(`mobile motion stays reachable throughout a long page at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(page.locator("#main-content > section")).toHaveCount(7);
    const control = page.getByRole("button", { name: "Pause animations", exact: true });
    await expect(control).toBeVisible();
    expect(await control.evaluate(el => el.parentElement === document.body)).toBe(true);
    const light = page.locator(".ambient-light-one");
    await expect(light).toHaveCSS("animation-name", "ambient-drift");
    await expect(light).toHaveCSS("animation-play-state", "running");
    const before = await light.evaluate(el => getComputedStyle(el).transform);
    await expect.poll(() => light.evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
    expect(await page.locator(".ambient-dots i").evaluateAll(nodes => nodes.filter(el => getComputedStyle(el).display !== "none").length)).toBe(16);
    expect(await page.locator(".ios-nav").evaluate(el => getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter)).toContain("28px");
    await page.screenshot({ path: testInfo.outputPath("mobile-hero.png"), animations: "disabled" });
    for (const id of ["about", "work", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(control).toBeInViewport({ ratio: 1 });
      expect(await control.evaluate(el => {
        const r = el.getBoundingClientRect();
        return r.height >= 44 && r.bottom <= innerHeight && r.right <= innerWidth &&
          el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
      })).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await control.tap();
    const resume = page.getByRole("button", { name: "Resume animations", exact: true });
    await expect(resume).toHaveAttribute("aria-pressed", "true");
    await expect(light).toHaveCSS("animation-play-state", "paused");
    await page.reload();
    await expect(resume).toBeVisible();
    await expect(page.locator(".portfolio-shell")).toHaveAttribute("data-motion", "paused");
    await resume.tap();
    await expect(control).toBeVisible();
    await expect(light).toHaveCSS("animation-play-state", "running");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath("mobile-footer.png"), animations: "disabled" });
  });

  test(`device reduced motion keeps a visible explanation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const indicator = page.getByRole("button", { name: "Animations off: device reduced-motion setting" });
    await expect(indicator).toBeVisible();
    await expect(indicator).toBeEnabled();
    await indicator.tap();
    await expect(page.locator("#motion-help")).toContainText("Settings > Accessibility > Motion");
    await expect(indicator).toHaveAttribute("aria-expanded", "true");
    await indicator.tap();
    await expect(page.locator("#motion-help")).toHaveCount(0);
    await expect(indicator).toHaveText("Reduced motion");
    await expect(page.locator(".portfolio-shell")).toHaveAttribute("data-motion", "paused");
    await expect(page.locator("canvas")).toHaveCount(0);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(indicator).toBeInViewport({ ratio: 1 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(page.getByRole("button", { name: "Pause animations", exact: true })).toBeEnabled();
  });
}
