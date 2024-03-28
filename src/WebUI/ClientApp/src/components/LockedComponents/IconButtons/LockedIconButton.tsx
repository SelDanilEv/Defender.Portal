import { IconButton } from "@mui/material";
import { connect } from "react-redux";

import LockedIconButtonProps from "./LockedIconButtonProps";

const LockedIconButton = ({
  isLoading,
  dispatch,
  ...restProps
}: LockedIconButtonProps) => {
  return (
    <IconButton disabled={isLoading || restProps.disabled} {...restProps} />
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.loading.loading,
  };
};

export default connect(mapStateToProps)(LockedIconButton);
