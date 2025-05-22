import { beforeEach, vi } from "vitest";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";

import { PETS_API_URL } from "./src/services/constants";
import mockPetsData from "./tests/mocks/mockPetsData.json";
import { localStore } from "./src/services/tools/localStore";
import { sessionStore } from "./src/services/tools/sessionStore";

export const actualFetch = globalThis.fetch;

globalThis.fetch = vi.fn((urlProp: string | URL | RequestInfo) => {
  const url = urlProp.toString();
  if (url === PETS_API_URL) {
    return Promise.resolve(
      new Response(JSON.stringify(mockPetsData), {
        status: 200,
        headers: { "x-total-count": `${mockPetsData.length}` },
      }),
    );
  }

  if (url.startsWith(`${PETS_API_URL}/`)) {
    const id = parseInt(url.split("/").pop() || "", 10);
    const pet = mockPetsData.find((pet) => pet.id === id);
    return Promise.resolve(
      new Response(JSON.stringify(pet), {
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
