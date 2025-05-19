import { describe, it, expect } from "vitest";
import { getPetsEndpoint, PETS_API_URL } from "./getPetsEndpoint";
import { FetchingOptions } from "../../types";

describe("getPetsEndpoint", () => {
  it("returns baseUrl as Pet endpoint", () => {
    const result = getPetsEndpoint({} as FetchingOptions);

    expect(result).toEqual(expect.stringContaining(PETS_API_URL));
  });

  it("returns the correct URL with sorted query parameters", () => {
    const params: FetchingOptions = { _sort: "id", _page: 4, _limit: 10, _order: "asc" };
    const result = getPetsEndpoint(params);

    expect(result).toEqual(expect.stringContaining(`?_limit=10&_order=asc&_page=4&_sort=id`));
  });

  it("returns no question mark if empty", () => {
    const result = getPetsEndpoint({} as FetchingOptions);

    expect(result).toBe(PETS_API_URL);
  });
});
