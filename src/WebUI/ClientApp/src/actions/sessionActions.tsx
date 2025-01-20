import { UserAccountInfo } from "src/models/UserAccountInfo";
import {
  loginActionName,
  logoutActionName,
  updateLanguageActionName,
  updateUserInfoActionName,
} from "src/reducers/sessionReducer";
import { cleanWalletInfoActionName } from "src/reducers/walletReducer";

export function login(session) {
  if (!session.isAuthenticated) {
    return;
  }

  return (dispath) => {
    dispath({
      type: loginActionName,
      payload: session,
    });
  };
}

export function logout() {
  return (dispath) => {
    dispath({
      type: logoutActionName,
      payload: "",
    });
    dispath({
      type: cleanWalletInfoActionName,
      payload: "",
    });
  };
}

export function updateLanguage(language) {
  return (dispath) => {
    dispath({
      type: updateLanguageActionName,
      payload: language,
    });
  };
}

export function updateUserInfo(updatedUser: UserAccountInfo) {
  return (dispath) => {
    dispath({
      type: updateUserInfoActionName,
      payload: updatedUser,
    });
  };
}
