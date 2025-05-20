import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/integration",
  timeout: 30000,
  retries: 1,
  globalSetup: "./tests/setup/globalSetup.ts", // Add this line
  use: {
    baseURL: "http://localhost:3000", // Adjust to your local dev server
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
  },
});
