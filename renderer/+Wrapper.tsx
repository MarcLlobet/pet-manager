import React from "react";
import "./style.css";
import { AppStateProvider, initialData } from "./usePageContext.js";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <AppStateProvider initialState={initialData}>{children}</AppStateProvider>;
}
