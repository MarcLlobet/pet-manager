import { describe, it, expect } from "vitest";
import { getMockedPetsData, getMockedPetIdData } from "./index";
import mockPetsData from "../mocks/mockPetsData.json";

const BASE_URL = "http://localhost/pets";

describe("getMockedPetsData", () => {
  it("retorna totes les mascotes si no hi ha paràmetres", () => {
    const result = getMockedPetsData(BASE_URL);
    expect(result).toEqual(mockPetsData);
  });

  it("fa el sort ascendent per id", () => {
    const url = `${BASE_URL}?_sort=id&_order=asc`;
    const result = getMockedPetsData(url);
    const sorted = [...mockPetsData].sort((a, b) => a.id - b.id);
    expect(result).toEqual(sorted);
  });

  it("fa el sort descendent per id", () => {
    const url = `${BASE_URL}?_sort=id&_order=desc`;
    const result = getMockedPetsData(url);
    const sorted = [...mockPetsData].sort((a, b) => b.id - a.id);
    expect(result).toEqual(sorted);
  });

  it("fa el sort ascendent per string (name)", () => {
    const url = `${BASE_URL}?_sort=name&_order=asc`;
    const result = getMockedPetsData(url);
    const sorted = [...mockPetsData].sort((a, b) => a.name.localeCompare(b.name));
    expect(result).toEqual(sorted);
  });

  it("aplica el limit i el page", () => {
    const url = `${BASE_URL}?_limit=2&_page=2`;
    const result = getMockedPetsData(url);
    const expected = mockPetsData.slice(2, 4); // 2 per pàgina, pàgina 2
    expect(result).toEqual(expected);
  });
});

describe("getMockedPetIdData", () => {
  it("retorna la mascota pel seu id", () => {
    const pet = mockPetsData[0];
    const url = `${BASE_URL}/${pet.id}`;
    const result = getMockedPetIdData(url);
    expect(result).toEqual(pet);
  });

  it("retorna undefined si no existeix l'id", () => {
    const url = `${BASE_URL}/999999`;
    const result = getMockedPetIdData(url);
    expect(result).toBeUndefined();
  });
});
