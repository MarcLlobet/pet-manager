import { render } from "vike/abort";
import { PageContext } from "vike/types";
import { ERROR_MESSAGE_404, getPetsData } from "./getPetsData";
import { initialData } from "../../renderer/usePageContext";

export const data = async (_: PageContext) => {
  try {
    const { pets, totalPets } = await getPetsData(initialData);
    return {
      pets,
      totalPets,
    };
  } catch {
    throw render(404, ERROR_MESSAGE_404);
  }
};
