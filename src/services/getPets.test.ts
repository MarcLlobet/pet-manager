import { describe, it, expect, vi } from "vitest";
import { getPets, ERROR_MESSAGE, TOTAL_COUNT_HEADER } from "./getPets";
import { PETS_API_URL } from "./constants";

describe("getPets", () => {
  it("fetches pets successfully with correct params", async () => {
    const mockPets = [
      { id: 1, name: "Jade", kind: "dog", weight: 1000, height: 50, length: 100, photo_url: "", description: "" },
    ];
    const mockResponse = new Response(JSON.stringify(mockPets), {
      headers: { [TOTAL_COUNT_HEADER]: "1" },
    });

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await getPets({ _page: 1, _limit: 5 });
    expect(result.pets).toEqual(mockPets);
    expect(result.totalPets).toBe(1);
    expect(global.fetch).toHaveBeenCalledWith(`${PETS_API_URL}?_limit=5&_page=1`);
  });

  it("fetches pets successfully without params", async () => {
    const mockPets = [
      { id: 1, name: "Jade", kind: "dog", weight: 1000, height: 50, length: 100, photo_url: "", description: "" },
    ];
    const mockResponse = new Response(JSON.stringify(mockPets), {
      headers: { [TOTAL_COUNT_HEADER]: "1" },
    });

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await getPets();
    expect(result.pets).toEqual(mockPets);
    expect(result.totalPets).toBe(1);
    expect(global.fetch).toHaveBeenCalledWith(PETS_API_URL);
  });

  it("handles empty response gracefully", async () => {
    const mockResponse = new Response(JSON.stringify([]), {
      headers: { [TOTAL_COUNT_HEADER]: "0" },
    });

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await getPets({ _page: 1, _limit: 5 });
    expect(result.pets).toEqual([]);
    expect(result.totalPets).toBe(0);
  });

  it("throws an error when pets are not found", async () => {
    const mockResponse = new Response(JSON.stringify({ status: 404 }), { status: 404 });

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(getPets()).rejects.toThrow(ERROR_MESSAGE);
  });
});
