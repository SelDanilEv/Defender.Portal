import stateLoader from "src/state/StateLoader";
import { Session } from "src/models/Session";

const sessionReducer = (
  state: Session = {
    user: {
      id: "",
      nickname: "",
      email: "",
      phone: "",
      isEmailVerified: false,
      isPhoneVerified: false,
      roles: [],
      createdDate: undefined,
    },
    language: "en",
    isAuthenticated: false,
    token: "",
  },
  action: any
) => {
  switch (action.type) {
    case "LOGIN":
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
      break;
    case "LOGOUT":
      stateLoader.cleanState();
      if (state.isAuthenticated) {
        const session: Session = {} as Session;
        session.isAuthenticated = false;
        session.language = state.language;
        state = session;
      }
      break;
    case "UPDATE_LANGUAGE":
      if (state.language) {
        state = {
          ...state,
          language: action.payload,
        };
      }
      break;
    default:
      break;
  }
  return state;
};

export default sessionReducer;
