import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";

export default interface LockedDatePickerProps
  extends DatePickerProps<any, any> {
  isLoading?: boolean;
  dispatch?: any;
}
