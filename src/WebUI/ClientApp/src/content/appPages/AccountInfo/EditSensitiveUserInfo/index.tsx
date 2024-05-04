import {
  Typography,
  Grid,
  CardContent,
  TextField,
  Divider,
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

import WarningToast from "src/components/Toast/WarningToast";
import StateMachine, { StateModel } from "src/services/StateMachine";
import ElementsUtils from "src/appUtils/ElementsUtils";
import { DictionaryType } from "src/customTypes";
import { ElementOptions } from "src/appUtils/ElementsUtils/ElementOptions";
import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";

const EditSensitiveUserInfo = (props: any) => {
  const u = useUtils();

  // ----- user -----

  let sessionUser = props.currentUser;

  const [request, setRequest] = useState<any>({ ...props.currentUser });

  const handleUpdateUserInfo = () => {
    const requestBody = {
      code: +request.verification_code,
    };

    if (props.currentUser.email != request.email) {
      requestBody["email"] = request.email;
    }
    if (request.password && request.password.length > 2) {
      requestBody["newPassword"] = request.password;
    }

    APICallWrapper({
      url: apiUrls.account.updateSensitiveInfo,
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

    if (
      sessionUser?.email != request?.email ||
      (request.password && request.password.length > 2)
    ) {
      if (stateMachine.isState(stateNames.Init))
        SetState(stateNames.ProceedAllowed);
    } else if (stateMachine.isState(stateNames.ProceedAllowed)) {
      SetState(stateNames.Init);
    }

    if (request?.verification_code?.length == 6) {
      SetState(stateNames.VerifyCodeAllowed);
    } else if (stateMachine.isState(stateNames.VerifyCodeAllowed)) {
      SetState(stateNames.WaitingCodeInput);
    }
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
      successMesage: u.t("personal_info_page__notification_code_send"),
    } as APICallProps);
  };

  // ----- end verification codes

  // elements

  const ElementNames = {
    ProceedButton: "ProceedButton",
    SaveButton: "SaveButton",
    BackButton: "BackButton",
    EmailField: "EmailField",
    PasswordField: "PasswordField",
  };

  const initElements = new ElementsUtils({
    [ElementNames.ProceedButton]: { hidden: false, disabled: true },
    [ElementNames.SaveButton]: { hidden: true, disabled: true },
    [ElementNames.BackButton]: { hidden: true, disabled: true },
    [ElementNames.EmailField]: { hidden: false, disabled: false },
    [ElementNames.PasswordField]: { hidden: false, disabled: false },
  });

  const [elementManager] = useState<ElementsUtils>(initElements);

  const [elements, setElements] = useState<DictionaryType<ElementOptions>>(
    elementManager.getElements()
  );

  // end elements

  // ----- state machine -----

  useEffect(() => {
    return () => {
      stateMachine.freeze();
    };
  }, []);

  const stateNames = {
    Init: "Init",
    ProceedAllowed: "ProceedAllowed",
    WaitingCodeInput: "WaitingCodeInput",
    BackAllowed: "BackAllowed",
    VerifyCodeAllowed: "VerifyCodeAllowed",
  };

  const states: { [key: string]: StateModel } = {
    Init: new StateModel(stateNames.Init, () => {
      elementManager.show(ElementNames.ProceedButton);
      elementManager.hide(ElementNames.BackButton);
      elementManager.hide(ElementNames.SaveButton);
      elementManager.show(ElementNames.EmailField);
      elementManager.show(ElementNames.PasswordField);
      elementManager.disable(ElementNames.ProceedButton);
      elementManager.disable(ElementNames.BackButton);
      elementManager.disable(ElementNames.SaveButton);
      elementManager.enable(ElementNames.EmailField);
      elementManager.enable(ElementNames.PasswordField);
    }),
    ProceedAllowed: new StateModel(stateNames.ProceedAllowed, () => {
      elementManager.show(ElementNames.ProceedButton);
      elementManager.hide(ElementNames.BackButton);
      elementManager.hide(ElementNames.SaveButton);
      elementManager.enable(ElementNames.ProceedButton);
      elementManager.disable(ElementNames.BackButton);
      elementManager.disable(ElementNames.SaveButton);
      elementManager.enable(ElementNames.EmailField);
      elementManager.enable(ElementNames.PasswordField);
    }),
    WaitingCodeInput: new StateModel(stateNames.WaitingCodeInput, () => {
      elementManager.hide(ElementNames.ProceedButton);
      elementManager.show(ElementNames.BackButton);
      elementManager.show(ElementNames.SaveButton);
      elementManager.disable(ElementNames.ProceedButton);
      elementManager.disable(ElementNames.SaveButton);
      elementManager.disable(ElementNames.EmailField);
      elementManager.disable(ElementNames.PasswordField);
    }),
    BackAllowed: new StateModel(stateNames.BackAllowed, () => {
      elementManager.enable(ElementNames.BackButton);
    }),
    VerifyCodeAllowed: new StateModel(stateNames.VerifyCodeAllowed, () => {
      elementManager.enable(ElementNames.SaveButton);
    }),
  };

  const [stateMachine] = useState<StateMachine>(
    () =>
      new StateMachine(Object.values(states), () => {
        setElements(elementManager?.getElements());
      })
  );

  const SetState = (newState: string) => {
    stateMachine.updateState(newState);
  };
  // end state machine

  const proceedHandler = () => {
    setTimeout(() => {
      try {
        SetState(stateNames.BackAllowed);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }, 20 * 1000);

    sendVerificationCode();

    WarningToast(
      u.t("personal_info_page__notification_activating_back_button")
    );

    SetState(stateNames.WaitingCodeInput);
  };

  const RenderVerificationCodeSection = () => {
    if (!elements[ElementNames.ProceedButton].hidden) return;

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
            type="number"
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
        <Grid
          container
          item
          alignContent={"center"}
          justifyContent={{ xs: "center", sm: "flex-end" }}
          gap={2}
        >
          {!elements[ElementNames.ProceedButton].hidden && (
            <LockedButton
              fullWidth={u.isMobile}
              disabled={elements[ElementNames.ProceedButton].disabled}
              onClick={proceedHandler}
              variant="outlined"
              endIcon={<NavigateNextOutlinedIcon />}
            >
              {u.t("personal_info_page__button_proceed")}
            </LockedButton>
          )}
          {!elements[ElementNames.BackButton].hidden && (
            <LockedButton
              fullWidth={u.isMobile}
              disabled={elements[ElementNames.BackButton].disabled}
              onClick={() => SetState(stateNames.ProceedAllowed)}
              variant="outlined"
              startIcon={<UndoOutlinedIcon />}
            >
              {u.t("personal_info_page__button_back")}
            </LockedButton>
          )}
          {!elements[ElementNames.SaveButton].hidden && (
            <LockedButton
              fullWidth={u.isMobile}
              onClick={() => handleUpdateUserInfo()}
              disabled={elements[ElementNames.SaveButton].disabled}
              variant="outlined"
              startIcon={<SaveIcon />}
            >
              {u.t("personal_info_page__button_save")}
            </LockedButton>
          )}
        </Grid>
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
                disabled={elements[ElementNames.EmailField].disabled}
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
                disabled={elements[ElementNames.PasswordField].disabled}
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
)(EditSensitiveUserInfo);
