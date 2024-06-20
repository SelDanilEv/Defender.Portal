import { TextFieldProps } from "@mui/material";

type LockedTextFieldProps = TextFieldProps & {
  isLoading?: boolean;
  dispatch?: any;
};

export default LockedTextFieldProps;
