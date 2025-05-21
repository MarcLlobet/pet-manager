import { getPetsAdapter } from "../adapters/getPetsAdapter";
import { getPets as getPetsService } from "../services/getPets";

export const getPets = async (params?: Record<string, string | number>) => {
  const { pets: petsData, totalPets } = await getPetsService(params);
  const pets = getPetsAdapter(petsData);

  return {
    pets,
    totalPets,
  };
};
