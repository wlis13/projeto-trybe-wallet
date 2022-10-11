import {
  CURRENCIES_ERROR,
  CURRENCIES_LOADING,
  CURRENCIES_SUCCESS,
  REQ_EVERY_SUCCESS,
  SAVE_NEW_LIST,
} from '../actions';

const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: false,
  loading: false,
};

function wallet(state = INITIAL_WALLET, action) {
  switch (action.type) {
  case CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currency,
      loading: false,
      error: false,
      shouldEdit: false,
    };
  case CURRENCIES_ERROR:
    return {
      ...state,
      error: true,
      loading: false,
    };
  case CURRENCIES_LOADING:
    return {
      ...state,
      loading: true,
    };
  case REQ_EVERY_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.reqExpenses],
      loading: false,
      error: false,
    };
  case SAVE_NEW_LIST:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
