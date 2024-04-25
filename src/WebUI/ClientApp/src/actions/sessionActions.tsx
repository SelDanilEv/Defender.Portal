import { UserAccountInfo } from "src/models/UserAccountInfo";

export function login(payload) {
  return (dispath) => {
    dispath({
      type: "LOGIN",
      payload: payload,
    });
  };
}

export function logout() {
  return (dispath) => {
    dispath({
      type: "LOGOUT",
      payload: "",
    });
    dispath({
      type: "CLEAN_WALLET_INFO",
      payload: "",
    });
  };
}

export function updateLanguage(language) {
  return (dispath) => {
    dispath({
      type: "UPDATE_LANGUAGE",
      payload: language,
    });
  };
}

export function updateUserInfo(updatedUser: UserAccountInfo) {
  return (dispath) => {
    dispath({
      type: "UPDATE_USER_INFO",
      payload: updatedUser,
    });
  };
}
