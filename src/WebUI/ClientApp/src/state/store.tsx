import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import stateLoader from "./StateLoader";

import session from "src/reducers/sessionReducer";
import loading from "src/reducers/loadingReducer";
import wallet from "src/reducers/walletReducer";
import budgetTrackerSetup from "src/reducers/budgetTrackerSetupReducer";
import budgetTrackerGroups from "src/reducers/budgetTrackerGroupsReducer";

export default createStore(
  combineReducers({
    wallet,
    session,
    loading,
    budgetTrackerSetup,
    budgetTrackerGroups,
  }),
  stateLoader.loadState(),
  applyMiddleware(
    //comment for production
    thunk
  )
);
