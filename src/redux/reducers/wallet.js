import {
  CURRENCIES_ERROR,
  CURRENCIES_SUCCESS,
  EDIT_FALSE,
  EDIT_INPUT,
  NEGATIVE_EDIT,
  REQ_EVERY_SUCCESS,
  SAVE_NEW_LIST,
} from '../actions';

const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: false,
  idEdit: '',
  edit: false,
};

function wallet(state = INITIAL_WALLET, action) {
  switch (action.type) {
  case CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currency,
      shouldEdit: false,
      editor: false,
    };
  case CURRENCIES_ERROR:
    return {
      ...state,
      error: true,
    };
  case REQ_EVERY_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.reqExpenses],
      editor: false,
    };
  case SAVE_NEW_LIST:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_INPUT:
    return {
      ...state,
      edit: true,
      editor: true,
      idEdit: action.payload,
    };
  case NEGATIVE_EDIT:
    return {
      ...state,
      editor: false,
    };
  case EDIT_FALSE:
    return {
      ...state,
      edit: false,
    };
  default:
    return state;
  }
}

export default wallet;
