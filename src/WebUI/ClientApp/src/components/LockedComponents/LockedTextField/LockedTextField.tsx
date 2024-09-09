import { TextField } from "@mui/material";
import { connect } from "react-redux";

import LockedTextFieldProps from "./LockedTextFieldProps";

const LockedTextField = ({
  isLoading,
  dispatch,
  ...restProps
}: LockedTextFieldProps) => {
  const { disabled, ...otherProps } = restProps;
  return <TextField disabled={isLoading || disabled} {...otherProps} />;
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.loading.loading,
  };
};

export default connect(mapStateToProps)(LockedTextField);

