const APIEndpoints = {
  authorization: {
    login: "login",
    create: "create",
    google: "google",
  },
  verification: {
    check: "check",
    verifyEmail: "verify/email",
    resendEmail: "resend/email",
  },
  home: {
    healthcheck: "health",
    authcheck: "authorization/check",
    configuration: "configuration",
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
