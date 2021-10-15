import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";

import { shopActionTypes } from "./shop-action-type";
import {
  shopFetchSuccess,
  shopFetchFailure,
  shopItemSuccess,
  shopPageFailure,
  shopPageSuccess,
} from "./shop-action";

// Shop Fetch-----------------
export function* ShopFetchAsyncSaga({ payload, typeUrl }) {
  try {
    let data;
    if (!typeUrl && payload) {
      const {
        data: { collection },
      } = yield axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/shop/${payload}`
      );
      data = collection;
    } else {
      const {
        data: { collection },
      } = yield axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/shop/shopitem/${typeUrl}`
      );
      data = collection;
    }
    yield put(shopFetchSuccess(data));
  } catch (err) {
    yield put(shopFetchFailure(err));
  }
}

export function* ShopFetchStartSaga() {
  yield takeLatest(shopActionTypes.SHOP_FETCH_START, ShopFetchAsyncSaga);
}
// -------------------

// shop item fetch---------------
export function* ShopItemAsyncSaga({ payload }) {
  try {
    const {
      data: { shopItem },
    } = yield axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/shop/detail/${payload}`
    );
    yield put(shopItemSuccess(shopItem[0]));
  } catch (err) {
    yield put(shopFetchFailure(err));
  }
}

export function* ShopItemFetchStartSaga() {
  yield takeLatest(shopActionTypes.SHOP_ITEM_START, ShopItemAsyncSaga);
}
// -------------------
export function* ShopPageAsyncSaga() {
  try {
    const {
      data: { collection },
    } = yield axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/shop`);
    yield put(shopPageSuccess(collection));
  } catch (err) {
    yield put(shopPageFailure(err));
  }
}

export function* ShopPageFetchStartSaga() {
  yield takeLatest(shopActionTypes.SHOP_PAGE_START, ShopPageAsyncSaga);
}

export function* shopSagas() {
  yield all([
    call(ShopFetchStartSaga),
    call(ShopItemFetchStartSaga),
    call(ShopPageFetchStartSaga),
  ]);
}
