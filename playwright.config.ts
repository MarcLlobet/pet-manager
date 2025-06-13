import { defineConfig } from "@playwright/test";
import { PORT } from "./vite.config";

export default defineConfig({
  testDir: "./tests/integration",
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: `http://localhost:${PORT}`,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
  },
});
