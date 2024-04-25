import { SelectProps } from "@mui/material";

export default interface LockedSelectProps extends SelectProps {
  isLoading?: boolean;
  dispatch?: any;
}
