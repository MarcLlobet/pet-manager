import { HealthyPet, Pet } from "../../../types";
import { getPetHealth } from "../getPetHealth";
import { PETS_API_URL } from "../getPetsEndpoint";
import fetch from "cross-fetch";

export const getPetData = async (id: number): Promise<HealthyPet> => {
  const response = await fetch(`${PETS_API_URL}/${id}`);
  const pet: Pet = await response.json();

  if (response.status === 404) {
    throw new Error(`Pet ${id} doesn't exist.`);
  }

  return {
    ...pet,
    health: getPetHealth(pet),
  };
};
