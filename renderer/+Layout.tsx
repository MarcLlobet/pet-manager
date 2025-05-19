import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Link } from "./Link";
import PetOfTheDayModal from "./PetOfTheDayModal";

import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

function Logo(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 49 49">
      <g fill={props.fill}>
        <path
          id="palm"
          d="M39,37c2,3,3,5,3,7c0,4-3,5-6,5c-2,0-3,0-5-1c0,0-2-2-6-1c-4,0-6,1-6,1c-3,1-4,1-5,1c-4,0-6-2-6-5c0-2,1-4,3-7c0,0,4-6,7-9c2-2,6-2,6-2h1v0c0,0,4,0,6,2C35,31,39,37,39,37z"
        />
        <path id="finger1" d="M10,31c3-1,3-6,1-10S5,14,2,15S-1,21,1,25C3,30,7,32,10,31z " />
        <path id="finger2" d="M17,21c4,0,7-5,7-10S21,0,17,0S10,5,10,10S13,21,17,21z" />
        <path id="finger3" d="M32,21c4,0,7-5,7-10S36,0,32,0s-7,5-7,10C25,16,28,21,32,21z " />
        <path id="finger4" d="M46,16c-3-1-7,1-8,5s-1,9,1,10c3,1,7-1,8-5S49,17,46,16z" />
      </g>
    </SvgIcon>
  );
}

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          paddingTop: 2,
          paddingBottom: 2,
          minHeight: "calc(100vh - 128px)", // Adjust for header and footer height
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}

function Header() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handlePetOfTheDay = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Box>
              <Link href="/">
                <Box sx={{ mr: 2 }}>
                  <Logo fill="white" />
                </Box>
                <Box>
                  <Typography variant="h6" component="div" sx={{ color: "white" }}>
                    Fever Pets
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Box>
          <Button color="inherit" onClick={handlePetOfTheDay}>
            Pet of the day
          </Button>
        </Toolbar>
      </AppBar>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <PetOfTheDayModal onClose={handleCloseModal} />
      </Modal>
    </>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
        padding: 2,
        marginTop: "auto",
      }}
    >
      <Typography variant="body2">© {new Date().getFullYear()} Fever Pets.</Typography>
    </Box>
  );
}
