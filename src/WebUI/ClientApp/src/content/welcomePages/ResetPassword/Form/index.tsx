import { Box, FormControl } from "@mui/material";

import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import useUtils from "src/appUtils";
import { useEffect, useState } from "react";
import StateMachine, { StateModel } from "src/services/StateMachine";
import ElementsUtils from "src/appUtils/ElementsUtils";
import { ElementOptions } from "src/appUtils/ElementsUtils/ElementOptions";
import { DictionaryType } from "src/customTypes";
import ParamsObjectBuilder from "src/helpers/ParamsObjectBuilder";
import {
  SendResetPasswordCodeRequest,
  ResetPasswordRequest,
} from "src/models/requests/users/resetPassword/ResetPassword";
import {
  EmailMaskRegex,
  EmailRegex,
  PasswordMaskRegex,
  PasswordRegex,
} from "src/consts/Regexes";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import apiUrls from "src/api/apiUrls";
import RequestParamsBuilder from "src/api/APIWrapper/RequestParamsBuilder";
import WarningToast from "src/components/Toast/WarningToast";
import LockedTextField from "src/components/LockedComponents/LockedTextField/LockedTextField";

const ResetPasswordForm = (props: any) => {
  const u = useUtils();

  // elements

  const ElementNames = {
    BackButton: "BackButton",
    ContinueButton: "ContinueButton",
    CodeField: "code",
    EmailField: "email",
    PasswordField: "newPassword",
  };

  const initElements = new ElementsUtils({
    [ElementNames.BackButton]: { hidden: true, disabled: true },
    [ElementNames.ContinueButton]: { hidden: true, disabled: true },
    [ElementNames.CodeField]: { hidden: true, disabled: true },
    [ElementNames.EmailField]: { hidden: true, disabled: true },
    [ElementNames.PasswordField]: { hidden: true, disabled: true },
  });

  const [elementManager] = useState<ElementsUtils>(initElements);

  const [elements, setElements] = useState<DictionaryType<ElementOptions>>(
    elementManager.getElements()
  );

  // end elements

  // start state machine

  useEffect(() => {
    return () => {
      stateMachine.freeze();
    };
  }, []);

  const stateNames = {
    Init: "Init",
    SendCodeAllowed: "SendCodeAllowed",
    WaitingCodeInput: "WaitingCodeInput",
    BackToSendCodeAllowed: "BackToSendCodeAllowed",
    VerifyCodeAllowed: "VerifyCodeAllowed",
  };

  const states: { [key: string]: StateModel } = {
    Init: new StateModel(stateNames.Init, () => {
      elementManager.hide(ElementNames.BackButton);
      elementManager.disable(ElementNames.BackButton);

      elementManager.show(ElementNames.ContinueButton);
      elementManager.disable(ElementNames.ContinueButton);

      elementManager.hide(ElementNames.CodeField);
      elementManager.disable(ElementNames.CodeField);

      elementManager.show(ElementNames.EmailField);
      elementManager.enable(ElementNames.EmailField);

      elementManager.hide(ElementNames.PasswordField);
      elementManager.disable(ElementNames.PasswordField);
    }),
    SendCodeAllowed: new StateModel(stateNames.SendCodeAllowed, () => {
      elementManager.enable(ElementNames.EmailField);

      elementManager.enable(ElementNames.ContinueButton);

      elementManager.hide(ElementNames.BackButton);
      elementManager.disable(ElementNames.BackButton);

      elementManager.hide(ElementNames.CodeField);
      elementManager.disable(ElementNames.CodeField);

      elementManager.hide(ElementNames.PasswordField);
      elementManager.disable(ElementNames.PasswordField);
    }),
    WaitingCodeInput: new StateModel(stateNames.WaitingCodeInput, () => {
      elementManager.disable(ElementNames.EmailField);
      elementManager.disable(ElementNames.ContinueButton);

      elementManager.show(ElementNames.PasswordField);
      elementManager.enable(ElementNames.PasswordField);

      elementManager.show(ElementNames.CodeField);
      elementManager.enable(ElementNames.CodeField);

      elementManager.show(ElementNames.BackButton);
    }),
    BackToSendCodeAllowed: new StateModel(
      stateNames.BackToSendCodeAllowed,
      () => {
        elementManager.enable(ElementNames.BackButton);
      }
    ),
    VerifyCodeAllowed: new StateModel(stateNames.VerifyCodeAllowed, () => {
      elementManager.enable(ElementNames.ContinueButton);
    }),
  };

  const [stateMachine] = useState<StateMachine>(
    () =>
      new StateMachine(Object.values(states), () => {
        setElements(elementManager?.getElements());
      })
  );

  useEffect(() => {
    setElements(elementManager?.getElements());
  }, [elementManager]);

  // end state machine

  // update fields

  const [sendCodeRequest, setSendCodeRequest] =
    useState<SendResetPasswordCodeRequest>({ email: "" });
  const [resetRequest, setResetRequest] = useState<ResetPasswordRequest>({
    userId: undefined,
    code: undefined,
    newPassword: "",
  });

  const sendCodeRequestParams = ParamsObjectBuilder.Build(u, sendCodeRequest);
  const resetRequestParams = ParamsObjectBuilder.Build(u, resetRequest);

  const handleUpdate = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;

    if (name === ElementNames.EmailField)
      setSendCodeRequest((prevState) => {
        if (
          name === sendCodeRequestParams.email &&
          value !== "" &&
          !EmailMaskRegex.test(value)
        ) {
          return prevState;
        }

        return { ...prevState, [name]: value };
      });
    else
      setResetRequest((prevState) => {
        if (
          name === resetRequestParams.newPassword &&
          !PasswordMaskRegex.test(value)
        ) {
          return prevState;
        }

        if (name === resetRequestParams.code && value > 999999) {
          return prevState;
        }

        return { ...prevState, [name]: value };
      });
  };

  useEffect(() => {
    let newState = stateMachine.getCurrentState();
    switch (stateMachine.getCurrentState()) {
      case stateNames.Init:
      case stateNames.SendCodeAllowed:
        if (sendCodeRequest.email && EmailRegex.test(sendCodeRequest.email)) {
          newState = stateNames.SendCodeAllowed;
        } else {
          newState = stateNames.Init;
        }
        break;
      case stateNames.VerifyCodeAllowed:
      case stateNames.WaitingCodeInput:
        if (
          resetRequest.newPassword &&
          PasswordRegex.test(resetRequest.newPassword) &&
          resetRequest.code &&
          resetRequest.code > 100000 &&
          resetRequest.code < 999999 &&
          resetRequest.userId
        ) {
          newState = stateNames.VerifyCodeAllowed;
        } else {
          newState = stateNames.WaitingCodeInput;
        }
        break;
    }

    stateMachine.updateState(newState);
  }, [sendCodeRequest, resetRequest]);

  //end update fields

  // API calls

  const handleSendResetCode = async () => {
    APICallWrapper({
      url: apiUrls.verification.sendResetPasswordCode,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: RequestParamsBuilder.BuildBody(sendCodeRequest),
      },
      utils: u,
      successMessage: u.t("welcome:send_code_success"),
      showSuccess: true,
      onSuccess: async (response) => {
        setTimeout(() => {
          try {
            const saveState = stateMachine.getCurrentState();
            stateMachine.updateState(stateNames.BackToSendCodeAllowed);
            stateMachine.updateState(saveState);
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }, 20000);

        WarningToast(u.t("welcome:notification_activating_back_button"));

        const data = await response.json();
        setResetRequest((prevState) => ({
          ...prevState,
          [resetRequestParams.userId]: data,
        }));
        stateMachine.updateState(stateNames.WaitingCodeInput);
      },
      onFailure: async (response) => {
        stateMachine.updateState(stateNames.Init);
      },
      showError: true,
    });
  };

  const handleResetPassword = async () => {
    APICallWrapper({
      url: apiUrls.account.resetPassword,
      options: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: RequestParamsBuilder.BuildBody(resetRequest),
      },
      utils: u,
      successMessage: u.t("welcome:notification_reset_success"),
      showSuccess: true,
      onSuccess: async (response) => {
        u.react.navigate("/");
      },
      onFailure: async (response) => {
        stateMachine.updateState(stateNames.SendCodeAllowed);
      },
      showError: true,
    });
  };

  // end API calls

  // button handlers

  const handleContinue = () => {
    switch (stateMachine.getCurrentState()) {
      case stateNames.SendCodeAllowed:
        handleSendResetCode();
        break;
      case stateNames.VerifyCodeAllowed:
        handleResetPassword();
        break;
    }
  };

  const handleBack = () => {
    resetRequest[resetRequestParams.newPassword] = "";
    resetRequest[resetRequestParams.code] = "";

    stateMachine.updateState(stateNames.SendCodeAllowed);
  };

  // end button handlers

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItem: "center",
        margin: "5px auto",
        width: "min(60vw, 350px)",
      }}
    >
      <FormControl sx={{ gap: "15px" }} variant="outlined">
        <LockedTextField
          name={ElementNames.EmailField}
          disabled={elements[ElementNames.EmailField].disabled}
          value={sendCodeRequest.email}
          onChange={handleUpdate}
          type="text"
          label={u.t("welcome:form_email_label")}
          fullWidth
        />
        {!elements[ElementNames.PasswordField].hidden && (
          <LockedTextField
            name={ElementNames.PasswordField}
            disabled={elements[ElementNames.PasswordField].disabled}
            value={resetRequest.newPassword}
            type="password"
            onChange={handleUpdate}
            label={u.t("welcome:form_password_label")}
            fullWidth
          />
        )}
        {!elements[ElementNames.CodeField].hidden && (
          <LockedTextField
            name={ElementNames.CodeField}
            value={resetRequest.code ? resetRequest.code : ""}
            type="number"
            disabled={elements[ElementNames.CodeField].disabled}
            onChange={handleUpdate}
            label={u.t("welcome:form_code_label")}
            fullWidth
          />
        )}
        <Box
          display="flex"
          flexDirection={u.isMobile ? "column" : "row"}
          justifyContent="space-between"
          gap={u.isMobile ? 1 : 0}
          maxWidth="100%"
        >
          <Box
            width={
              u.isMobile
                ? "auto"
                : elements[ElementNames.BackButton].hidden
                ? "0%"
                : "48%"
            }
          >
            {!elements[ElementNames.BackButton].hidden && (
              <LockedButton
                sx={{ fontSize: "1em" }}
                disabled={elements[ElementNames.BackButton].disabled}
                variant="outlined"
                fullWidth
                onClick={handleBack}
              >
                {u.t("welcome:form_back_button")}
              </LockedButton>
            )}
          </Box>
          <Box
            width={
              u.isMobile
                ? "auto"
                : elements[ElementNames.BackButton].hidden
                ? "100%"
                : "48%"
            }
          >
            <LockedButton
              sx={{ fontSize: "1em" }}
              disabled={elements[ElementNames.ContinueButton].disabled}
              variant="outlined"
              fullWidth
              onClick={handleContinue}
            >
              {u.t("welcome:form_continue_button")}
            </LockedButton>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};

export default ResetPasswordForm;
