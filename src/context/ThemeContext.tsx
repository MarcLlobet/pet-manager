import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
  useTheme as useStyledTheme,
} from "styled-components";

import React, { useEffect, useState } from "react";

import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  .MuiContainer-root {
    min-height: calc(100vh - 116px);
  }
`;

const muiLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d219ce",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h6: {
      fontWeight: 600,
    },
    body2: {
      color: "#555555",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "#e0e0e0",
        },
        body: {
          fontSize: "0.875rem",
        },
      },
    },
  },
});

const muiDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1e1e1e",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h6: {
      fontWeight: 600,
    },
    body2: {
      color: "#aaaaaa",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "#333333",
        },
        body: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#4dabf7", // Nou color per als enllaços en dark mode
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
});

const lightTheme = {
  background: "#ffffff",
  color: "#000000",
  header: {
    background: "#e3f2fd",
    color: "#000000",
  },
  footer: {
    color: "#fff",
    background: "#1e1e1e",
  },
};

const darkTheme = {
  background: "#000000",
  color: "#ffffff",
  header: {
    background: "#1e1e1e",
    color: "#ffffff",
  },
  footer: {
    background: "#1e1e1e",
    color: "#ffffff",
  },
};

export type ThemeContext = DefaultTheme & { toggleTheme: () => void };

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme,
  );
  const [muiTheme, setMuiTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? muiDarkTheme : muiLightTheme,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setTheme(mediaQuery.matches ? darkTheme : lightTheme);
      setMuiTheme(mediaQuery.matches ? muiDarkTheme : muiLightTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
    setMuiTheme((prevMuiTheme) => (prevMuiTheme === muiLightTheme ? muiDarkTheme : muiLightTheme));
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={{ ...theme, toggleTheme } as ThemeContext}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export const useTheme = () => useStyledTheme() as ThemeContext;
