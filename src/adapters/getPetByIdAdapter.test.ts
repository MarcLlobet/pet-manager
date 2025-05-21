import { describe, expect, it } from "vitest";

import { PetRaw } from "../services/types";
import { getPetByIdAdapter } from "./getPetByIdAdapter";
import { healthTypes } from "./getPetHealth";

describe("getPetByIdAdapter", () => {
  it("transforms pet data correctly", () => {
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

    const result = getPetByIdAdapter(mockPet);

    expect(result).toEqual({
      image: { src: "url", alt: "Jade the dog" },
      details: expect.arrayContaining([
        { key: "id", title: "Id", value: "1" },
        { key: "name", title: "Name", value: "Jade" },
        { key: "weight", title: "Weight", value: "1000 grams" },
        { key: "health", title: "Health", value: healthTypes.unhealthy },
      ]),
    });
  });

  it("handles cats with one life as unhealthy", () => {
    const mockCat: PetRaw = {
      id: 2,
      name: "Whiskers",
      kind: "cat",
      weight: 500,
      height: 30,
      length: 50,
      photo_url: "url",
      description: "A curious cat",
      number_of_lives: 1,
    };

    const result = getPetByIdAdapter(mockCat);

    expect(result.details).toContainEqual({
      key: "health",
      title: "Health",
      value: healthTypes.unhealthy,
    });
  });
});
