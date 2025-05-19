export { data };

import type { PageContext } from "vike/types";
import { getPetHealth } from "../getPetHealth";
import { getPetData } from "./getPetData";
import { render } from "vike/abort";

async function data(pageContext: PageContext) {
  const { id } = pageContext.routeParams;
  try {
    const petData = await getPetData(Number(id));

    return {
      ...petData,
      health: getPetHealth(petData),
    };
  } catch {
    render(404, `Error fetching Pet ${id}`);
  }
}
