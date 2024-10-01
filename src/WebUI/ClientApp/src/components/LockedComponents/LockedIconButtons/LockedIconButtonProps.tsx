import { IconButtonProps } from "@mui/material";

export default interface LockedIconButtonProps extends IconButtonProps {
  isLoading?: boolean;  
  dispatch?: any;
}
