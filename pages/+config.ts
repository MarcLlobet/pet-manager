import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import vikeReactStyledComponents from "vike-react-styled-components/config";
import Layout from "../layouts/LayoutDefault";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: "Fever pets",

  description: "Fever pets showcase",
  extends: [vikeReact, vikeReactStyledComponents],
  prerender: true,
} satisfies Config;
