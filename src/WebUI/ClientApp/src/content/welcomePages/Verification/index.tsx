import { Box } from "@mui/material";
import React from "react";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";

import useUtils from "src/appUtils";
import WelcomeMenuButton from "../Components/WelcomeMenuButton";

const Verification = (props: any) => {
  const u = useUtils();

  React.useEffect(() => {
    checkVerification();
  }, []);

  const checkVerification = () => {
    APICallWrapper({
      url: `${apiUrls.authorization.verification}`,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      },
      utils: u,
      onSuccess: async (response) => {
        const verificationResponse = await response.json();
        if (!verificationResponse.isVerified) {
          return;
        }
        clearInterval(task);
        u.react.navigate("/home");
      },

      showError: true,
      doLock: false,
    });
  };

  const task = setInterval(checkVerification, 10 * 1000);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItem: "center",
        margin: "5px auto",
        width: "min(50vw, 300px)",
        gap: "50px",
      }}
    >
      <Box>{u.t("login_page_email_verification_description")}</Box>
      <WelcomeMenuButton
        text={u.t("login_page_back_to_login_page")}
        path="/welcome/login"
      />
    </Box>
  );
};

export default Verification;
