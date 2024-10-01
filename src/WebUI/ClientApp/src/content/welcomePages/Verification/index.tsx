import { Box } from "@mui/material";
import React from "react";

import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";

import WelcomeMenuButton from "../Components/WelcomeMenuButton";
import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import SuccessToast from "src/components/Toast/DefaultSuccessToast";
import { logout } from "src/actions/sessionActions";
import { connect } from "react-redux";

const Verification = (props: any) => {
  const u = useUtils();

  React.useEffect(() => {
    checkVerification();
  }, []);

  const checkVerification = () => {
    APICallWrapper({
      url: `${apiUrls.verification.check}`,
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
      onFailure: async (response) => {
        clearInterval(task);
        props.logout();
        u.react.navigate("/");
      },
      showError: true,
      doLock: false,
    });
  };

  const resendVerification = () => {
    APICallWrapper({
      url: `${apiUrls.verification.resendEmail}`,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      },
      utils: u,
      onSuccess: async (response) => {
        SuccessToast(u.t("welcome:verification_email_sent"));
      },
      showError: true,
      doLock: true,
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
        gap: "40px",
      }}
    >
      <Box sx={{ fontSize: "1.2em" }}>
        {u.t("welcome:email_verification_description")}
      </Box>
      <LockedButton
        sx={{ fontSize: "1em" }}
        variant="outlined"
        onClick={resendVerification}
      >
        {u.t("welcome:resend_verification_email")}
      </LockedButton>
      <WelcomeMenuButton
        onClick={() => clearInterval(task)}
        text={u.t("welcome:back_to_login_page")}
        path="/welcome/login"
      />
    </Box>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Verification);
