import { PetRaw } from "../services/types";
import { PetDetail, PetDetailInfo } from "../types";
import { getPetHealth } from "./getPetHealth";

const getCapitalized = (text: string) => {
  const txt = String(text).replace(/_/g, " ");
  const capitalized = txt.charAt(0).toUpperCase() + txt.slice(1);
  return capitalized;
};

const detailsMapper: Record<string, (data: number | string) => string> = {
  weight: (data) => `${data} grams`,
  height: (data) => `${data} cm`,
  length: (data) => `${data} cm`,
};

export const getPetByIdAdapter = (pet: PetRaw): PetDetailInfo => {
  const { photo_url, ...detailData } = pet;

  const image = {
    src: photo_url,
    alt: `${pet.name} the ${pet.kind}`,
  };

  const petDetailsList = Object.entries(detailData).map(([detailKey, detailValue]) => ({
    key: detailKey,
    title: getCapitalized(detailKey),
    value: detailKey in detailsMapper ? detailsMapper[detailKey](detailValue) : `${detailValue}`,
  }));

  const petExtraDetailsList = [
    {
      key: "health",
      title: "Health",
      value: getPetHealth(pet),
    },
  ];

  const details: PetDetail[] = [...petDetailsList, ...petExtraDetailsList];

  return {
    image,
    details,
  };
};
