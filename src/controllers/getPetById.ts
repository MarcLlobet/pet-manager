import { getPetByIdAdapter } from "../adapters/getPetByIdAdapter";
import { getPetById as getPetByIdService } from "../services/getPetById";

export const getPetById = async (id: number) => {
  const petData = await getPetByIdService(id);
  const pet = getPetByIdAdapter(petData);
  return pet;
};
