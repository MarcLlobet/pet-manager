export type Store = {
  get: (key: string | number) => unknown;
  set: (key: string | number, value: unknown) => void;
  clear: () => void;
};
