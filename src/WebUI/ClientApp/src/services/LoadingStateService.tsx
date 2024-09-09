import {
  startLoadingActionName,
  finishLoadingActionName,
} from "src/reducers/loadingReducer";

import store from "src/state/store";

const LoadingStateService = {
  StartLoading: () => {
    store.dispatch({ type: startLoadingActionName });
  },
  FinishLoading: () => {
    store.dispatch({ type: finishLoadingActionName });
  },
};

export default LoadingStateService;
