import { createRoot } from "react-dom/client";

import React, { StrictMode } from "react";

import { AppStateProvider } from "./context/AppContext";
import { AppRoutes } from "./context/Routes";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppStateProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppStateProvider>
    </ThemeProvider>
  </StrictMode>,
);
