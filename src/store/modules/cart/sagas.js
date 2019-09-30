import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";

import api from "../../../services/api";

import { addToCartSuccess } from "./actions";

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

export default all([
  // takeEvery() take every reques
  takeLatest("@cart/ADD_REQUEST", addToCart) // take only latest, if user click before request response take lastest click to call
]);
