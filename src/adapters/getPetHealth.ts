import { Cat, PetKind, PetRaw } from "../services/types";

export type HealthyPet = PetRaw & {
  health: HealthTypes;
};

export type PetKindToPet = {
  [P in PetRaw as P["kind"]]: P;
};

export const healthTypes = {
  unhealthy: "unhealthy",
  healthy: "healthy",
  veryHealthy: "very healthy",
} as const;

export type HealthTypes = (typeof healthTypes)[keyof typeof healthTypes];

type CustomHealthMap = Partial<{
  [K in PetKind]: (pet: PetKindToPet[K]) => HealthTypes;
}>;

export const getCatHealth = (cat: Cat) => (cat.number_of_lives !== 1 ? getDefaultHealth(cat) : healthTypes.unhealthy);

export const customHealthMap: CustomHealthMap = {
  cat: getCatHealth,
};

export const getHealthType = (healthAmount: number) => {
  if (healthAmount >= 3 && 5 >= healthAmount) {
    return healthTypes.healthy;
  }

  if (healthAmount > 2 && healthAmount < 3) {
    return healthTypes.veryHealthy;
  }
  return healthTypes.unhealthy;
};

export const getHealthAmount = (pet: PetRaw) => pet.weight / (pet.height * pet.length);

export const getDefaultHealth = (pet: PetRaw) => {
  const healthAmount = getHealthAmount(pet);
  const healthType = getHealthType(healthAmount);
  return healthType;
};

export const getPetHealth = <K extends PetKind>(pet: PetKindToPet[K]) => {
  const healthFunction = customHealthMap?.[pet.kind as K] ?? getDefaultHealth;
  return healthFunction(pet);
};
