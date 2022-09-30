import {
  ADD_EXPENSE,
  IS_FETCHING,
  REMOVE_EXPENSE,
  REQUEST_FAILURE,
  REQUEST_SUCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  loading: false,
};

function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case IS_FETCHING:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_SUCESS:
    return {
      ...state,
      currencies: Object.entries(payload)
        .map(([symbol]) => symbol)
        .filter((symbol) => symbol !== 'USDT'),
      loading: false,
    };
  case REQUEST_FAILURE:
    return {
      ...state,
      error: payload.error,
      loading: false,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload.id),
    };
  default:
    return state;
  }
}

export default wallet;
