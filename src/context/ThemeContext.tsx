import { createGlobalStyle } from "styled-components";

import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, Theme, useTheme as useMuiTheme } from "@mui/material/styles";
import { localStore } from "../services/tools/localStore";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  .MuiContainer-root {
    min-height: calc(100vh - 116px);
  }
`;

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f00",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0ff",
    },
  },
});

const themeMap = {
  light: lightTheme,
  dark: darkTheme,
};

const PREFERS_DARK_MODE_KEY = "Prefers_Dark_Mode";
const getPrefersDarkMode = () => {
  const hasPrefersDarkMode = localStore.get(PREFERS_DARK_MODE_KEY);
  if (hasPrefersDarkMode) {
    return true;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(getPrefersDarkMode());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setPrefersDarkMode((prevState) => {
        localStore.set(PREFERS_DARK_MODE_KEY, !prevState);
        return !prevState;
      });
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setPrefersDarkMode((prevState) => {
      localStore.set(PREFERS_DARK_MODE_KEY, !prevState);
      return !prevState;
    });
  };

  const theme = prefersDarkMode ? themeMap.dark : themeMap.light;

  return (
    <MuiThemeProvider theme={{ ...theme, toggleTheme }}>
      <GlobalStyle />
      {children}
    </MuiThemeProvider>
  );
};

type ThemeContextProps = () => Theme & { toggleTheme: () => void };

export const useTheme: ThemeContextProps = useMuiTheme;
