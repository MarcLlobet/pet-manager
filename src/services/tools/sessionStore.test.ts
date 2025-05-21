import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { sessionStore, SESSION_PREFIX_KEY } from "./sessionStore";

describe("sessionStorage service", () => {
  const key = "testKey";
  const value = { data: "testValue" };

  beforeEach(() => {
    globalThis.sessionStorage.clear();
  });

  afterAll(() => {
    globalThis.sessionStorage.clear();
  });

  it("should set an item in sessionStorage", () => {
    sessionStore.set(key, value);
    const rawData = globalThis.sessionStorage.getItem(`${SESSION_PREFIX_KEY}_${key}`);
    expect(rawData).toEqual(JSON.stringify(value));
  });

  it("should get an item from sessionStorage", () => {
    globalThis.sessionStorage.setItem(`${SESSION_PREFIX_KEY}_${key}`, JSON.stringify(value));
    const result = sessionStore.get(key);

    expect(result).toEqual(value);
  });

  it("should clear all items with the prefix from sessionStorage", () => {
    globalThis.sessionStorage.setItem(`${SESSION_PREFIX_KEY}_${key}`, JSON.stringify(value));
    globalThis.sessionStorage.setItem("OTHER_KEY", "otherValue");

    sessionStore.clear();

    expect(globalThis.sessionStorage).toHaveProperty("OTHER_KEY");
    expect(globalThis.sessionStorage).not.toHaveProperty(`${SESSION_PREFIX_KEY}_${key}`);
  });
});
