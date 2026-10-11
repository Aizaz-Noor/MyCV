import { test, expect } from "@playwright/test";

test("portrait reveals color only around the pointer and resets on leave", async ({
  page,
}) => {
  await page.setViewportSize({ width: 900, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const photo = page.locator(".portrait-photo");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute("data-interactive", "true");
  await expect(page.locator(".portrait-base")).toHaveCSS(
    "filter",
    "grayscale(1)",
  );
  await page.waitForTimeout(850);
  const box = await photo.boundingBox();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.35);
  await expect(photo).toHaveAttribute("data-revealing", "true");
  await expect(page.locator(".portrait-color")).toHaveCSS("opacity", "1");
  const first = await page
    .locator(".portrait-color")
    .evaluate((el) => el.style.getPropertyValue("--reveal-x"));
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.65);
  await expect
    .poll(() =>
      page
        .locator(".portrait-color")
        .evaluate((el) => el.style.getPropertyValue("--reveal-x")),
    )
    .not.toBe(first);
  await expect(page.locator(".portrait-color")).toHaveCSS("filter", "none");
  expect(
    await page
      .locator(".portrait-color")
      .evaluate((el) => getComputedStyle(el).maskImage),
  ).toContain("radial-gradient");
  await expect(
    page.getByAltText("Portrait of Aizaz Noor", { exact: true }),
  ).toHaveCount(1);
  await page.mouse.move(2, 2);
  await expect(photo).not.toHaveAttribute("data-revealing", "true");
  await expect(page.locator(".portrait-color")).toHaveCSS("opacity", "0");
  await page
    .getByRole("button", { name: "Pause animations", exact: true })
    .click();
  await expect(photo).toHaveAttribute("data-interactive", "false");
  await expect(page.locator(".portrait-base")).toHaveCSS("filter", "none");
  await page
    .getByRole("button", { name: "Resume animations", exact: true })
    .click();
  await expect(photo).toHaveAttribute("data-interactive", "true");
});

test("reduced motion and high contrast retain a static color portrait", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".portrait-photo").scrollIntoViewIfNeeded();
  await expect(page.locator(".portrait-photo")).toHaveAttribute(
    "data-interactive",
    "false",
  );
  await expect(page.locator(".portrait-base")).toHaveCSS("filter", "none");
  await page.emulateMedia({ forcedColors: "active" });
  await expect(page.locator(".portrait-color")).toHaveCSS("display", "none");
  await expect(
    page.getByAltText("Portrait of Aizaz Noor", { exact: true }),
  ).toBeVisible();
});

test("touch devices show a color portrait with normal scrolling", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await page.locator(".portrait-photo").scrollIntoViewIfNeeded();
  await expect(page.locator(".portrait-photo")).toHaveAttribute(
    "data-interactive",
    "false",
  );
  await expect(page.locator(".portrait-base")).toHaveCSS("filter", "none");
  await page.locator(".portrait-photo").tap();
  await expect(page.locator(".portrait-color")).toHaveCSS("opacity", "0");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test("project screenshots and toolkit cards stay still while reading on hover", async ({
  page,
}) => {
  await page.setViewportSize({ width: 900, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  for (const selector of [".project-browser", ".skill-group"]) {
    const item = page.locator(selector).first();
    await item.scrollIntoViewIfNeeded();
    await page.waitForTimeout(850);
    await item.hover();
    await expect(item).toHaveCSS("transform", "none");
    await page.mouse.move(2, 2);
  }
});
