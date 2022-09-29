import { SUBMIT_LOGIN } from './actionTypes';
// Coloque aqui suas actions
const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export default submitLogin;
