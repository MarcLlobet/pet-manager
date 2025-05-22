import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

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

export default Dialog;
