import { Store } from "./types";

const getNoneStorage = (_: string | number): null => {
  return null;
};

const setNoneStorage = (_: string | number, _2: unknown): void => {};

const clearNoneStorage = (): void => {};

export const noneStore = {
  get: getNoneStorage,
  set: setNoneStorage,
  clear: clearNoneStorage,
} satisfies Store;
