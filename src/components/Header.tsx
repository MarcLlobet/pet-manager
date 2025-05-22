import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/Brightness4";

import { useTheme } from "../context/ThemeContext";
import { PetOfTheDayModal } from "./PetOfTheDayModal";
import { Logo } from "./Logo";

export const Header = () => {
  const { toggleTheme } = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);

  const handlePetOfTheDay = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ display: "flex", color: "white", textDecoration: "none" }}>
              <Box data-testid="logo" sx={{ mr: 2 }}>
                <Logo fill="white" />
              </Box>
              <Typography variant="h6" component="div">
                Fever Pets
              </Typography>
            </Link>
          </Box>
          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 2 }}>
            <DarkModeIcon />
          </IconButton>
          <Button color="inherit" onClick={handlePetOfTheDay}>
            Pet of the day
          </Button>
        </Toolbar>
      </AppBar>
      <PetOfTheDayModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
