import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const english = (page) => page.locator(".ios-nav-actions .language-toggle");

for (const width of [320, 390, 768, 1440]) {
  test(`Urdu layout, navigation, and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/?lang=ur");
    await expect(page.locator("html")).toHaveAttribute("lang", "ur");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() =>
        document.fonts.check('16px "Noto Naskh Arabic"', "اردو ک ی ڑ ں ے ٹ ڈ"),
      ),
    ).toBe(true);
    await expect(page.locator("#work h2")).toContainText("منصوبے");
    await expect(page.locator("#contact h2")).toContainText("کارآمد");
    await expect(page.locator(".project-tandem figcaption")).toContainText(
      "آف لائن",
    );
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() => img.evaluate((e) => e.complete && e.naturalWidth > 0))
        .toBe(true);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const brand = await page.locator(".ios-nav-brand").boundingBox();
    const actions = await page.locator(".ios-nav-actions").boundingBox();
    expect(actions.x + actions.width).toBeLessThanOrEqual(brand.x + 1);
    if (width < 1024) {
      await page.getByRole("button", { name: "مینو", exact: true }).click();
      await expect(page.locator(".ios-mobile-links a")).toHaveCount(8);
      await expect(page.locator(".ios-menu-socials a")).toHaveCount(2);
      await page.locator('.ios-mobile-links a[href="#work"]').click();
      await expect(
        page.getByRole("button", { name: "مینو", exact: true }),
      ).toHaveAttribute("aria-expanded", "false");
    }
    await page.locator(".btn-submit-glass").click();
    await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4);
    await expect(page.locator("#name-error")).toHaveText("اپنا نام درج کریں۔");
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("language links, persistence, history, and English-first default", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const fontRequests = [];
  page.on("request", (request) => {
    if (request.url().includes("noto-naskh")) fontRequests.push(request.url());
  });
  await page.goto("/?ref=portfolio#work");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(fontRequests).toEqual([]);
  await english(page).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ur");
  expect(new URL(page.url()).searchParams.get("ref")).toBe("portfolio");
  expect(new URL(page.url()).hash).toBe("#work");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ur");
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ur");
  await page.goto("/?lang=en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/?lang=invalid");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.evaluate(() => {
    history.pushState({}, "", "?lang=ur");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  await expect(page.locator("html")).toHaveAttribute("lang", "ur");
  await page.evaluate(() => {
    history.pushState({}, "", "?lang=en");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("lang", "ur");
  await page.goForward();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(
    "https://aizaznoorkhuwaja.vercel.app/",
  );
  await expect(page.locator("link[hreflang]")).toHaveCount(0);
});

test("switching preserves form values, validation, pending delivery, and status", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  let pending;
  await page.route("https://api.web3forms.com/submit", (route) => {
    pending = route;
  });
  await page.goto("/");
  await page.locator(".btn-submit-glass").click();
  await page.locator("#name").fill("Ali");
  await english(page).click();
  await expect(page.locator("#name")).toHaveValue("Ali");
  await expect(page.locator("#email-error")).toHaveText(
    "اپنا ای میل درج کریں۔",
  );
  await page.locator("#email").fill("ali@example.com");
  await page.locator("#subject").fill("منصوبہ");
  await page.locator("#message").fill("ایک نیا منصوبہ بنانا ہے۔");
  await page.locator(".btn-submit-glass").click();
  await expect(page.locator(".btn-submit-glass")).toBeDisabled();
  await english(page).click();
  await expect(page.locator(".btn-submit-glass")).toContainText("Sending");
  await expect.poll(() => Boolean(pending)).toBe(true);
  await pending.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ success: false }),
  });
  await expect(page.locator(".contact-provider-error")).toContainText(
    "could not be delivered",
  );
  await english(page).click();
  await expect(page.locator(".contact-provider-error")).toContainText(
    "نہیں بھیجا جا سکا",
  );
  await expect(page.locator("#message")).toHaveValue(
    "ایک نیا منصوبہ بنانا ہے۔",
  );
  pending = undefined;
  await page.locator(".btn-submit-glass").click();
  await expect.poll(() => Boolean(pending)).toBe(true);
  await pending.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ success: true }),
  });
  await expect(page.locator('[role="status"]')).toContainText("شکریہ");
  await english(page).click();
  await expect(page.locator('[role="status"]')).toContainText(
    "Your message was sent",
  );
});

test("dialogs and preview selection survive language switches with focus restored", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Project details", exact: true })
    .click();
  await page.locator(".project-novaworks .preview-enlarge").click();
  const dialog = page.getByRole("dialog");
  await dialog.evaluate((e) => {
    e.dataset.identity = "preserved";
  });
  await dialog.locator(".language-toggle").click();
  await expect(dialog).toHaveAttribute("data-identity", "preserved");
  await expect(dialog.locator("img")).toHaveAttribute(
    "src",
    "/projects/novaworks-project.png",
  );
  await expect(
    page.locator(
      '.project-novaworks .preview-switch button[aria-pressed="true"]',
    ),
  ).toHaveText("منصوبے کی تفصیل");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(
    page.locator(".project-novaworks .preview-enlarge"),
  ).toBeFocused();
  await page.locator(".hero-actions button").click();
  await expect(page.getByRole("dialog").locator("iframe")).toHaveAttribute(
    "src",
    "/resume.pdf",
  );
  await page.getByRole("dialog").locator(".language-toggle").click();
  await expect(page.getByRole("dialog").locator("h2")).toHaveText("Resume");
  await page.keyboard.press("Escape");
  await expect(page.locator(".hero-actions button")).toBeFocused();
});

test("unavailable storage, failed Urdu font, and forced colors retain a usable page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    }),
  );
  await page.route("**/fonts/noto-naskh-arabic.woff2", (route) =>
    route.abort(),
  );
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/?lang=ur");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("#work h2")).toBeVisible();
  expect(
    await page
      .locator(".g-text")
      .evaluate((e) => getComputedStyle(e).webkitTextFillColor),
  ).not.toBe("rgba(0, 0, 0, 0)");
  await english(page).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("Urdu motion and a short mobile menu remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 600 });
  await page.goto("/?lang=ur");
  const art = page.locator(".sculpture-fallback");
  await art.scrollIntoViewIfNeeded();
  const transform = () => art.evaluate((e) => getComputedStyle(e).transform);
  const before = await transform();
  await page.waitForTimeout(400);
  expect(await transform()).not.toBe(before);
  await page.locator(".motion-control").click();
  await expect(page.locator(".portfolio-shell")).toHaveAttribute(
    "data-motion",
    "paused",
  );
  await english(page).click();
  await expect(page.locator(".portfolio-shell")).toHaveAttribute(
    "data-motion",
    "paused",
  );
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.locator(".ios-menu-socials a").last().scrollIntoViewIfNeeded();
  await expect(page.locator(".ios-menu-socials a").last()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeFocused();
});

test("section identities and navbar indicator survive locale and font changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .locator(".experience-row, .skill-group")
    .evaluateAll((elements) =>
      elements.forEach((e) => (e.dataset.identity = "preserved")),
    );
  await english(page).click();
  await expect(english(page)).toBeFocused();
  await page.evaluate(() => document.fonts.ready);
  for (const item of await page
    .locator(".experience-row, .skill-group")
    .all()) {
    await expect(item).toHaveAttribute("data-identity", "preserved");
  }
  for (const lang of ["ur", "en"]) {
    if (lang === "en") await english(page).click();
    await page.locator('.ios-desktop-links a[href="#work"]').hover();
    const indicator = page.locator(".ios-desktop-links .ios-selection-pill");
    const link = page.locator('.ios-desktop-links a[href="#work"]');
    await expect
      .poll(async () => {
        const a = await indicator.boundingBox(),
          b = await link.boundingBox();
        return Math.abs(a.x - b.x) + Math.abs(a.width - b.width);
      })
      .toBeLessThan(2);
  }
});
