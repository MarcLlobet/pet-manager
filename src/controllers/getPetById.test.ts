import { describe, expect, it, vi } from "vitest";

import { getPetById } from "./getPetById";
import { getPetById as getPetByIdService } from "../services/getPetById";
import { getPetByIdAdapter } from "../adapters/getPetByIdAdapter";
import { PetRaw } from "../services/types";
import { PetDetailInfo } from "../types";

vi.mock("../services/getPetById");
vi.mock("../adapters/getPetByIdAdapter");

describe("getPetById controller", () => {
  it("should fetch and adapt pet data correctly", async () => {
    const mockPetData = {
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
      image: {
        src: "img.jpg",
        alt: "Jade the dog",
      },
      details: [
        { title: "id", value: 1 },
        { title: "name", value: "Jade" },
        { title: "kind", value: "dog" },
        { title: "health", value: "healthy" },
        { title: "weight", value: 10 },
        { title: "height", value: 12 },
        { title: "length", value: 14 },
        { title: "description", value: "bub bub" },
      ],
    } as PetDetailInfo;

    vi.mocked(getPetByIdService).mockResolvedValue(mockPetData);
    vi.mocked(getPetByIdAdapter).mockReturnValue(mockAdaptedData);

    const result = await getPetById(1);

    expect(getPetByIdService).toHaveBeenCalledWith(1);
    expect(getPetByIdAdapter).toHaveBeenCalledWith(mockPetData);
    expect(result).toEqual(mockAdaptedData);
  });

  it("should throw an error if the service fails", async () => {
    vi.mocked(getPetByIdService).mockRejectedValue(new Error("Service error"));

    await expect(getPetById(999)).rejects.toThrow("Service error");
  });
});
