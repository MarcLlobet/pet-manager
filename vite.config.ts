import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import type { UserConfig } from "vite";

export default defineConfig({
  plugins: [
    vike(),
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

  vercel: {
    additionalEndpoints: [
      {
        // entry file to the server. Default export must be a node server or a function
        source: "express-entry.ts",
        // replaces default Vike target
        destination: "ssr_",
        // already added by default Vike route
        route: false,
      },
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    include: ["**/?(*.)test.ts?(x)"],
  },
} as UserConfig);
