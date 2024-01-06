import { FC, ReactNode, useLayoutEffect, useEffect } from "react";
import { Box, alpha, lighten } from "@mui/material";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import { logout } from "src/actions/sessionActions";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = (props: any) => {
  const u = useUtils();
  const theme = u.react.theme;

  useEffect(() => {
    if (!props.session.isAuthenticated) {
      logout();
      return;
    }

    APICallWrapper({
      url: apiUrls.home.authcheck,
      options: {
        method: "GET",
      },
      utils: u,
      onFailure: async (response) => {
        if (response.status == 401) {
          logout();
        }
      },
    });
  }, []);

  const logout = () => {
    u.e("Error_TokenExpired");
    props.logout();
    u.react.navigate("/");
  };

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",

          ".MuiPageTitle-wrapper": {
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === "dark"
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`,
          },
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            display: "block",
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up("lg")]: {
              ml: `${theme.sidebar.width}`,
            },
          }}
        >
          <Box display="block" p={1}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    session: state.session,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLayout);
