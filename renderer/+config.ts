import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import vikeReactStyledComponents from "vike-react-styled-components/config";

// https://vike.dev/config
export default {
  // https://vike.dev/passToClient
  title: "Fever pets",
  description: "Fever pets showcase",
  extends: [vikeReact, vikeReactStyledComponents],
  clientRouting: true,
  meta: {
    Page: {
      env: { server: false, client: true },
    },
  },
} satisfies Config;
