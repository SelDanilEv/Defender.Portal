import IUtils from "src/appUtils/interface";
import WarningToast from "src/components/Toast/WarningToast";

export const logoutPortal = (u: IUtils, logoutAction: () => void) => {
  localStorage.clear();
  WarningToast(u.t("SessionExpired"));
  logoutAction();
  u.react.navigate("/");
};
