import type { Pet, PetKind, PetKindToPet } from "../../types";
import { customHealthMap } from "./customHealthMap";

export const healthTypes = {
  unhealthy: "unhealthy",
  healthy: "healthy",
  veryHealthy: "very healthy",
} as const;

export const getHealthType = (healthAmount: number) => {
  if (healthAmount >= 3 && 5 >= healthAmount) {
    return healthTypes.healthy;
  }

  if (healthAmount > 2 && healthAmount < 3) {
    return healthTypes.veryHealthy;
  }
  return healthTypes.unhealthy;
};

export const getHealthAmount = (pet: Pet) => pet.weight / (pet.height * pet.length);

export const getDefaultHealth = (pet: Pet) => {
  const healthAmount = getHealthAmount(pet);
  const healthType = getHealthType(healthAmount);
  return healthType;
};

export const getPetHealth = <K extends PetKind>(pet: PetKindToPet[K]) => {
  const healthFunction = customHealthMap?.[pet.kind as K] ?? getDefaultHealth;
  return healthFunction(pet);
};
