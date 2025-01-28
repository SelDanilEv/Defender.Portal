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

      const urlWithToken = `${ssoUrl}?token=${encodeURIComponent(
        session.token
      )}`;

      window.open(urlWithToken, "_blank");
      window.close();
    } else {
      u.react.navigate("/home");
    }
  },
};

export default AuthorizationService;
