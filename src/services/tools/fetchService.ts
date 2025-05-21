import { localStore } from "./localStore";
import { noneStore } from "./noneStore";
import { sessionStore } from "./sessionStore";

export const TOTAL_COUNT_HEADER = "x-total-count";
export const getSearchParams = (params: Record<string, unknown>) => {
  const stringifiedParams = Object.entries(params).map(([searchParamKey, searchParamValue]) => [
    searchParamKey,
    `${searchParamValue}`,
  ]);

  const searchParams = new URLSearchParams(stringifiedParams);

  searchParams.sort();

  return searchParams.toString();
};

const storageMap = {
  session: sessionStore,
  local: localStore,
  none: noneStore,
} as const;

type RawFetchProps = {
  url: string;
  errorMessage: string;
};

type FetchServiceProps = RawFetchProps & {
  params?: Record<string, unknown>;
  mode?: keyof typeof storageMap;
};

type FetchServiceResponse = {
  total: number | string;
  data: unknown;
};

type GetUrlProps = {
  url: string;
  params?: Record<string, unknown>;
};

export const getUrl = ({ url, params }: GetUrlProps) => (params ? `${url}?${getSearchParams(params)}` : url);

export const rawFetch = async ({ url, errorMessage }: RawFetchProps) => {
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 404) {
    throw new Error(errorMessage);
  }

  const total = response.headers.get(TOTAL_COUNT_HEADER) ?? 0;

  return {
    data,
    total,
  };
};

export const fetchService = async ({
  url,
  errorMessage,
  params,
  mode,
}: FetchServiceProps): Promise<FetchServiceResponse> => {
  const fullUrl = getUrl({ url, params });

  const storage = mode ? storageMap[mode] : storageMap.none;

  const sessionUrlData = storage.get(fullUrl);
  if (sessionUrlData) {
    return sessionUrlData;
  }
  const fetchedData = await rawFetch({ url: fullUrl, errorMessage });

  storage.set(fullUrl, fetchedData);

  return fetchedData;
};
