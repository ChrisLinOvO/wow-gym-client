import { call, all } from "redux-saga/effects";

import { shopSagas } from "./shop/shop-saga";
import { userSaga } from "./user/user-saga";
import { employeeSaga } from "./employee/employee-saga";

export default function* rootSaga() {
  yield all([call(shopSagas), call(userSaga), call(employeeSaga)]);
}
