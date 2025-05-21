import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-styled-components"]],
      },
    }),
  ],
  ssr: {
    noExternal: ["styled-components"],
  },
  build: {
    target: "es2022",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    include: ["**/?(*.)test.ts?(x)"],
  },
} as UserConfig);
