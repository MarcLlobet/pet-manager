import mockPetsDataJson from "./mockPetsData.json" with { type: "json" };
import { PetRaw } from "../../src/services/types";

const mockPetsData = mockPetsDataJson as PetRaw[];

type Params = {
  _limit?: string;
  _page?: string;
  _order?: "asc" | "desc";
  _sort?: keyof PetRaw;
};

export const getMockedPetsData = (url: string): PetRaw[] => {
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;
  const params = Object.fromEntries(searchParams.entries());
  const { _limit, _page, _order, _sort } = params as Params;

  let response: PetRaw[] = [...mockPetsData] as PetRaw[];

  if (_sort && _order) {
    response = response.sort((a, b) => {
      const aValue = a[_sort];
      const bValue = b[_sort];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return _order === "asc" ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === "string" && typeof bValue === "string") {
        return _order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }

  if (_limit) {
    const limit = parseInt(_limit, 10);
    const page = _page ? parseInt(_page, 10) : 0;
    response = response.slice((page - 1) * limit, page * limit);
  }

  return response;
};

export const getMockedPetIdData = (url: string): PetRaw | undefined => {
  const urlObject = new URL(url);
  const petId = urlObject.pathname.split("/").at(-1);
  const mockPetData = mockPetsData.find((mockPet) => mockPet.id === Number(petId));

  return mockPetData;
};

export const mockPetsDataTotal = `${mockPetsData.length}`;
