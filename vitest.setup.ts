import { beforeEach, vi } from "vitest";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";

import { TOTAL_COUNT_HEADER } from "./src/services/constants";
import { localStore } from "./src/services/tools/localStore";
import { sessionStore } from "./src/services/tools/sessionStore";
import { getMockedPetIdData, getMockedPetsData, mockPetsDataTotal } from "./tests/mocks";

export const actualFetch = globalThis.fetch;

const getFetchResponse = ({ data, headers }: { data: unknown; headers?: object }) =>
  Promise.resolve({
    json: () => Promise.resolve(data),
    status: 200,
    headers: {
      get: (headerName: string) => {
        const mapHeaders: Record<string, string> = {
          ...(headers ?? {}),
        };
        return mapHeaders?.[headerName];
      },
    },
  } as Response);

export const regExpByEndpoint = {
  allPets: /pets(\?(.+=.+)+&?)?/,
  petId: /pets\/(\d)+/,
};

globalThis.fetch = vi.fn((urlProp: RequestInfo | URL): Promise<Response> => {
  const url = urlProp as string;
  const { pathname } = new URL(url);

  if (regExpByEndpoint.petId.test(pathname)) {
    return getFetchResponse({
      data: getMockedPetIdData(url),
    });
  }

  if (regExpByEndpoint.allPets.test(pathname)) {
    return getFetchResponse({
      data: getMockedPetsData(url),
      headers: {
        [TOTAL_COUNT_HEADER]: mockPetsDataTotal,
      },
    });
  }

  return Promise.resolve(
    new Response(null, {
      status: 404,
      statusText: "Not Found",
    }),
  );
});

beforeEach(() => {
  sessionStore.clear();
  localStore.clear();
});
