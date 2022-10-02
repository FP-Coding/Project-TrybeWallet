import {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  REQUEST_FAILURE,
  REQUEST_SUCESS,
  EDIT_EXPENSE,
  SUBMIT_EDIT_EXPENSE,
  IS_FETCHING,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idToEdit: '',
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
      currencies: Object.keys(payload).filter((symbol) => symbol !== 'USDT'),
      loading: false,
    };
  case REQUEST_FAILURE:
    return { ...state, error: payload.error, loading: false };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload] };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: payload,
      isEditing: true,
    };
  case SUBMIT_EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.map((expense) => {
        if (expense.id === payload.id) {
          return {
            ...expense,
            value: payload.value,
            description: payload.description,
            tag: payload.tag,
            currency: payload.currency,
            method: payload.method,
          };
        }
        return expense;
      })],
      isEditing: false,
      idToEdit: '',
    };
  default:
    return state;
  }
}

export default wallet;
