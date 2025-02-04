import IUtils from "src/appUtils/interface";
import { Session } from "src/models/Session";
import LoadingStateService from "./LoadingStateService";

const AuthorizationService = {
  HandleLoginAttempt: (u: IUtils, session: Session) => {
    if (!session.isAuthenticated) {
      u.e("AuthorizationFailed");
      return;
    }

    if (
      !session.user.isEmailVerified &&
      !session.user.isPhoneVerified &&
      window.location.pathname !== "/welcome/verify-email"
    ) {
      u.react.navigate("/welcome/verification");
      return;
    }

    const ssoUrl = u.searchParams.get("SsoUrl");
    if (ssoUrl) {
      LoadingStateService.StartLoading();

      if (window.opener) {
        let token = session.token;

        window.opener.postMessage({ token }, ssoUrl);
        window.close();
      } else {
        console.error("No parent window found. Cannot send token.");
      }
    } else {
      u.react.navigate("/home");
    }
  },
};

export default AuthorizationService;
