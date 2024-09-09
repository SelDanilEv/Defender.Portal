const loadingReducer = (
  state = {
    callsCounter: 0,
    loading: false,
  },
  action: any
) => {
  let newValue = state.callsCounter;
  switch (action.type) {
    case startLoadingActionName:
      state = {
        ...state,
        callsCounter: ++newValue,
        loading: true,
      };
      break;
    case finishLoadingActionName:
      state = {
        ...state,
        callsCounter: --newValue,
        loading: newValue > 0,
      };
      break;
    default:
      break;
  }
  return state;
};

export default loadingReducer;

export const startLoadingActionName = "START_LOADING";
export const finishLoadingActionName = "FINISH_LOADING";
