import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/integration",
  timeout: 30000,
  retries: 1,
  globalSetup: "./tests/setup/globalSetup.ts",
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
  },
});
