import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";

import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import LoadingStateService from "src/services/LoadingStateService";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import ErrorToast from "src/components/Toast/DefaultErrorToast";
import { login } from "src/actions/sessionActions";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import APIRequestValidator from "src/validators/APIRequestValidator";

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
    email: "",
    phoneNumber: "",
    nickname: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const UpdateLoginRequest = (event) => {
    let requst = loginRequest;
    requst[event.target.id] = event.target.value;
    setLoginRequest(requst);
  };

  const u = useUtils();

  const Create = () => {
    LoadingStateService.StartLoading();
    CreateAccount();
    LoadingStateService.FinishLoading();
  };

  const CreateAccount = async () => {
    if (!(await APIRequestValidator.ValidateCreateUserRequest(u, loginRequest)))
      return;

    APICallWrapper({
      url: apiUrls.authorization.create,
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
          id="email"
          type="email"
          onChange={UpdateLoginRequest}
          label={u.t("login_page_email_label")}
        />
        <TextField
          id="nickname"
          type="text"
          onChange={UpdateLoginRequest}
          label={u.t("login_page_nickname_label")}
        />
        <TextField
          id="phoneNumber"
          type="tel"
          placeholder="+(48)726101290"
          onChange={UpdateLoginRequest}
          label={u.t("login_page_phone_label")}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">
            {u.t("login_page_password_label")}
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={UpdateLoginRequest}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={u.t("login_page_password_label")}
          />
        </FormControl>
        <LoginButton variant="outlined" onClick={() => Create()}>
          {u.t("login_page_create")}
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
