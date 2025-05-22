import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { localStore } from "../services/tools/localStore";

const ThemeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
});

const PREFERS_THEME_MODE_KEY = "Prefers_Theme_Mode";

const getStoredTheme = () => {
  const prefersTheme = localStore.get(PREFERS_THEME_MODE_KEY);
  if (prefersTheme) {
    return prefersTheme;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
};

const toggleMode = (mode: "light" | "dark") => (mode === "light" ? "dark" : "light");

const lightThemeConfig = {
  palette: {
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
};

const darkThemeConfig = {
  palette: {
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
  },
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = getStoredTheme;
  const [mode, setMode] = useState<"light" | "dark">(storedTheme);

  const toggleTheme = () => {
    localStore.set(PREFERS_THEME_MODE_KEY, toggleMode(mode));
    setMode((prevMode) => toggleMode(prevMode));
  };

  const theme = useMemo(() => createTheme(mode === "light" ? lightThemeConfig : darkThemeConfig), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
