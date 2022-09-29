import { SUBMIT_LOGIN } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SUBMIT_LOGIN:
    return {
      email: payload.email,
    };
  default:
    return state;
  }
}

export default user;
