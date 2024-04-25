import { CheckboxProps } from "@mui/material";

export default interface LockedCheckboxProps extends CheckboxProps {
  isLoading?: boolean;
  dispatch?: any;
}
