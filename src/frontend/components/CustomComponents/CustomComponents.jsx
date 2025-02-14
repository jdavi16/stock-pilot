import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CustomTextField = styled(TextField)({
  "& label.MuiInputLabel-root": { color: "var(--text)", fontSize: "14px" },
  "& label.Mui-focused": {
    color: "var(--text-hover)",
  },
  "& .MuiInputBase-input": {
    color: "var(--text)",
    padding: "10px 12px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--borderColor)",
    },
    "&:hover fieldset": {
      borderColor: "var(--accent-hover)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--accent)",
    },
  },
});

export const CustomButton = styled(Button)({
  backgroundColor: "var(--accent)",
  fontSize: "14px",
  color: "var(--text)",
  "&:hover": {
    backgroundColor: "var(--accent-hover)",
  },
});
