import { connect } from "react-redux";
import { DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";

import LockedDatePickerProps from "./LockedDatePickerProps";

const LockedDatePicker = ({
  isLoading,
  dispatch,
  ...restProps
}: LockedDatePickerProps) => {
  const { disabled, ...otherProps } = restProps;
  return <MobileDatePicker disabled={isLoading || disabled} {...otherProps} />;
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.loading.loading,
  };
};

export default connect(mapStateToProps)(LockedDatePicker);
