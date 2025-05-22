import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
        padding: 2,
        marginTop: "auto",
      }}
    >
      <Typography>© {new Date().getFullYear()} Fever Pets.</Typography>
    </Box>
  );
};
