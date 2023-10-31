import React from "react";
import { FC } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { connect } from "react-redux";

import useUtils from "src/appUtils";

const BaseLayout: FC = (props: any) => {
  const u = useUtils();

  React.useEffect(() => {
    if (props.session.isAuthenticated) {
      u.react.navigate("/home");
    }
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
      }}
    >
      <Outlet />
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state: any) => {
  return {
    session: state.session,
  };
};

export default connect(mapStateToProps)(BaseLayout);
