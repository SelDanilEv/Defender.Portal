import APICallProps from "./interfaces/APICallProps";

import store from "src/state/store";
import LoadingStateService from "src/services/LoadingStateService";
import SuccessToast from "src/components/Toast/DefaultSuccessToast";

const APICallWrapper = async ({
  url,
  options,
  utils = null,
  onSuccess = async (response) => {},
  onFailure = async (response) => {},
  onFinal = async () => {},
  showSuccess = false,
  successMessage = undefined,
  showError = true,
  doLock = true,
}: APICallProps) => {
  try {
    if (doLock) LoadingStateService.StartLoading();

    if (!options.headers) {
      options.headers = {};
    }

    let session = store.getState().session;

    if (session.isAuthenticated) {
      options.headers["Authorization"] = `Bearer ${session.token}`;
    }

    options.headers["Content-Type"] = "application/json";

    const response = await fetch(url, options);

    switch (response.status) {
      case 200:
        onSuccess(response);

        if (showSuccess || successMessage) {
          if (!successMessage && utils != null) {
            successMessage = utils.t("Notification_Success");
          }

          SuccessToast(successMessage);
        }
        return;
      case 401:
        onFailure(response);
        break;
      case 403:
        utils?.e("error:ForbiddenAccess");
        break;
      default:
        onFailure(response);

        if (showError) {
          let error = await response.json();
          if (utils) utils.e(error.detail);
          break;
        }
    }
  } catch (error) {
    console.error(error);
    await onFailure(error);
    if (utils) utils.e(error.detail);
  } finally {
    await onFinal();
    if (doLock) LoadingStateService.FinishLoading();
  }
};

export default APICallWrapper;
