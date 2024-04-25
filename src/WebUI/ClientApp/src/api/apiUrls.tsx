const APIEndpoints = {
  admin: {
    //User management
    searchFullUserInfo: "user/search/full-user-info",
    userList: "user/list",
    updateUserInfo: "user/update",
    updateAccountInfo: "user/account/update",
    updateAccountPassword: "user/account/password/update",

    //Banking
    startRecharge: "banking/recharge",
  },
  authorization: {
    login: "login",
    create: "create",
    google: "google",
  },
  account: {
    updateInfo: "update",
    updateSensitiveInfo: "update/sensitive",
  },
  verification: {
    check: "check",
    verifyEmail: "verify/email",
    sendUpdateAccountCode: "send/update-account",
    verifyAccessCode: "verify/code",
    resendEmail: "resend/email",
  },
  home: {
    healthcheck: "health",
    authcheck: "authorization/check",
    configuration: "configuration",
  },
  banking: {
    walletInfo: "wallet/info",
    walletPublicInfo: "wallet/info/public",
    walletCreateAccount: "wallet/account/create",
    startTransfer: "transaction/start/transfer",
    transactionHistory: "transaction/history",
  },
};

const APIUrls = () => {
  let urls = APIEndpoints;

  for (let controllerName in APIEndpoints) {
    var controller = APIEndpoints[controllerName];
    for (let endpointName in controller) {
      var endpoint = controller[endpointName];
      urls[controllerName][endpointName] = `/api/${controllerName}/${endpoint}`;
    }
  }

  return urls;
};

export default APIUrls() || APIEndpoints;
