import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { HealthyPet } from "../types";
import { getPetData } from "../pages/index/@id/getPetData";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { PetDetails } from "../pages/index/@id/PetDetails";

const getDayOfTheMonth = () => {
  const today = new Date();
  return today.getDate();
};

export default function PetOfTheDayModal({ onClose }: { onClose: () => void }) {
  const [pet, setPetOfTheDay] = useState<HealthyPet>();
  const dayOfTheMonth = getDayOfTheMonth();

  useEffect(() => {
    (async function fetchOnMount() {
      const petData = await getPetData(dayOfTheMonth);
      setPetOfTheDay(petData);
    })();
  }, []);

  if (!pet) return null;

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Pet of the Day
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <PetDetails pet={pet} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
