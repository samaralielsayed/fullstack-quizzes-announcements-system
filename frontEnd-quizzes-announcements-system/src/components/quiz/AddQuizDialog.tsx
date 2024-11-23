import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useAddQuizDialog from "../../hooks/useAddQuizDialog";
import InputField from "../share/InputField";
import { cyan, red } from "@mui/material/colors";
import { AddDataDialogProps } from "../../interfaces/AddDataDialogProps";

const AddQuizDialog: React.FC<AddDataDialogProps> = ({
  open,
  handleClose,
  setRender,
  ID,
}) => {
  console.log("quizIdxx", ID);
  const { inputs, formik } = useAddQuizDialog({
    handleClose,
    setRender,
    ID,
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{ID ? "Edit Quiz" : "Add New Quiz"}</DialogTitle>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Select Date"
                value={formik.values.date}
                onChange={(newDate) => formik.setFieldValue("date", newDate)}
                sx={{ width: "100%" }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {formik.touched.date && formik.errors.date && !formik.values.date && (
            <div style={{ color: "red" }}>{formik.errors.date}</div>
          )}
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
            {ID ? "Edit Quiz" : "Add Quiz"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddQuizDialog;
