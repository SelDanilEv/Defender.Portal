import { Box, Container, Card, Button, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { styled } from "@mui/material/styles";

import Login from "./Login";
import Create from "./CreateAccount";

import config from "src/config.json";
import Logo from "src/components/LogoSign";
import Language from "src/components/Language";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import useUtils from "src/appUtils";

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
    font-size: ${theme.typography.pxToRem(40)};
`
);

const StartPage = (props: any) => {
  const u = useUtils();

  const [isLoginPage, setIsLoginPage]: any = useState(true);

  return (
    <OverviewWrapper>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" pt={5} alignItems="center">
          <Box display="flex" justifyContent="right" alignItems="center">
            <Logo width="150px" height="150px" />
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Card
            sx={{
              p: 4,
              mb: 1,
              minWidth: "350px",
              width: "80%",
              borderRadius: 5,
            }}
          >
            <Container maxWidth="lg" sx={{ textAlign: "center" }}>
              <Grid
                spacing={{ xs: 6, md: 10 }}
                justifyContent="center"
                alignItems="center"
                container
              >
                <Grid
                  item
                  md={10}
                  lg={8}
                  mx="auto"
                  display="flex"
                  flexDirection="column"
                  gap="5px"
                >
                  <TypographyH1 sx={{ mb: 2 }} variant="h1">
                    {config.NAME_OF_APP}
                  </TypographyH1>
                  <Box
                    sx={{
                      display: {
                        lg: "flex",
                        md: "block",
                        sm: "block",
                        xs: "block",
                      },
                      justifyContent: "space-between",
                      ml: { lg: "8%", md: "0", sm: "0" },
                    }}
                  >
                    <Box>{isLoginPage ? <Login /> : <Create />}</Box>
                    <Box
                      sx={{
                        display: {
                          lg: "flex",
                          md: "none",
                          sm: "none",
                          xs: "none",
                        },
                        flexDirection: "column-reverse",
                        justifyContent: "center",
                      }}
                    >
                      <Box>
                        <LockedButton
                          variant="contained"
                          sx={{ fontSize: "1em" }}
                          onClick={() => setIsLoginPage(!isLoginPage)}
                        >
                          {isLoginPage
                            ? u.t("login_page_create_account")
                            : u.t("login_page_back_to_login_page")}
                        </LockedButton>
                      </Box>
                      <Box>
                        <Language />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Card>
        </Box>
        <Box
          sx={{
            display: { lg: "none", xs: "flex" },
            pt: "5%",
            justifyContent: "space-between",
            mx: "auto",
            maxWidth: "400px",
          }}
        >
          <Box>
            <LockedButton
              variant="contained"
              sx={{ fontSize: "1em" }}
              onClick={() => setIsLoginPage(!isLoginPage)}
            >
              {isLoginPage
                ? u.t("login_page_create_account")
                : u.t("login_page_back_to_login_page")}
            </LockedButton>
          </Box>
          <Box>
            <Language />
          </Box>
        </Box>
      </Container>
    </OverviewWrapper>
  );
};

export default StartPage;
