import stateLoader from "src/state/StateLoader";
import { Session } from "src/models/Session";
import { UserAccountInfo } from "src/models/UserAccountInfo";

const sessionReducer = (
  state: Session = {
    user: {
      id: "",
      nickname: "",
      email: "",
      phone: "",
      isEmailVerified: false,
      isPhoneVerified: false,
      isBlocked: false,
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
    case loginActionName:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
      break;
    case logoutActionName:
      if (state.isAuthenticated) {
        state = {
          ...state,
          isAuthenticated: false,
          user: {
            id: "",
            nickname: "",
            email: "",
            phone: "",
            isEmailVerified: false,
            isPhoneVerified: false,
            isBlocked: false,
            roles: [],
            createdDate: undefined,
          },
        };
      }
      break;
    case updateLanguageActionName:
      if (state.language) {
        state = {
          ...state,
          language: action.payload,
        };
      }
      break;
    case updateUserInfoActionName:
      let updatedUser = action.payload as UserAccountInfo;
      state = {
        ...state,
        user: {
          ...state.user,
          nickname: updatedUser.nickname,
        },
      };
      break;
    default:
      return state;
  }

  stateLoader.saveState(state);

  return state;
};

export default sessionReducer;

export const loginActionName = "LOGIN";
export const logoutActionName = "LOGOUT";
export const updateLanguageActionName = "UPDATE_LANGUAGE";
export const updateUserInfoActionName = "UPDATE_USER_INFO";
