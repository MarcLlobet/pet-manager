import React from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DialogMui from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export const Dialog = ({ onClose, modalContent }: { onClose: () => void; modalContent: React.ReactNode }) => {
  return (
    <DialogMui onClose={onClose} aria-labelledby="customized-dialog-title" open>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Pet of the Day
      </DialogTitle>
      <IconButton
        aria-label="top-close"
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
      <DialogContent dividers>{modalContent}</DialogContent>
      <DialogActions>
        <Button aria-label="bottom-close" autoFocus onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </DialogMui>
  );
};
