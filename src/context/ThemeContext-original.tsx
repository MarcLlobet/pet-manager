import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, Theme, useTheme as useMuiTheme } from "@mui/material/styles";
import { localStore } from "../services/tools/localStore";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f00",
    },
    background: {
      default: "#fff",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0ff",
    },
    background: {
      default: "#000",
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
  console.log({ theme });
  return <MuiThemeProvider theme={{ ...theme, toggleTheme }}>{children}</MuiThemeProvider>;
};

type ThemeContextProps = () => Theme & { toggleTheme: () => void };

export const useTheme: ThemeContextProps = useMuiTheme;
