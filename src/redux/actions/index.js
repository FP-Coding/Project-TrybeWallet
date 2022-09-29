import {
  SUBMIT_LOGIN,
  IS_FETCHING,
  REQUEST_FAILURE,
  REQUEST_SUCESS,
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

export const requestApi = () => async (dispatch) => {
  try {
    dispatch(isFetching());
    const responseApi = await requestApiCurrency();
    dispatch(requestSucess(responseApi));
  } catch (error) {
    dispatch(requestFailure(error));
  }
};
