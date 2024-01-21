import {
  Typography,
  Grid,
  CardContent,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import SaveIcon from "@mui/icons-material/Save";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import APICallProps from "src/api/APIWrapper/interfaces/APICallProps";
import useUtils from "src/appUtils";
import { logout, updateUserInfo } from "src/actions/sessionActions";
import apiUrls from "src/api/apiUrls";
import useButtonUtils from "src/appUtils/Buttons";
import {
  ButtonStatusHided,
  ButtonStatusDisabled,
  ButtonStatusDisplayed,
} from "src/appUtils/Buttons/statuses";
import WarningToast from "src/components/Toast/WarningToast";

const EditSentitiveUserInfo = (props: any) => {
  const u = useUtils();

  // ----- user -----

  let sessionUser = props.currentUser;

  const [request, setRequest] = useState<any>({ ...props.currentUser });

  const handleUpdateUserInfo = () => {
    const requestBody = {};

    if (props.currentUser.email != request.email) {
      requestBody["email"] = request.email;
    }
    if (request.password && request.password.length > 2) {
      requestBody["newPassword"] = request.password;
    }

    APICallWrapper({
      url: apiUrls.account.updateSentitiveInfo,
      options: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
      utils: u,
      showSuccess: true,
      successMesage: u.t("personal_info_page__account_updated_message"),
      onSuccess: async (response) => {
        props.logout();
        u.react.navigate("/");
      },
    } as APICallProps);
  };

  const UpdateRequest = (event) => {
    request[event.target.id] = event.target.value;
    setRequest(request);

    UpdateButtonsStatus();
  };

  // ----- end user -----

  // ----- verification codes

  const sendVerificationCode = () => {
    APICallWrapper({
      url: apiUrls.verification.sendUpdateAccountCode,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      utils: u,
      showSuccess: true,
      successMesage: u.t("personal_info_page__notification_procced"),
    } as APICallProps);
  };

  const verifyAccessCode = () => {
    updateButtonStatus(SaveButtonName, ButtonStatusDisabled);

    const requestBody = {
      code: request.verification_code,
    };

    APICallWrapper({
      url: apiUrls.verification.verifyAccessCode,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
      utils: u,
      showSuccess: false,
      onSuccess: async (response) => {
        const isCodeValid = await response.json();

        if (!isCodeValid) {
          u.e("Error_InvalidAccessCode");
          return;
        }

        handleUpdateUserInfo();
      },
    } as APICallProps);
  };

  // ----- end verification codes

  // ----- buttons -----

  const ProccedButtonName = "procced";
  const SaveButtonName = "save";
  const BackButtonName = "back";

  const {
    pageButtons,
    isButtonDisplayed,
    isButtonDisabled,
    isButtonVisible,
    updateButtonStatus,
  } = useButtonUtils({
    [ProccedButtonName]: ButtonStatusDisabled,
    [SaveButtonName]: ButtonStatusHided,
    [BackButtonName]: ButtonStatusHided,
  });

  const UpdateButtonsStatus = () => {
    if (isButtonVisible(ProccedButtonName)) {
      if (
        sessionUser?.email != request?.email ||
        (request.password && request.password.length > 2)
      ) {
        updateButtonStatus(ProccedButtonName, ButtonStatusDisplayed);
      } else {
        updateButtonStatus(ProccedButtonName, ButtonStatusDisabled);
      }
    } else {
      if (request?.verification_code?.length != 6) {
        updateButtonStatus(SaveButtonName, ButtonStatusDisabled);
      } else {
        updateButtonStatus(SaveButtonName, ButtonStatusDisplayed);
      }
    }
  };

  useEffect(() => {
    UpdateButtonsStatus();
  }, [sessionUser, pageButtons, request]);

  const proccedHandler = () => {
    setTimeout(
      () => updateButtonStatus(BackButtonName, ButtonStatusDisplayed),
      20 * 1000
    );

    sendVerificationCode();

    WarningToast(
      u.t("personal_info_page__notification_activating_back_button")
    );
    updateButtonStatus(BackButtonName, ButtonStatusDisabled);
    updateButtonStatus(ProccedButtonName, ButtonStatusHided);
  };

  // ----- buttons -----

  const RenderVerificationCodeSection = () => {
    if (isButtonVisible(ProccedButtonName)) return;

    return (
      <>
        <Grid
          container
          item
          xs={12}
          sm={4}
          md={3}
          alignContent={"center"}
          justifyContent={{ xs: "left", sm: "center" }}
        >
          <Grid>{u.t("personal_info_page__verification_code_field")}:</Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <TextField
            id="verification_code"
            sx={{ padding: 0 }}
            placeholder="******"
            onChange={UpdateRequest}
            variant="standard"
            fullWidth
          />
        </Grid>
      </>
    );
  };

  const RenderButtons = () => {
    return (
      <>
        {isButtonVisible(ProccedButtonName) ? (
          <Grid container justifyContent="flex-end">
            <Button
              disabled={isButtonDisabled(ProccedButtonName)}
              onClick={proccedHandler}
              variant="outlined"
              endIcon={<NavigateNextOutlinedIcon />}
            >
              {u.t("personal_info_page__button_procced")}
            </Button>
          </Grid>
        ) : (
          <Grid
            container
            item
            alignContent={"center"}
            justifyContent={{ xs: "center", sm: "flex-end" }}
          >
            <Grid item>
              <Button
                disabled={isButtonDisabled(BackButtonName)}
                onClick={() =>
                  updateButtonStatus(ProccedButtonName, ButtonStatusDisplayed)
                }
                variant="outlined"
                startIcon={<UndoOutlinedIcon />}
              >
                {u.t("personal_info_page__button_back")}
              </Button>
            </Grid>
            <Grid item xs={1} sm={0.5}></Grid>
            <Grid item>
              <Button
                onClick={() => verifyAccessCode()}
                disabled={isButtonDisabled(SaveButtonName)}
                variant="outlined"
                startIcon={<SaveIcon />}
              >
                {u.t("personal_info_page__button_save")}
              </Button>
            </Grid>
          </Grid>
        )}
      </>
    );
  };

  return (
    <>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="subtitle2">
          <Grid container spacing={2} sx={{ fontSize: "1.2em" }}>
            <Grid
              container
              item
              xs={12}
              sm={4}
              md={3}
              alignContent={"center"}
              justifyContent={{ xs: "left", sm: "center" }}
            >
              <Grid>{u.t("personal_info_page__email_field")}:</Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <TextField
                id="email"
                sx={{ padding: 0 }}
                disabled={!isButtonVisible(ProccedButtonName)}
                InputProps={{ style: { fontSize: "1.1em" } }}
                defaultValue={request.email}
                onChange={UpdateRequest}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={4}
              md={3}
              alignContent={"center"}
              justifyContent={{ xs: "left", sm: "center" }}
            >
              <Grid>{u.t("personal_info_page__password_field")}:</Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <TextField
                id="password"
                sx={{ padding: 0 }}
                InputProps={{ style: { fontSize: "1.1em" } }}
                disabled={!isButtonVisible(ProccedButtonName)}
                type="password"
                placeholder="new password"
                onChange={UpdateRequest}
                variant="standard"
                fullWidth
              />
            </Grid>
            {RenderVerificationCodeSection()}
            <Grid item xs={12} pt={1} pb={1}>
              <Divider />
            </Grid>
            {RenderButtons()}
          </Grid>
        </Typography>
      </CardContent>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateUserInfo: (newUser) => {
      dispatch(updateUserInfo(newUser));
    },
    logout: () => {
      dispatch(logout());
    },
  };
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.session.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSentitiveUserInfo);
