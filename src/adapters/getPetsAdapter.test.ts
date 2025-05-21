import { describe, it, expect } from "vitest";
import { getPetsAdapter, singlePetAdapter } from "./getPetsAdapter";
import { healthTypes } from "./getPetHealth";
import { PetRaw } from "../services/types";

describe("getPetsAdapter", () => {
  it("transforms a single pet correctly", () => {
    const mockPet: PetRaw = {
      id: 1,
      name: "Jade",
      kind: "dog",
      weight: 1000,
      height: 50,
      length: 100,
      photo_url: "url",
      description: "A friendly dog",
    };

    const result = singlePetAdapter(mockPet);

    expect(result).toEqual({
      id: 1,
      name: "Jade",
      kind: "dog",
      weight: 1000,
      height: 50,
      length: 100,
      image: { src: "url", alt: "Jade the dog" },
      health: healthTypes.unhealthy,
      description: "A friendly dog",
    });
  });

  it("transforms multiple pets correctly", () => {
    const mockPets: PetRaw[] = [
      {
        id: 1,
        name: "Jade",
        kind: "dog",
        weight: 1000,
        height: 50,
        length: 100,
        photo_url: "url1",
        description: "A friendly dog",
      },
      {
        id: 2,
        name: "Whiskers",
        kind: "cat",
        weight: 500,
        height: 30,
        length: 50,
        photo_url: "url2",
        description: "A curious cat",
        number_of_lives: 3,
      },
    ];

    const result = getPetsAdapter(mockPets);

    expect(result).toHaveLength(2);
    expect(result[0].image.alt).toBe("Jade the dog");
    expect(result[1].image.alt).toBe("Whiskers the cat");
  });
});
