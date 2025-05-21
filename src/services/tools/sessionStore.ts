import { Store } from "./types";

export const SESSION_PREFIX_KEY = "Session_FP";

const getSessionStorage = (key: string | number) => {
  const storedData = sessionStorage.getItem(`${SESSION_PREFIX_KEY}_${key}`);
  return storedData ? JSON.parse(storedData) : null;
};

const setSessionStorage = (key: string | number, value: unknown) =>
  sessionStorage.setItem(`${SESSION_PREFIX_KEY}_${key}`, JSON.stringify(value));

const clearSessionStorage = () => {
  Object.keys(sessionStorage).forEach((localKey) => {
    if (localKey.startsWith(SESSION_PREFIX_KEY)) {
      sessionStorage.removeItem(localKey);
    }
  });
};

export const sessionStore = {
  get: getSessionStorage,
  set: setSessionStorage,
  clear: clearSessionStorage,
} satisfies Store;
