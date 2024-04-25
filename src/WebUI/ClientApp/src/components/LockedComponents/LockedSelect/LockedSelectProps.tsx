import { SelectProps } from "@mui/material/Select";

type LockedSelectProps = SelectProps & {
  isLoading?: boolean;
  dispatch?: any;
};

export default LockedSelectProps;
