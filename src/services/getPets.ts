import { PETS_API_URL } from "./constants";
import { fetchService } from "./fetchService";
import { PetRaw } from "./types";

export const ERROR_MESSAGE = `Pets not found`;
export const TOTAL_COUNT_HEADER = "x-total-count";

export type GetPetsResponse = {
  pets: PetRaw[];
  totalPets: number;
};

export const getPets = async (params?: Record<string, string | number>): Promise<GetPetsResponse> => {
  const { data, response } = await fetchService({
    url: PETS_API_URL,
    errorMessage: ERROR_MESSAGE,
    params,
  });

  const totalPets = response.headers.get(TOTAL_COUNT_HEADER);

  return {
    pets: data as PetRaw[],
    totalPets: totalPets ? Number(totalPets) : 0,
  };
};
