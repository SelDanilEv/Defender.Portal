import React from "react";
import { FC } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Card, Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";

import config from "src/config.json";
import useUtils from "src/appUtils";
import Logo from "src/components/LogoSign";

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
  const u = useUtils();

  React.useEffect(() => {
    if (props.session.isAuthenticated) {
      if (props.session.isEmailVerified || props.session.isEmailVerified) {
        u.react.navigate("/home");
      } else {
        // u.react.navigate("/welcome/verification");
      }
    }
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
      }}
    >
      <OverviewWrapper>
        <Helmet>
          <title>Defender Portal</title>
        </Helmet>
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="center"
            pt={5}
            alignItems="center"
          >
            <Box display="flex" justifyContent="right" alignItems="center">
              <Logo width="100px" height="100px" />
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
                    Welcome to
                    <TypographyH1 sx={{ mb: 2 }} variant="h1">
                      {config.NAME_OF_APP}
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
    session: state.session,
  };
};

export default connect(mapStateToProps)(WelcomeLayout);
