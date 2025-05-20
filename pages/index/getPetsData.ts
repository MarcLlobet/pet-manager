import fetch from "cross-fetch";
import { FetchingOptions, HealthyPet, Pet } from "../../types";
import { getPetHealth } from "./getPetHealth";
import { getPetsEndpoint } from "./getPetsEndpoint";

export type GetPetsData = {
  pets: HealthyPet[];
  totalPets: number;
};

export const ERROR_MESSAGE_404 = `Pets doesn't exist.`;

export const getPetsData = async (fetchingOptions: FetchingOptions): Promise<GetPetsData> => {
  const petsEndpoint = getPetsEndpoint(fetchingOptions);

  const response = await fetch(petsEndpoint);
  const pets: Pet[] = await response.json();
  const totalPets = response.headers.get("x-total-count");

  const healthyPets = pets.map((pet) => ({
    ...pet,
    health: getPetHealth(pet),
  }));

  if (response.status === 404) {
    throw new Error(ERROR_MESSAGE_404);
  }

  return {
    pets: healthyPets,
    totalPets: totalPets ? Number(totalPets) : 0,
  };
};
