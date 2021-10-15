import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";

import { userActionType } from "./user-action-type";
import {
  userListSuccess,
  userListFailure,
  userSignUpFailer,
  userLoginSuccess,
  userLoginFailure,
  userLogoutFailure,
  userLogoutSuccess,
  userSignUpSuccsee,
} from "./user-action";

export function* userListAsyncSaga() {
  try {
    const {
      data,
    } = yield axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/current-user`,
      { withCredentials: true }
    );
    yield put(userListSuccess(data));
  } catch (err) {
    yield put(userListFailure(err));
  }
}

export function* userListStartSaga() {
  yield takeLatest(userActionType.USER_LIST_START, userListAsyncSaga);
}

// User Sign in
export function* userLoginAsyncSaga({ payload }) {
  try {
    // console.log(payload);
    const {
      data,
    } = yield axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
      payload,
      { withCredentials: true }
    );
    // console.log(data);
    yield put(userLoginSuccess(data));
  } catch (err) {
    yield put(userLoginFailure(err));
  }
}

export function* userLoginStartSaga() {
  yield takeLatest(userActionType.USER_LOG_IN_START, userLoginAsyncSaga);
}

// User Sign up
export function* userSignUpAsyncSaga({ payload }) {
  try {
    console.log(payload);
    const {
      data,
    } = yield axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/signup`,
      payload,
      { withCredentials: true }
    );
    if (data) {
      yield put(userSignUpSuccsee(data));
    } else {
      yield put(userSignUpFailer("This email has been used"));
    }
  } catch (err) {
    yield put(userSignUpFailer(err));
  }
}

export function* userSignUpStartSaga() {
  yield takeLatest(userActionType.USER_SIGN_UP_START, userSignUpAsyncSaga);
}

// Sign out
export function* userSignoutAsyncSaga() {
  try {
    yield axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/logout`, {
      withCredentials: true,
    });
    yield put(userLogoutSuccess());
  } catch (err) {
    yield put(userLogoutFailure(err));
  }
}

export function* userSignoutStartSaga() {
  yield takeLatest(userActionType.USER_LOG_OUT_START, userSignoutAsyncSaga);
}

// Google log in
export function* googleLoginAsyncSaga() {
  try {
    // console.log(payload);
    const { data } = yield axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/google`
      // {
      //   withCredentials: true,
      // }
    );
    console.log(data);
    yield put(userLoginSuccess(data));
  } catch (err) {
    yield put(userLoginFailure(err));
  }
}

export function* googleLoginStartSaga() {
  yield takeLatest(userActionType.GOOGLE_LOG_IN_START, googleLoginAsyncSaga);
}

export function* userSaga() {
  yield all([
    call(userListStartSaga),
    call(userSignUpStartSaga),
    call(userLoginStartSaga),
    call(userSignoutStartSaga),
    call(googleLoginStartSaga),
  ]);
}
