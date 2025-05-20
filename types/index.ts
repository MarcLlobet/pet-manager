import { healthTypes } from "../pages/index/getPetHealth";

export type SortType = "id" | "weight" | "height" | "length" | "name";
export type OrderType = "asc" | "desc";
export type LimitType = 5 | 10;

export type FetchingOptions = {
  _sort: SortType;
  _page: number;
  _limit: LimitType;
  _order: OrderType;
};

export type PetKind = "cat" | "dog";

export type PetCommonProps = {
  id: number;
  name: string;
  weight: number;
  height: number;
  length: number;
  photo_url: string;
  description: string;
};

export type Dog = PetCommonProps & {
  kind: "dog";
};

export type Cat = PetCommonProps & {
  kind: "cat";
  number_of_lives: number;
};

export type Pet = Dog | Cat;

export type HealthTypes = (typeof healthTypes)[keyof typeof healthTypes];

export type HealthyPet = Pet & {
  health: HealthTypes;
};

export type PetKindToPet = {
  [P in Pet as P["kind"]]: P;
};
