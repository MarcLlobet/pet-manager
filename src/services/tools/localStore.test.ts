import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { localStore, LOCAL_PREFIX_KEY } from "./localStore";

describe("localStorage service", () => {
  const key = "testKey";
  const value = { data: "testValue" };

  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  afterAll(() => {
    globalThis.localStorage.clear();
  });

  it("should set an item in localStorage", () => {
    localStore.set(key, value);
    const rawData = globalThis.localStorage.getItem(`${LOCAL_PREFIX_KEY}_${key}`);
    expect(rawData).toEqual(JSON.stringify(value));
  });

  it("should get an item from localStorage", () => {
    globalThis.localStorage.setItem(`${LOCAL_PREFIX_KEY}_${key}`, JSON.stringify(value));
    const result = localStore.get(key);

    expect(result).toEqual(value);
  });

  it("should clear all items with the prefix from localStorage", () => {
    globalThis.localStorage.setItem(`${LOCAL_PREFIX_KEY}_${key}`, JSON.stringify(value));
    globalThis.localStorage.setItem("OTHER_KEY", "otherValue");

    localStore.clear();

    expect(globalThis.localStorage).toHaveProperty("OTHER_KEY");
    expect(globalThis.localStorage).not.toHaveProperty(`${LOCAL_PREFIX_KEY}_${key}`);
  });
});
