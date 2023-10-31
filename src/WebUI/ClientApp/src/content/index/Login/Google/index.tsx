import { Box, Avatar } from "@mui/material";
import { connect } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { styled } from "@mui/material/styles";

import LockedButton from "src/components/LockedComponents/Buttons/LockedButton";
import LoadingStateService from "src/services/LoadingStateService";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import ErrorToast from "src/components/Toast/DefaultErrorToast";
import { login } from "src/actions/sessionActions";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";

const sizeOfLoginButtonText = 15;

const LoginButton = styled(LockedButton)(
  ({ theme }) => `
   display: 'flex';
   justifyContent: 'center';
   alignItems: 'center';
   font-size: ${theme.typography.pxToRem(sizeOfLoginButtonText)};
`
);

const GLetter = styled(Avatar)(
  ({ theme }) => `
   height: ${theme.typography.pxToRem(sizeOfLoginButtonText)};
   width: ${theme.typography.pxToRem(sizeOfLoginButtonText)};
`
);

const Login = (props: any) => {
  let googleResponseTimeout;

  const u = useUtils();

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => googleResponse(tokenResponse),
    onError: (errorResponse) => googleResponse(errorResponse),
  });

  const login = (isGoogle: boolean) => {
    LoadingStateService.StartLoading();
    if (isGoogle) {
      loginGoogle();
    }
    googleResponseTimeout = setTimeout(
      LoadingStateService.FinishLoading,
      10 * 1000
    );
  };

  const googleResponse = async (gResponse: any) => {
    if (!gResponse.access_token) {
      ErrorToast("Google account details not available");
      return;
    }

    clearTimeout(googleResponseTimeout);

    const requestData = {
      Token: gResponse.access_token,
    };

    APICallWrapper({
      url: apiUrls.authorization.google,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        cache: "default",
      },
      utils: u,
      onSuccess: async (response) => {
        const loginResponse = await response.json();

        if (!loginResponse.authorized) {
          ErrorToast("Error during authorization");
          return;
        }

        const authState = {
          token: loginResponse.token,
          user: loginResponse.userDetails,
        };

        props.login(authState);

        u.react.navigate("/home");
      },
      onFailure: async (response) => {
        if (response.status == 401) {
          props.logout();
          u.react.navigate("/");
        }
      },
      onFinal: async () => {
        // Custom unblock
        LoadingStateService.FinishLoading();
      },
    });
  };

  return (
    <Box>
      <LoginButton variant="outlined" onClick={() => login(true)}>
        <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          {u.t("login_page_sign_in_with")}&nbsp;
        </Box>
        <GLetter
          style={{
            marginRight: "1px",
          }}
          src="/static/images/logo/google.svg"
          alt=""
        />
        oogle
      </LoginButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
