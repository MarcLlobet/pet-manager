import { describe, expect, it, vi } from "vitest";

import { PETS_API_URL } from "./constants";
import { getPets } from "./getPets";
import { TOTAL_COUNT_HEADER } from "./tools/fetchService";

describe("getPets", () => {
  it("fetches pets successfully with correct params", async () => {
    const mockPets = [
      { id: 1, name: "Jade", kind: "dog", weight: 1000, height: 50, length: 100, photo_url: "", description: "" },
    ];
    const mockResponse = new Response(JSON.stringify(mockPets), {
      headers: { [TOTAL_COUNT_HEADER]: "1" },
    });

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await getPets({ _page: 1, _limit: 5 });
    expect(result.pets).toEqual(mockPets);
    expect(result.totalPets).toBe(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(`${PETS_API_URL}?_limit=5&_page=1`);
  });

  it("fetches pets successfully without params", async () => {
    const mockPets = [
      { id: 1, name: "Jade", kind: "dog", weight: 1000, height: 50, length: 100, photo_url: "", description: "" },
    ];
    const mockResponse = new Response(JSON.stringify(mockPets), {
      headers: { [TOTAL_COUNT_HEADER]: "1" },
    });

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await getPets();
    expect(result.pets).toEqual(mockPets);
    expect(result.totalPets).toBe(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(PETS_API_URL);
  });
});
