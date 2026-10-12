import { test, expect } from "@playwright/test";

test.use({ isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
test.setTimeout(60_000);
for (const width of [320, 390, 768]) {
  test(`mobile sculpture, upright icons and motion restore correctly at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    const artworkRequests = [];
    page.on("request", req => {
      if (/Background3D|desktop-sculpture\.png/.test(req.url())) artworkRequests.push(req.url());
    });
    await page.goto("/");
    const art = page.locator(".hero-art");
    await art.scrollIntoViewIfNeeded();
    await expect(art).not.toHaveClass(/motion-offscreen/);
    const rings = page.locator(".sculpture-rings");
    const transform = () => rings.evaluate(el => getComputedStyle(el).transform);
    const moving = async () => {
      const before = await transform();
      await expect.poll(transform).not.toBe(before);
    };
    await expect(page.locator(".mobile-sculpture")).toBeVisible();
    await expect(page.locator(".desktop-artwork")).not.toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    await moving();
    // The orbit translates each icon but cancels its rotation in the same transform.
    const matrix = await page.locator(".satellite-0").evaluate(el => {
      const m = new DOMMatrix(getComputedStyle(el).transform);
      return { a: m.a, b: m.b, c: m.c, d: m.d };
    });
    expect(matrix.a).toBeCloseTo(1, 3);
    expect(matrix.d).toBeCloseTo(1, 3);
    expect(matrix.b).toBeCloseTo(0, 3);
    expect(matrix.c).toBeCloseTo(0, 3);
    await page.getByRole("button", { name: "Pause animations", exact: true }).tap();
    const paused = await transform();
    await page.waitForTimeout(250);
    expect(await transform()).toBe(paused);
    await page.evaluate(() => { window.dispatchEvent(new Event("pagehide")); window.dispatchEvent(new Event("pageshow")); });
    await expect(page.locator(".portfolio-shell")).toHaveAttribute("data-motion", "paused");
    await page.getByRole("button", { name: "Resume animations", exact: true }).tap();
    await moving();
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(art).toHaveClass(/motion-offscreen/);
    const offscreen = await transform();
    await page.waitForTimeout(250);
    expect(await transform()).toBe(offscreen);
    await art.scrollIntoViewIfNeeded();
    await expect(art).not.toHaveClass(/motion-offscreen/);
    await moving();
    await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
    await expect(page.locator(".portfolio-shell")).toHaveAttribute("data-motion", "paused");
    await page.evaluate(() => window.dispatchEvent(new Event("pageshow")));
    await expect(page.locator(".portfolio-shell")).toHaveAttribute("data-motion", "running");
    await moving();
    await page.goto("/google24334b63ca2f6a76.html");
    await page.goBack({ waitUntil: "domcontentloaded" });
    await art.scrollIntoViewIfNeeded();
    await expect(art).not.toHaveClass(/motion-offscreen/);
    await moving();
    await page.screenshot({ path: testInfo.outputPath("mobile-artwork.png"), animations: "disabled" });
    expect(artworkRequests).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
