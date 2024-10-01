import { SelectProps } from "@mui/material";

type LockedChipListProps = Omit<SelectProps, "onChange"> & {
  isLoading;
  dispatch;
  initialChips?: string[];
  onChange?: (chips: string[]) => void;
};

export default LockedChipListProps;
