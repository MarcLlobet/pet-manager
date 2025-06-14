import { describe, expect, it, vi } from "vitest";

import { PETS_API_URL } from "./constants";
import { ERROR_MESSAGE, getPetById } from "./getPetById";

describe("getPetById", () => {
  it("fetches a pet successfully by ID", async () => {
    const mockPet = {
      id: 1,
      name: "Jade",
      kind: "dog",
      weight: 1000,
      height: 50,
      length: 100,
      photo_url: "",
      description: "",
    };
    const mockResponse = new Response(JSON.stringify(mockPet));

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await getPetById(1);
    expect(result).toEqual(mockPet);
    expect(globalThis.fetch).toHaveBeenCalledWith(`${PETS_API_URL}/1`);
  });

  it("throws an error when the pet is not found", async () => {
    const mockResponse = new Response(JSON.stringify({ status: 404 }), { status: 404 });

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(getPetById(999)).rejects.toThrow(ERROR_MESSAGE);
  });
});
