export const getSearchParams = (params: Record<string, unknown>) => {
  const stringifiedParams = Object.entries(params).map(([searchParamKey, searchParamValue]) => [
    searchParamKey,
    `${searchParamValue}`,
  ]);

  const searchParams = new URLSearchParams(stringifiedParams);

  searchParams.sort();

  return searchParams.toString();
};

type FetchServiceProps = {
  url: string;
  errorMessage: string;
  params?: Record<string, unknown>;
};

type FetchServiceResponse = {
  response: Response;
  data: unknown;
};

export const fetchService = async ({ url, errorMessage, params }: FetchServiceProps): Promise<FetchServiceResponse> => {
  const fetchUrl = params ? `${url}?${getSearchParams(params)}` : url;

  const response = await fetch(fetchUrl);
  const data = await response.json();

  if (data.status === 404) {
    throw new Error(errorMessage);
  }

  return {
    data,
    response,
  };
};
