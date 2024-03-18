const APIEndpoints = {
  authorization: {
    login: "login",
    create: "create",
    google: "google",
  },
  account: {
    updateInfo: "update",
    updateSentitiveInfo: "update/sentitive",
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
  wallet: {
    info: "info",
    createAccount: "account/create",
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
