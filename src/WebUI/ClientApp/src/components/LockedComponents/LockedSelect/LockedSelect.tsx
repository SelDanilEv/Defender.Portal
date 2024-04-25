import { Select } from "@mui/material";
import { connect } from "react-redux";

import LockedSelectProps from "./LockedSelectProps";

const LockedSelect = ({
  isLoading,
  dispatch,
  ...restProps
}: LockedSelectProps) => {
  const { disabled, ...otherProps } = restProps;
  return <Select disabled={isLoading || disabled} {...otherProps} />;
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.loading.loading,
  };
};

export default connect(mapStateToProps)(LockedSelect);
