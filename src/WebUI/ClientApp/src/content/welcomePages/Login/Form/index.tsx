import { Box, FormControl, Link, TextField } from "@mui/material";
import { connect } from "react-redux";

import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import LoadingStateService from "src/services/LoadingStateService";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import { login } from "src/actions/sessionActions";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";
import { useState } from "react";
import { Session } from "src/models/Session";

const LoginForm = (props: any) => {
  const [loginRequest, setLoginRequest]: any = useState({
    login: "",
    password: "",
  });

  const UpdateLoginRequest = (event) => {
    let requst = loginRequest;
    requst[event.target.id] = event.target.value;
    setLoginRequest(requst);
  };

  const u = useUtils();

  const login = () => {
    LoadingStateService.StartLoading();
    loginWithPassword();
    LoadingStateService.FinishLoading();
  };

  const validateRequest = () => {
    if (!loginRequest.login) {
      u.e("Error_EmptyLogin");
      return false;
    }

    if (!loginRequest.password) {
      u.e("Error_EmptyPassword");
      return false;
    }

    return true;
  };

  const loginWithPassword = async () => {
    if (!validateRequest()) return;

    APICallWrapper({
      url: apiUrls.authorization.login,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
        cache: "default",
      },
      utils: u,
      onSuccess: async (response) => {
        const loginResponse = (await response.json()) as Session;

        if (!loginResponse.isAuthenticated) {
          u.e("Error_AuthorizationFailed");
          return;
        }

        props.login(loginResponse);

        if (loginResponse.user.isEmailVerified) {
          u.react.navigate("/home");
        } else {
          u.react.navigate("/welcome/verification");
        }
      },
      showError: true,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItem: "center",
        margin: "5px auto",
        width: "min(60vw, 300px)",
      }}
    >
      <FormControl sx={{ gap: "15px" }} variant="outlined">
        <TextField
          id="login"
          type="text"
          onChange={UpdateLoginRequest}
          label={u.t("welcome_page__login_label")}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="password"
            type="password"
            onChange={UpdateLoginRequest}
            label={u.t("welcome_page__password_label")}
            fullWidth
          />
          <Link
            href="password/reset"
            sx={{ ml: "auto", mr: "4px", fontSize: "0.8em" }}
          >
            Forgot password?
          </Link>
        </Box>

        <LockedButton
          sx={{ fontSize: "1em" }}
          variant="outlined"
          onClick={() => login()}
        >
          {u.t("welcome_page__sign_in")}
        </LockedButton>
      </FormControl>
    </Box>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (payload: any) => {
      dispatch(login(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
