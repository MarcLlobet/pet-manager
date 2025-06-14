import React, { createContext, useContext, useState } from "react";

import { FetchingOptions } from "../types";

export const initialData = {
  _sort: "id",
  _order: "asc",
  _page: 1,
  _limit: 5,
} as FetchingOptions;

export const AppStateContext = createContext<{
  state: FetchingOptions;
  setState: React.Dispatch<React.SetStateAction<FetchingOptions>>;
} | null>(null);

export const AppStateProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, setState] = useState<FetchingOptions>(initialData);
  return <AppStateContext.Provider value={{ state, setState }}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
};
