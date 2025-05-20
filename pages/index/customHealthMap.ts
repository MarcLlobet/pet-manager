import type { Cat, HealthTypes, PetKind, PetKindToPet } from "../../types";
import { getDefaultHealth, healthTypes } from "./getPetHealth";

type CustomHealthMap = Partial<{
  [K in PetKind]: (pet: PetKindToPet[K]) => HealthTypes;
}>;

export const getCatHealth = (cat: Cat) => (cat.number_of_lives !== 1 ? getDefaultHealth(cat) : healthTypes.unhealthy);

export const customHealthMap: CustomHealthMap = {
  cat: getCatHealth,
};
