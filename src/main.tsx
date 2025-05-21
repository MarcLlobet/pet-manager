import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import React, { StrictMode } from "react";

import { AppStateProvider } from "./context/AppContext";
import { AppRoutes } from "./context/Routes";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppStateProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AppStateProvider>
    </BrowserRouter>
  </StrictMode>,
);
