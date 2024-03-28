import { ButtonProps } from "@mui/material";

export default interface LockedButtonProps extends ButtonProps {
  isLoading?: boolean;
  dispatch?: any;
}
