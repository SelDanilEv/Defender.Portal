import { Checkbox } from "@mui/material";
import { connect } from "react-redux";

import LockedCheckboxProps from "./LockedCheckboxProps";

const LockedCheckbox = ({
  isLoading,
  dispatch,
  ...restProps
}: LockedCheckboxProps) => {
  const { disabled, ...otherProps } = restProps;
  return <Checkbox disabled={isLoading || disabled} {...otherProps} />;
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.loading.loading,
  };
};

export default connect(mapStateToProps)(LockedCheckbox);
