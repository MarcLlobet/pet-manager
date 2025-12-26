import { defineConfig } from "vite";
import type { UserConfig } from "vite";

import react from "@vitejs/plugin-react";

export const PORT = 5173;

export default defineConfig({
  base: "/pet-manager/",
  plugins: [react({})],
  ssr: {
    noExternal: ["@mui"],
  },
  build: {
    target: "es2022",
    rollupOptions: {},
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    include: ["**/?(*.)test.ts?(x)"],
  },
  server: {
    port: PORT,
  },
} as UserConfig);
