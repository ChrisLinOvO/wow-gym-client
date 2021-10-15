import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";

import { employeeActionType } from "./employee-action-type";
import { employeeListSuccess, employeeListFailure } from "./employee-action";

export function* employeeListAsyncSaga() {
  try {
    const { data } = yield axios.get("http://localhost:5000/api/employee");
    yield put(employeeListSuccess(data));
  } catch (err) {
    yield put(employeeListFailure(err));
  }
}

export function* employeeListStartSaga() {
  yield takeLatest(
    employeeActionType.EMPLOYEE_LIST_START,
    employeeListAsyncSaga
  );
}

export function* employeeSaga() {
  yield all([call(employeeListStartSaga)]);
}