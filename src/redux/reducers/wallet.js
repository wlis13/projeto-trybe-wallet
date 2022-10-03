import { ACTION_WALLET } from '../actions';

const walletReducer = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = walletReducer, action) => {
  switch (action.type) {
  case ACTION_WALLET: {
    return {
      ...state,
      currencies: action.currencies,
    };
  }
  default:
    return state;
  }
};

export default wallet;
