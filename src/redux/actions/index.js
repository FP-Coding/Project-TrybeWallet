import {
  SUBMIT_LOGIN,
  REQUEST_SUCESS,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SUBMIT_EDIT_EXPENSE,
  IS_FETCHING,
} from './actionTypes';
import requestApiCurrency from '../../helpers/apiCurrencies';

export const isRequesting = () => ({ type: IS_FETCHING });

export const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const requestSucess = (currencies) => ({
  type: REQUEST_SUCESS,
  payload: currencies,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: expense,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const submitEditExpense = (payload) => ({
  type: SUBMIT_EDIT_EXPENSE,
  payload,
});

export const requestApi = () => async (dispatch) => {
  dispatch(isRequesting());
  const responseApi = await requestApiCurrency();
  dispatch(requestSucess(responseApi));
};
