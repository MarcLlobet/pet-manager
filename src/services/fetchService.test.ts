import { describe, it, expect, vi } from "vitest";
import { fetchService, getSearchParams } from "./fetchService";

describe("fetchService", () => {
  it("fetches data successfully with params", async () => {
    const mockData = { message: "success" };
    const mockResponse = new Response(JSON.stringify(mockData));

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await fetchService({
      url: "https://example.com",
      errorMessage: "Error occurred",
      params: { key: "value" },
    });

    expect(result.data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith("https://example.com?key=value");
  });

  it("throws an error when the response status is 404", async () => {
    const mockResponse = new Response(JSON.stringify({ status: 404 }), { status: 404 });

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(
      fetchService({
        url: "https://example.com",
        errorMessage: "Error occurred",
      }),
    ).rejects.toThrow("Error occurred");
  });
});

describe("getSearchParams", () => {
  it("converts an object to a sorted query string", () => {
    const params = { b: "2", a: "1" };
    const result = getSearchParams(params);
    expect(result).toBe("a=1&b=2");
  });
});
