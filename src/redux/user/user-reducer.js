import { userActionType } from "./user-action-type";
import {
  click
} from "./user-utils";
const INITIAL_STATE = {
  userList: [],
  currentUser: null,
  userSignUpUnVaild: null,
  userSignInUnVaild: null,
  path:null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionType.USER_LIST_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userActionType.USER_LOG_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userSignInUnVaild: false,
      };
    case userActionType.USER_LOG_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        userSignInUnVaild: true,
        errMessage: action.payload,
      };
    case userActionType.USER_LOG_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case userActionType.USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userSignUpUnVaild: false,
      };
    case userActionType.USER_SIGN_UP_FAILURE:
      return {
        ...state,
        currentUser: null,
        userSignUpUnVaild: true,
      };
    case userActionType.USER_SIGN_UP_RESTART:
      return {
        ...state,
        userSignUpUnVaild: null,
      };
    case userActionType.USER_LOG_IN_RESTART:
      return {
        ...state,
        userSignInUnVaild: null,
      };

    case userActionType.NavBarOnClick:
      return {
        ...state,
        path: click(action.payload),
      };

    default:
      return state;
  }
};

export default userReducer;
