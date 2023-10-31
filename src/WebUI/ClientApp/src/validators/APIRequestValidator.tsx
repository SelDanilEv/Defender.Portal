const APIRequestValidator = {
  ValidateCreateUserRequest: async (utils, requst) => {
    if (!requst.email) {
      utils.e("Error_EmptyEmail");
      return false;
    }

    if (!requst.nickname) {
      utils.e("Error_EmptyNickname");
      return false;
    }

    if (!requst.password) {
      utils.e("Error_EmptyPassword");
      return false;
    }

    return true;
  },
};

export default APIRequestValidator;
