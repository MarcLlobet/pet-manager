import { FetchingOptions } from "../../types";

export const PETS_API_URL = `https://my-json-server.typicode.com/Feverup/fever_pets_data/pets`;

export const getPetsEndpoint = (params: FetchingOptions) => {
  const urlObject = new URL(PETS_API_URL);
  const paramsEntries = Object.entries(params);

  if (!paramsEntries.length) return urlObject.toString();

  const stringifiedParams = Object.entries(params).map(([searchParamKey, searchParamValue]) => [
    searchParamKey,
    `${searchParamValue}`,
  ]);

  const searchParams = new URLSearchParams(stringifiedParams);

  searchParams.sort();

  return `${urlObject}?${searchParams.toString()}`;
};
