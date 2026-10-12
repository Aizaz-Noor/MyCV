import { test, expect } from "@playwright/test";

test("desktop first paint uses its own sculpture while 3D is delayed", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  let attempted = false;
  await page.route("**/components/Background3D.jsx*", async route => {
    attempted = true;
    await gate;
    await route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#main-content > section")).toHaveCount(7);
  await expect.poll(() => attempted).toBe(true);
  const poster = page.locator(".desktop-sculpture-poster img");
  await expect(poster).toBeVisible();
  await expect.poll(() => poster.evaluate(img => img.complete && img.naturalWidth > 1)).toBe(true);
  await expect(page.locator(".sculpture-fallback")).not.toBeVisible();
  await expect(page.locator(".desktop-artwork")).toHaveAttribute("data-ready", "false");
  await page.screenshot({ path: testInfo.outputPath("desktop-loading.png"), animations: "disabled" });
  release();
  await expect(page.locator(".desktop-artwork")).toHaveAttribute("data-ready", "true", { timeout: 15000 });
  await expect(page.locator(".hero-webgl")).toHaveCSS("opacity", "1");
  await expect(page.locator(".desktop-sculpture-poster")).toHaveCSS("opacity", "0");
  await expect(page.locator(".sculpture-fallback")).not.toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".sculpture-fallback")).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator(".desktop-artwork")).toHaveAttribute("data-ready", "true", { timeout: 15000 });
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("desktop reduced motion retains its desktop artwork without WebGL", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".desktop-sculpture-poster img")).toBeVisible();
  await expect(page.locator(".sculpture-fallback")).not.toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});
