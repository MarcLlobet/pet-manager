import { describe, it, expect, vi } from "vitest";
import { ERROR_MESSAGE_404, getPetsData } from "./getPetsData";
import { FetchingOptions } from "../../types";

const getMockCrossFetch = (data: unknown[]) => {
  return Promise.resolve({
    headers: {
      get: (key: string) => {
        const headersMap: Record<string, unknown> = {
          "x-total-count": data?.length,
        };
        return headersMap[key];
      },
    },
    json: () => Promise.resolve(data),
    status: 200,
  });
};

const mockCrossFetch = vi.fn((_) => getMockCrossFetch([{ id: 1, name: "Bingo" }]));

vi.mock("cross-fetch", () => ({
  default: (url: string) => mockCrossFetch(url),
}));

describe("getPetsData", () => {
  it("fetches pets data with correct state", async () => {
    const state = { _page: 1, _limit: 5, _sort: "id", _order: "asc" };
    const result = await getPetsData(state as FetchingOptions);
    expect(result.pets).toEqual([{ id: 1, name: "Bingo", health: "unhealthy" }]);
    expect(result.totalPets).toBe(1);
  });

  it("handles 404 errored request", async () => {
    mockCrossFetch.mockImplementationOnce(() =>
      Promise.resolve({
        headers: {
          get: () => {},
        },
        json: () => Promise.resolve([]),
        status: 404,
      }),
    );

    await expect(getPetsData({} as FetchingOptions)).rejects.toThrow(ERROR_MESSAGE_404);
  });

  it("rejects failed request", async () => {
    const errorMessage = "Invalid request";

    mockCrossFetch.mockImplementationOnce(() => {
      throw new Error(errorMessage);
    });

    await expect(getPetsData({} as FetchingOptions)).rejects.toThrow(errorMessage);
  });
});
