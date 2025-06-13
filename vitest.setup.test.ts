import { describe, it, expect, beforeEach, vi } from "vitest";
import { PETS_API_URL } from "./src/services/constants";
import mockPetsData from "./tests/mocks/mockPetsData.json";

describe("Check vitest setup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all pets mock data", async () => {
    const res = await fetch(PETS_API_URL);
    expect(res.status).toBe(200);
    expect(res.headers.get("x-total-count")).toBe(`${mockPetsData.length}`);
    const data = await res.json();
    expect(data).toEqual(mockPetsData);
  });

  it("returns pet id mock data", async () => {
    const pet = mockPetsData[0];
    const res = await fetch(`${PETS_API_URL}/${pet.id}`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual(pet);
  });

  it("returns 404 for unexistent endpoint", async () => {
    const res = await fetch("/api/unknown");
    expect(res.status).toBe(404);
    expect(res.statusText).toBe("Not Found");
  });
});
