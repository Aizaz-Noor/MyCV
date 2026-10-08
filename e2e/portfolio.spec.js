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
    for (const section of await page.locator("main > section").all())
      await section.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator("img")
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
    if (width < 768) {
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
    await page.getByRole("button", { name: "View résumé" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "View résumé" }),
    ).toBeFocused();
    await page
      .getByRole("button", { name: "Public landing", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Public landing", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByAltText(/LifeFlow public homepage/)).toBeVisible();
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
  await expect(page.getByRole("status")).toContainText("Your message was sent");
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
    page.getByRole("heading", { name: "LifeFlow", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tandem", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('a[href="mailto:aizaznoorkhuwaja@gmail.com"]'),
  ).toBeVisible();
  await context.close();
});
test("default page needs no WebGL and survives a blocked enhancement", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const graphicsRequests = [];
  page.on("request", (request) => {
    if (request.url().includes("Background3D"))
      graphicsRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Enable 3D" })).toBeVisible();
  expect(graphicsRequests).toEqual([]);
  await page.route("**/components/Background3D.jsx*", (route) => route.abort());
  await page.getByRole("button", { name: "Enable 3D" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore my work" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause 3D" }).click();
  await expect(page.getByRole("button", { name: "Enable 3D" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
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
