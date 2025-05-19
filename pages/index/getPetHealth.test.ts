import { describe, it, expect } from "vitest";
import { getDefaultHealth, getPetHealth, healthTypes } from "./getPetHealth";
import type { Pet } from "../../types";
import { getHealthAmount } from "./getPetHealth";

describe("getDefaultHealth", () => {
  it("returns 'healthy' for valid health amount", () => {
    const pet = { weight: 30, height: 2, length: 5, kind: "dog" };
    expect(getDefaultHealth(pet as Pet)).toBe(healthTypes.healthy);
  });

  it("returns 'very healthy' for high health amount", () => {
    const pet = { weight: 40, height: 3, length: 5, kind: "dog" };
    expect(getDefaultHealth(pet as Pet)).toBe(healthTypes.veryHealthy);
  });

  it("returns 'unhealthy' for low health amount", () => {
    const pet = { weight: 10, height: 2, length: 5, kind: "dog" };
    expect(getDefaultHealth(pet as Pet)).toBe(healthTypes.unhealthy);
  });
});

describe("getPetHealth", () => {
  it("uses custom health function if available", () => {
    const pet = { number_of_lives: 1, kind: "cat", weight: 10, height: 1, length: 1 };
    expect(getPetHealth(pet as Pet)).toBe(healthTypes.unhealthy);
  });

  it("falls back to default health function if no custom function exists", () => {
    const pet = { weight: 30, height: 2, length: 5, kind: "dog" };
    expect(getPetHealth(pet as Pet)).toBe(healthTypes.healthy);
  });
});

describe("getHealthAmount", () => {
  it("calculates health amount correctly", () => {
    const pet = { weight: 30, height: 2, length: 5 };
    expect(getHealthAmount(pet as Pet)).toBe(30 / (2 * 5));
  });
});
