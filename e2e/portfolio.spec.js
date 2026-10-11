import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [320, 390, 768, 1440]) {
  test(`layout and core interactions at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".ios-nav-brand .brand-symbol")).toHaveText("an.");
    await expect(page.locator(".ios-nav-brand .brand-caption")).toContainText("Developer / Lahore");
    await expect(page.locator("#home")).not.toContainText("Software engineering student & freelance developer");
    const brand = await page.locator(".ios-nav-brand").boundingBox();
    const actions = await page.locator(".ios-nav-actions").boundingBox();
    expect(brand.x + brand.width).toBeLessThanOrEqual(actions.x);
    for (const section of await page.locator("main > section").all())
      await section.scrollIntoViewIfNeeded();
    // Scroll each lazy image into view: tall sections can contain images below
    // the viewport even after the section itself has been visited.
    for (const image of await page.locator('img:not([aria-hidden="true"])').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    await expect
      .poll(() =>
        page
          .locator('img:not([aria-hidden="true"])')
          .evaluateAll((images) =>
            images.every((image) => image.complete && image.naturalWidth > 0),
          ),
      )
      .toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator("canvas")).toHaveCount(0);
    if (width < 1024) {
      const menu = page.getByRole("button", { name: "Menu" });
      await menu.click();
      await page.keyboard.press("Escape");
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await expect(menu).toBeFocused();
      await menu.click();
      await page
        .locator("#navigation-links")
        .getByRole("link", { name: "Work", exact: true })
        .click();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
    }
    await page.getByRole("button", { name: "Resume" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Resume" }),
    ).toBeFocused();
    await page
      .getByRole("button", { name: "Project details", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Project details", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByAltText(/NovaWorks project details/)).toBeVisible();
    await page
      .getByRole("button", { name: "Send Message", exact: true })
      .click();
    await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4);
    await expect(page.locator("#name")).toBeFocused();
    expect(errors).toEqual([]);
  });
}
test("contact success and provider failure preserve the correct state", async ({
  page,
}) => {
  let succeed = false;
  await page.route("https://api.web3forms.com/submit", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: succeed }),
    }),
  );
  await page.goto("/");
  const values = {
    name: "Browser QA",
    email: "qa@example.com",
    subject: "Intercepted local check",
    message: "This request is mocked and never delivered to the provider.",
  };
  for (const [name, value] of Object.entries(values))
    await page.locator(`[name="${name}"]`).fill(value);
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("could not be delivered");
  await expect(page.locator("#message")).toHaveValue(values.message);
  succeed = true;
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  await expect(page.locator("#contact").getByRole("status")).toContainText("Your message was sent");
  await expect(page.locator("#message")).toHaveValue("");
  await expect(
    page.getByRole("button", { name: "Send another message" }),
  ).toBeEnabled();
});
test("no-JavaScript fallback retains current project and contact links", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(
    page.getByRole("heading", { name: "NovaWorks", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tandem", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('a[href="mailto:aizaznoorkhuwaja@gmail.com"]'),
  ).toBeVisible();
  await context.close();
});
test("restored glass navigation supports selection, dismissal and resizing", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav.locator(".ios-desktop-links a")).toHaveCount(8);
  await expect(page.locator(".ios-desktop-links a[aria-current]")).toHaveText(
    "Home",
  );
  const work = nav.locator('.ios-desktop-links a[href="#work"]');
  await work.hover();
  expect(
    await nav
      .locator(".ios-selection-pill")
      .first()
      .evaluate((el) => Math.round(el.getBoundingClientRect().left)),
  ).toBe(
    await work.evaluate((el) => Math.round(el.getBoundingClientRect().left)),
  );
  await work.click();
  await expect(page.locator("#work")).toBeFocused();
  await expect(page.locator(".ios-header")).toHaveClass(/is-scrolled/);
  await page.setViewportSize({ width: 390, height: 900 });
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  await expect(page.locator('#navigation-links a[href="#home"]')).toBeFocused();
  await expect(page.locator(".ios-mobile-menu")).toBeVisible();
  await page.locator(".ios-nav-backdrop").click({ position: { x: 5, y: 700 } });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator(".ios-menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.setViewportSize({ width: 390, height: 900 });
  await expect(page.locator("#navigation-links")).toHaveAttribute("inert", "");
});

test("NovaWorks and actual Tandem screenshots enlarge and restore focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".featured-project h3")).toHaveText([
    "NovaWorks",
    "Tandem",
  ]);
  await expect(
    page.locator(
      '.project-novaworks a[href="https://nova-works-zeta.vercel.app"]',
    ),
  ).toBeVisible();
  for (const name of [
    "Enlarge NovaWorks Admin workspace screenshot",
    "Enlarge Tandem Dashboard screenshot",
  ]) {
    const trigger = page.getByRole("button", { name, exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "Close project screenshot" }),
    ).toBeFocused();
    await expect
      .poll(() =>
        dialog
          .locator("img")
          .evaluate((img) => img.complete && img.naturalWidth > 0),
      )
      .toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
  await expect(page.locator(".project-tandem figcaption")).toContainText(
    "backend offline",
  );
  await expect(page.locator(".project-tandem .network-diagram")).toHaveCount(0);
});

test("automatic desktop graphics fail gracefully", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  let attempted = false;
  await page.route("**/components/Background3D.jsx*", (route) => {
    attempted = true;
    return route.abort();
  });
  await page.goto("/");
  await expect.poll(() => attempted).toBe(true);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore my work" }),
  ).toBeVisible();
  await expect(page.locator(".sculpture-fallback")).toHaveCSS("opacity", "1");
  await page.getByRole("button", { name: "Pause animations" }).click();
  await expect(page.locator(".portfolio-shell")).toHaveAttribute(
    "data-motion",
    "paused",
  );
});

test("ongoing motion pauses, persists, resumes and stops offscreen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto("/");
  await page.waitForTimeout(1500);
  const satellite = page.locator(".satellite-0");
  const transform = () =>
    satellite.evaluate((el) => getComputedStyle(el).transform);
  const start = await transform();
  await page.waitForTimeout(350);
  expect(await transform()).not.toBe(start);
  await page.getByRole("button", { name: "Pause animations" }).click();
  const paused = await transform();
  await page.waitForTimeout(350);
  expect(await transform()).toBe(paused);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Resume animations" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Resume animations" }).click();
  const resumed = await transform();
  await page.waitForTimeout(350);
  expect(await transform()).not.toBe(resumed);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator(".kinetic-art")).toHaveClass(/motion-offscreen/);
  const offscreen = await transform();
  await page.waitForTimeout(350);
  expect(await transform()).toBe(offscreen);
  expect(await page.locator(".skill-group li svg").count()).toBeGreaterThan(15);
});

test("decorative motion cannot create horizontal page overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: "Pause animations" }).click();
    await page.getByRole("button", { name: "Resume animations" }).click();
    for (const section of await page.locator("main > section").all())
      await section.scrollIntoViewIfNeeded();
    for (const time of [4500, 12000, 25000]) {
      await page.evaluate((time) => {
        document
          .getAnimations()
          .filter(
            (a) =>
              a instanceof CSSAnimation &&
              a.effect.getTiming().iterations === Infinity,
          )
          .forEach((a) => {
            a.currentTime = time;
          });
      }, time);
      await page.waitForTimeout(100);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
});

test("automated accessibility checks on desktop and mobile", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    for (const section of await page.locator("main > section").all())
      await section.scrollIntoViewIfNeeded();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});

test("expanded navigation and screenshot viewer remain accessible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const menuScan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(menuScan.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", {
      name: "Enlarge NovaWorks Admin workspace screenshot",
      exact: true,
    })
    .click();
  const dialogScan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(dialogScan.violations).toEqual([]);
});


test("resuming motion does not replay a visible section entrance", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.addInitScript(() => {
    const animate = Element.prototype.animate;
    window.toolkitEntrances = 0;
    Element.prototype.animate = function (...args) {
      if (this.closest("#techstack")) window.toolkitEntrances++;
      return animate.apply(this, args);
    };
  });
  await page.goto("/");
  await page.locator(".skill-group").first().scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.toolkitEntrances)).toBeGreaterThan(0);
  await page.waitForTimeout(900);
  const count = await page.evaluate(() => window.toolkitEntrances);
  await page.getByRole("button", { name: "Pause animations" }).click();
  await page.getByRole("button", { name: "Resume animations" }).click();
  await page.waitForTimeout(900);
  expect(await page.evaluate(() => window.toolkitEntrances)).toBe(count);
  await expect(page.locator(".skill-group").first()).toBeVisible();
});
