import { describe, it, expect } from "vitest";
import { customHealthMap, getCatHealth } from "./customHealthMap";
import { healthTypes } from "./getPetHealth";
import type { Cat } from "../../types";

describe("getCatHealth", () => {
  it("returns 'unhealthy' for cats with one life", () => {
    const cat = { number_of_lives: 1, kind: "cat", weight: 10, height: 1, length: 1 };
    expect(getCatHealth(cat as Cat)).toBe(healthTypes.unhealthy);
  });

  it("uses default health for cats with more than one life", () => {
    const cat = { number_of_lives: 9, kind: "cat", weight: 30, height: 2, length: 5 };
    expect(getCatHealth(cat as Cat)).toBe(healthTypes.healthy);
  });
});

describe("customHealthMap", () => {
  it("returns 'unhealthy' for cats with one life", () => {
    const cat = { number_of_lives: 1, kind: "cat", weight: 10, height: 1, length: 1 };
    const getCatHealth = customHealthMap.cat!;
    expect(getCatHealth(cat as Cat)).toBe(healthTypes.unhealthy);
  });

  it("uses default health for cats with more than one life", () => {
    const cat = { number_of_lives: 9, kind: "cat", weight: 30, height: 2, length: 5 };
    const getCatHealth = customHealthMap.cat!;
    expect(getCatHealth(cat as Cat)).toBe(healthTypes.healthy);
  });
});
