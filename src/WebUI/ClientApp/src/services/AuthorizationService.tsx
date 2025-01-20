import IUtils from "src/appUtils/interface";
import { Session } from "src/models/Session";

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
      const urlWithToken = `${ssoUrl}?token=${encodeURIComponent(
        session.token
      )}`;

      window.open(urlWithToken, "_blank");
    } else {
      u.react.navigate("/home");
    }
  },
};

export default AuthorizationService;
