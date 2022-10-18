const SAVE_USER = 'SAVE_USER';
const CURRENCIES_SUCCESS = 'CURRENCIES_SUCCESS';
const CURRENCIES_ERROR = 'CURRENCIES_ERROR';
const CURRENCIES_LOADING = 'CURRENCIES_LOADING';
const REQ_EVERY_SUCCESS = 'REQ_EVERY_SUCCESS';
const SAVE_NEW_LIST = 'SAVE_NEW_LIST';
const EDIT_INPUT = 'EDIT_INPUT';
const NEGATIVE_EDIT = 'NEGATIVE_EDIT';
const EDIT_FALSE = 'EDIT_FALSE';

function saveUser(email) {
  return {
    type: SAVE_USER,
    email,
  };
}

const requisitionSuccess = (currency) => ({
  type: CURRENCIES_SUCCESS,
  currency,
});

const requisitionError = (error) => ({
  type: CURRENCIES_ERROR,
  error,
});

function requisitionThunk() {
  return async (dispatch) => {
    try {
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const promise = await fetch(url);
      const response = await promise.json();
      const currencies = Object.keys(response).filter((itens) => !itens.includes('USDT'));
      dispatch(requisitionSuccess(currencies));
    } catch (error) {
      requisitionError(error);
    }
  };
}

const reqEverySuccess = (reqExpenses) => ({
  type: REQ_EVERY_SUCCESS,
  reqExpenses,
});

function requisitionEveryThunk(stateValue) {
  return async (dispatch) => {
    try {
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const promise = await fetch(url);
      const response = await promise.json();
      const objectExpense = {
        ...stateValue,
        exchangeRates: {
          ...response,
        },
      };
      dispatch(reqEverySuccess(objectExpense));
    } catch (error) {
      requisitionError(error);
    }
  };
}

function newList(payload) {
  return {
    type: SAVE_NEW_LIST,
    payload,
  };
}

const editInput = (payload) => ({
  type: EDIT_INPUT,
  payload,
});

const negativeEdit = () => ({
  type: NEGATIVE_EDIT,
});

const editFalse = () => ({
  type: EDIT_FALSE,
});

export {
  saveUser,
  SAVE_USER,
  requisitionThunk,
  CURRENCIES_SUCCESS,
  CURRENCIES_ERROR,
  CURRENCIES_LOADING,
  requisitionEveryThunk,
  REQ_EVERY_SUCCESS,
  newList,
  SAVE_NEW_LIST,
  editInput,
  EDIT_INPUT,
  negativeEdit,
  NEGATIVE_EDIT,
  EDIT_FALSE,
  editFalse,

};
