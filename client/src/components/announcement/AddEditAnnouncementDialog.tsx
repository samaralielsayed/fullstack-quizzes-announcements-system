import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { cyan, red } from "@mui/material/colors";
import InputField from "../share/InputField";
import { AddDataDialogProps } from "../../interfaces/AddDataDialogProps";
import useAddEditAnnouncementDialog from "../../hooks/useAddEditAnnouncementDialog";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar/Avatar";
import Box from "@mui/material/Box/Box";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const AddEditAnnouncementDialog: React.FC<AddDataDialogProps> = ({
  open,
  handleClose,
  setRender,
  ID,
}) => {
  const { inputs, formik, imagePreview, handleFileChange } =
    useAddEditAnnouncementDialog({
      handleClose,
      setRender,
      ID,
    });

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add New Quiz</DialogTitle>
        <DialogContent>
          {inputs.map((input) => (
            <InputField
              key={input.name}
              label={input.label}
              name={input.name}
              value={input.value}
              onChange={input.onChange}
              onBlur={input.onBlur}
              error={input.error}
              helperText={input.helperText}
            />
          ))}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Box>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  backgroundColor: cyan[900],
                  color: "white",
                  "&:hover": {
                    backgroundColor: cyan[900],
                  },
                }}
              >
                Upload files
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
              {formik.touched.image && formik.errors.image && (
                <p style={{ color: red[900], fontSize: "0.8rem" }}>
                  {formik.errors.image}
                </p>
              )}
            </Box>
            {ID && <Avatar src={imagePreview}></Avatar>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ color: red[900], borderColor: red[900] }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: cyan[900] }}
            disabled={formik.isSubmitting}
          >
            {ID ? "Edit Announcement" : "Add Announcement"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEditAnnouncementDialog;
