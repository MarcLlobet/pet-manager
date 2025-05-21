import { PetRaw } from "../services/types";
import { PetListInfo } from "../types";
import { getPetHealth } from "./getPetHealth";

export const singlePetAdapter = (pet: PetRaw): PetListInfo => {
  const { photo_url, ...detailData } = pet;

  const image = {
    src: photo_url,
    alt: `${pet.name} the ${pet.kind}`,
  };

  return {
    image,
    health: getPetHealth(pet),
    ...detailData,
  };
};

export const getPetsAdapter = (petsRaw: PetRaw[]): PetListInfo[] => petsRaw.map(singlePetAdapter);
