import {
  SUBMIT_LOGIN,
  IS_FETCHING,
  REQUEST_FAILURE,
  REQUEST_SUCESS,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
} from './actionTypes';
import requestApiCurrency from '../../helpers/apiCurrencies';
// Coloque aqui suas actions

export const isFetching = () => ({ type: IS_FETCHING });

export const requestFailure = (error) => ({ type: REQUEST_FAILURE, payload: error });

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

export const requestApi = () => async (dispatch) => {
  try {
    dispatch(isFetching());
    const responseApi = await requestApiCurrency();
    dispatch(requestSucess(responseApi));
  } catch (error) {
    console.log(error);
    dispatch(requestFailure(error));
  }
};
