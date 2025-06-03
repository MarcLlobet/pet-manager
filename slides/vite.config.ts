import { defineConfig } from "vite";
import type { UserConfig } from "vite";

export default defineConfig({
  root: "slides",
  server: {
    port: 8010,
  },
} as UserConfig);
