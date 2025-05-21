import { HealthTypes } from "./adapters/getPetHealth";
import { PetCommonProps } from "./services/types";

export type SortType = "id" | "weight" | "height" | "length" | "name";
export type OrderType = "asc" | "desc";
export type LimitType = 5 | 10;

export type FetchingOptions = {
  _sort: SortType;
  _page: number;
  _limit: LimitType;
  _order: OrderType;
};

export type PetImage = {
  src: string;
  alt: string;
};

export type PetDetail = {
  key: string;
  title: string;
  value: string;
};

export type PetDetailInfo = {
  image: PetImage;
  details: PetDetail[];
};

export type PetListInfo = Omit<PetCommonProps, "photo_url"> & {
  image: PetImage;
  health: HealthTypes;
};
