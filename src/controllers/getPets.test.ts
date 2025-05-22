import { describe, expect, it, vi } from "vitest";

import { getPets } from "./getPets";
import { getPets as getPetsService } from "../services/getPets";
import { getPetsAdapter } from "../adapters/getPetsAdapter";
import { PetRaw } from "../services/types";
import { PetListInfo } from "../types";

vi.mock("../services/getPets");
vi.mock("../adapters/getPetsAdapter");

describe("getPets controller", () => {
  it("should fetch and adapt pets data correctly", async () => {
    const mockPetsData = {
      id: 1,
      name: "Jade",
      kind: "dog",
      photo_url: "img.jpg",
      health: "healthy",
      weight: 10,
      height: 12,
      length: 14,
      description: "bub bub",
    } as PetRaw;
    const mockAdaptedData = {
      id: 1,
      name: "Jade",
      kind: "dog",
      image: { src: "img.jpg", alt: "Jade the dog" },
      health: "healthy",
      weight: 10,
      height: 12,
      length: 14,
      description: "bub bub",
    } as PetListInfo;

    vi.mocked(getPetsService).mockResolvedValue({ pets: [mockPetsData], totalPets: 1 });
    vi.mocked(getPetsAdapter).mockReturnValue([mockAdaptedData]);

    const result = await getPets({ _page: 1, _limit: 5 });

    expect(getPetsService).toHaveBeenCalledWith({ _page: 1, _limit: 5 });
    expect(getPetsAdapter).toHaveBeenCalledWith([mockPetsData]);
    expect(result).toEqual({ pets: [mockAdaptedData], totalPets: 1 });
  });

  it("should throw an error if the service fails", async () => {
    vi.mocked(getPetsService).mockRejectedValue(new Error("Service error"));

    await expect(getPets({})).rejects.toThrow("Service error");
  });
});
