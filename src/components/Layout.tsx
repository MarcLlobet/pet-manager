import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";

import { Header } from "./Header";
import { Footer } from "./Footer";
import GlobalStyles from "@mui/material/GlobalStyles";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            backgroundColor: theme.palette.background.default,
          },
        }}
      />
      <Box
        sx={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Container
          sx={{
            flexGrow: 1,
            width: {
              xs: "100%",
              sm: "90%",
              md: "80%",
              lg: "70%",
              xl: "60%",
            },
            margin: "0 auto",
          }}
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </>
  );
};
