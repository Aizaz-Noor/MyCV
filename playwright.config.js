import { defineConfig } from "@playwright/test";
const browserName = process.env.PLAYWRIGHT_BROWSER || "chromium";
const executablePath = browserName === "chromium" ? process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH : undefined;
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    browserName,
    baseURL: "http://127.0.0.1:4173",
    launchOptions: executablePath
      ? {
          executablePath,
          args: ["--disable-gpu", "--enable-unsafe-swiftshader"],
        }
      : {},
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
});
