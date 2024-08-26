import React, { useEffect } from "react";
import { FC } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Card, Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";

import useUtils from "src/appUtils";
import Logo from "src/components/LogoSign";
import LanguageSwither from "src/components/LanguageSwitcher";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import { logout } from "src/actions/sessionActions";
import { Session } from "src/models/Session";

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(25)};
`
);

const WelcomeLayout: FC = (props: any) => {
  const session = props.session as Session;

  const u = useUtils();

  useEffect(() => {
    if (session.isAuthenticated) {
      APICallWrapper({
        url: apiUrls.home.authcheck,
        options: {
          method: "GET",
        },
        utils: u,
        onSuccess: async (response) => {
          if (session.user.isEmailVerified) {
            u.react.navigate("/home");
          } else {
            if (window.location.pathname !== "/welcome/verify-email") {
              u.react.navigate("/welcome/verification");
            }
          }
        },
        onFailure: async (response) => {
          if (response.status == 401) {
            logout();
          }
        },
        showError: false,
      });
    }
  }, []);

  const logout = () => {
    u.e("SessionExpired");
    props.logout();
    u.react.navigate("/");
  };

  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
      }}
    >
      <OverviewWrapper>
        <Helmet>
          <title>{u.t("welcome:name_of_app")}</title>
        </Helmet>
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="center"
            pt={5}
            alignItems="center"
            flexDirection="row"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Logo width="100px" height="100px" />
            </Box>
            <Box
              position="absolute"
              right={u.isMobile ? 45 : "30%"}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <LanguageSwither />
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Card
              sx={{
                py: 4,
                mb: 1,
                minWidth: "350px",
                width: "80%",
                borderRadius: 5,
              }}
            >
              <Box maxWidth="lg" sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                  }}
                >
                  <Box display="flex" flexDirection="column" gap="5px">
                    {u.t("welcome:welcome_to")}
                    <TypographyH1 sx={{ mb: 2 }} variant="h1">
                      {u.t("welcome:name_of_app")}
                    </TypographyH1>
                    <Outlet />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Container>
      </OverviewWrapper>
    </Box>
  );
};

WelcomeLayout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state: any) => {
  return {
    session: state.session as Session,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeLayout);
