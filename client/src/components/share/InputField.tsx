import React from "react";
import TextField from "@mui/material/TextField";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error: boolean | undefined;
  helperText: string | false | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  return (
    <TextField
      margin="dense"
      id={name}
      name={name}
      label={label}
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
    />
  );
};

export default InputField;
