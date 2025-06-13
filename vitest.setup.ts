import { beforeEach, vi } from "vitest";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";

import { PETS_API_URL, TOTAL_COUNT_HEADER } from "./src/services/constants";
import { localStore } from "./src/services/tools/localStore";
import { sessionStore } from "./src/services/tools/sessionStore";
import { getMockedPetIdData, getMockedPetsData, mockPetsDataTotal } from "./tests/mocks";

export const actualFetch = globalThis.fetch;

globalThis.fetch = vi.fn((urlProp: string | URL | RequestInfo) => {
  const url = urlProp.toString();

  if (url === PETS_API_URL) {
    const mockPetsData = getMockedPetsData(url);

    return Promise.resolve(
      new Response(JSON.stringify(mockPetsData), {
        status: 200,
        headers: {
          [TOTAL_COUNT_HEADER]: mockPetsDataTotal,
        },
      }),
    );
  }

  if (url.startsWith(`${PETS_API_URL}/`)) {
    const mockPetData = getMockedPetIdData(url);

    return Promise.resolve(
      new Response(JSON.stringify(mockPetData), {
        status: 200,
      }),
    );
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
