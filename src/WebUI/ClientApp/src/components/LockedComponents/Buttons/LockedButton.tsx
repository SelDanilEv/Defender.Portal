import { Button } from "@mui/material";
import { connect } from "react-redux";

import LockedButtonProps from "./LockedButtonProps";

const LockedButton = ({
  isLoading,
  dispatch,
  ...restProps
}: LockedButtonProps) => {
  const { disabled, ...otherProps } = restProps;
  return <Button disabled={isLoading || disabled} {...otherProps} />;
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.loading.loading,
  };
};

export default connect(mapStateToProps)(LockedButton);
