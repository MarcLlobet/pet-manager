import { Store } from "./types";

export const LOCAL_PREFIX_KEY = "Local_FP";

const getLocalStorage = (key: string | number) => {
  const storedData = localStorage.getItem(`${LOCAL_PREFIX_KEY}_${key}`);
  return storedData ? JSON.parse(storedData) : null;
};

const setLocalStorage = (key: string | number, value: unknown) =>
  localStorage.setItem(`${LOCAL_PREFIX_KEY}_${key}`, JSON.stringify(value));

const clearLocalStorage = () => {
  Object.keys(localStorage).forEach((localKey) => {
    if (localKey.startsWith(LOCAL_PREFIX_KEY)) {
      localStorage.removeItem(localKey);
    }
  });
};

export const localStore = {
  get: getLocalStorage,
  set: setLocalStorage,
  clear: clearLocalStorage,
} satisfies Store;
