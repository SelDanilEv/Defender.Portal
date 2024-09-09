import { combineReducers, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import stateLoader from "./StateLoader";

import session from "src/reducers/sessionReducer";
import loading from "src/reducers/loadingReducer";
import wallet from "src/reducers/walletReducer";
import budgetTrackerSetup from "src/reducers/budgetTrackerSetupReducer";

export default createStore(
  combineReducers({
    wallet,
    session,
    loading,
    budgetTrackerSetup,
  }),
  stateLoader.loadState(),
  applyMiddleware(
    //comment for production
    thunk
  )
);
