import { PETS_API_URL } from "./constants";
import { fetchService } from "./tools/fetchService";
import { PetRaw } from "./types";

export const ERROR_MESSAGE = `Pets not found`;

export type GetPetsResponse = {
  pets: PetRaw[];
  totalPets: number;
};

export const getPets = async (params?: Record<string, string | number>): Promise<GetPetsResponse> => {
  const { data, total } = await fetchService({
    url: PETS_API_URL,
    errorMessage: ERROR_MESSAGE,
    params,
    mode: "session",
  });

  return {
    pets: data as PetRaw[],
    totalPets: total,
  };
};
