import { call, select, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "../../../services/api";
import { formatPrice } from "../../../util/format";

import { addToCartSuccess, updateAmountSuccess } from "./actions";

// put to dipatch event to redux
// call to call some api
// all to combine the action (@cart/ADD_REQUEST) the method (addToCart) will be listen

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error("Não há estoque!");
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price)
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error("Não há estoque!");
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  // takeEvery() take every reques
  takeLatest("@cart/ADD_REQUEST", addToCart), // take only latest, if user click before request response take lastest click to call
  takeLatest("@cart/UPDATE_AMOUNT_REQUEST", updateAmount)
]);
