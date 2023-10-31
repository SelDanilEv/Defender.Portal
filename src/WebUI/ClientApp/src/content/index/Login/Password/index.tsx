import { Box, FormControl, TextField } from "@mui/material";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";

import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import LoadingStateService from "src/services/LoadingStateService";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import { login } from "src/actions/sessionActions";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";
import { useState } from "react";

const sizeOfLoginButtonText = 15;

const LoginButton = styled(LockedButton)(
  ({ theme }) => `
   display: 'flex';
   justifyContent: 'center';
   alignItems: 'center';
   font-size: ${theme.typography.pxToRem(sizeOfLoginButtonText)};
`
);

const LoginWithPassword = (props: any) => {
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
        const loginResponse = await response.json();

        console.log(loginResponse);
        console.log("onSuccess");

        if (!loginResponse.isAuthenticated) {
          u.e("Error_AuthorizationFailed");
          return;
        }

        props.login(loginResponse);

        u.react.navigate("/home");
      },
      onFailure: async (response) => {
        if (response.status == 401) {
          props.logout();
          u.react.navigate("/");
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
        width: "min(50vw, 300px)",
      }}
    >
      <FormControl sx={{ gap: "15px" }} variant="outlined">
        <TextField
          id="login"
          type="text"
          onChange={UpdateLoginRequest}
          label={u.t("login_page_login_label")}
        />
        <TextField
          id="password"
          type="password"
          onChange={UpdateLoginRequest}
          label={u.t("login_page_password_label")}
        />
        <LoginButton variant="outlined" onClick={() => login()}>
          {u.t("login_page_sign_in")}
        </LoginButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithPassword);
