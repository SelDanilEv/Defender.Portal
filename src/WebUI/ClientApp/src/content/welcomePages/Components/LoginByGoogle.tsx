import { Box, Avatar } from "@mui/material";
import { connect } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

import LockedButton from "src/components/LockedComponents/LockedButton/LockedButton";
import LoadingStateService from "src/services/LoadingStateService";
import APICallWrapper from "src/api/APIWrapper/APICallWrapper";
import { login } from "src/actions/sessionActions";
import apiUrls from "src/api/apiUrls";
import useUtils from "src/appUtils";
import AuthorizationService from "src/services/AuthorizationService";

const LoginByGoogle = (props: any) => {
  let googleResponseTimeout;

  const u = useUtils();

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => googleResponse(tokenResponse),
    onError: (errorResponse) => googleResponse(errorResponse),
  });

  const login = async () => {
    LoadingStateService.StartLoading();
    await loginGoogle();
    googleResponseTimeout = setTimeout(
      LoadingStateService.FinishLoading,
      10 * 1000
    );
  };

  const googleResponse = async (gResponse: any) => {
    if (!gResponse.access_token) {
      //TODO: add error code
      u.e("Google account details not available");
      return;
    }

    clearTimeout(googleResponseTimeout);

    const requestData = {
      Token: gResponse.access_token,
    };

    await APICallWrapper({
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
        const session = await response.json();

        props.login(session);

        AuthorizationService.HandleLoginAttempt(u, session);
      },
      showError: true,
      onFinal: async () => {
        // Custom unblock
        LoadingStateService.FinishLoading();
      },
    });
  };

  return (
    <Box>
      <LockedButton variant="outlined" onClick={() => login()}>
        <Avatar
          style={{
            height: "100%",
            width: "100%",
          }}
          src="/static/images/logo/google.svg"
          alt=""
        />
      </LockedButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginByGoogle);
