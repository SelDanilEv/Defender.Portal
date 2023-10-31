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
