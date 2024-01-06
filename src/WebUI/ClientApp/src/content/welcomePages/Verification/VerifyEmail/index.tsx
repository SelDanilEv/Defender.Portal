import { Box } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";

import WelcomeMenuButton from "../../Components/WelcomeMenuButton";
import ErrorStatusLabel from "src/components/Label/StatusLabels/Error";
import SuccessStatusLabel from "src/components/Label/StatusLabels/Success";
import PendingStatusLabel from "src/components/Label/StatusLabels/Pending";

const Verification = (props: any) => {
  const u = useUtils();

  const Status = {
    Error: "e",
    Pending: "p",
    Success: "s",
  };

  const [verificationStatus, setVerificationStatus]: any = useState(
    Status.Pending
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const checkParameters = async () => {
    const verificationRequest = {};

    searchParams.forEach((value, key) => {
      verificationRequest[key] = value;
    });

    if (verificationRequest["code"] && verificationRequest["hash"]) {
      await confirmVerification(verificationRequest);
    } else {
      setVerificationStatus(Status.Error);
    }
  };

  const confirmVerification = async (verificationRequest) => {
    APICallWrapper({
      url: apiUrls.verification.verifyEmail,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verificationRequest),
        cache: "default",
      },
      utils: u,
      onSuccess: async (response) => {
        const isVerified = await response.json();

        console.log("isVerified");
        console.log(isVerified);

        if (isVerified) {
          setVerificationStatus(Status.Success);
        } else {
          setVerificationStatus(Status.Error);
        }
      },
      onFailure: async (response) => {
        setVerificationStatus(Status.Error);
      },
      showError: true,
    });
  };

  React.useEffect(() => {
    checkParameters();
  }, []);

  const GetStatus = () => {
    switch (verificationStatus) {
      case Status.Error:
        return (
          <ErrorStatusLabel
            text={u.t("welcome_page_email_verification_error_label")}
            size="medium"
          ></ErrorStatusLabel>
        );
      case Status.Success:
        return (
          <SuccessStatusLabel
            text={u.t("welcome_page_email_verification_success_label")}
            size="medium"
          ></SuccessStatusLabel>
        );
      default:
        return (
          <PendingStatusLabel
            text={u.t("welcome_page_email_verification_pending_label")}
            size="medium"
          ></PendingStatusLabel>
        );
    }
  };

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
      <Box>{GetStatus()}</Box>
      <WelcomeMenuButton
        text={u.t("welcome_page_back_to_login_page")}
        path="/welcome/login"
      />
    </Box>
  );
};

export default Verification;
