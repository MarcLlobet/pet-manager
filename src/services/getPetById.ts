import { PETS_API_URL } from "./constants";
import { fetchService } from "./fetchService";
import { PetRaw } from "./types";

export const ERROR_MESSAGE = "Pet not found";

export const getPetById = async (id: number): Promise<PetRaw> => {
  const { data } = await fetchService({
    url: `${PETS_API_URL}/${id}`,
    errorMessage: ERROR_MESSAGE,
  });

  return data as PetRaw;
};
