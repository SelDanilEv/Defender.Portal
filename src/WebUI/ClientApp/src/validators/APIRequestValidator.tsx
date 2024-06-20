const APIRequestValidator = {
  ValidateCreateUserRequest: async (utils, requst) => {
    if (!requst.email) {
      utils.e("error:EmptyEmail");
      return false;
    }

    if (!requst.nickname) {
      utils.e("error:EmptyNickname");
      return false;
    }

    if (!requst.password) {
      utils.e("error:EmptyPassword");
      return false;
    }

    return true;
  },
};

export default APIRequestValidator;
