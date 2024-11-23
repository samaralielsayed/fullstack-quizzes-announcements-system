import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import { cyan } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  message: string;
  title: string;
  handledelte: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  handleClose,
  handleDelete,
  handledelte,
  message,
  title,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm {title}</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions
        sx={{
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{ color: cyan[900], borderColor: cyan[900] }}
          variant="outlined"
        >
          No, Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={handledelte}
        >
          Yes,Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
