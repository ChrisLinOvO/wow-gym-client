import { userActionType } from "./user-action-type";

export const userListStart = () => ({
  type: userActionType.USER_LIST_START,
});

export const userListSuccess = (list) => ({
  type: userActionType.USER_LIST_SUCCESS,
  payload: list,
});

export const userListFailure = (err) => ({
  type: userActionType.USER_LIST_FAILURE,
  payload: err,
});

export const userLoginStart = (user) => ({
  type: userActionType.USER_LOG_IN_START,
  payload: user,
});

export const userLoginSuccess = (currentUser) => ({
  type: userActionType.USER_LOG_IN_SUCCESS,
  payload: currentUser,
});

export const userLoginFailure = (err) => ({
  type: userActionType.USER_LOG_IN_FAILURE,
  payload: err,
});

export const userLogoutStart = () => ({
  type: userActionType.USER_LOG_OUT_START,
});

export const userLogoutSuccess = () => ({
  type: userActionType.USER_LOG_OUT_SUCCESS,
});

export const userLogoutFailure = (err) => ({
  type: userActionType.USER_LOG_OUT_FAILURE,
  payload: err,
});

export const userSignUpStart = (user) => ({
  type: userActionType.USER_SIGN_UP_START,
  payload: user,
});

export const userSignUpSuccsee = (signupUser) => ({
  type: userActionType.USER_SIGN_UP_SUCCESS,
  payload: signupUser,
});

export const userSignUpFailer = (err) => ({
  type: userActionType.USER_SIGN_UP_FAILURE,
  errMessage: err,
  payload: null,
});

export const userSignUpRestart = () => ({
  type: userActionType.USER_SIGN_UP_RESTART,
});

export const userLoginRestart = () => ({
  type: userActionType.USER_LOG_IN_RESTART,
});

export const googleLoginStart = () => ({
  type: userActionType.GOOGLE_LOG_IN_START,
});




export const NavBarOnClick = (currentUser) => ({
  type: userActionType.NavBarOnClick,
  payload: currentUser,
});
