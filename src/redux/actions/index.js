export const ACTION_USER = 'ACTION_USER';

export const userAction = (email) => ({
  type: ACTION_USER,
  email,
});

export const ACTION_WALLET = 'ACTION_WALLET';

export const walletAction = (currencies, expenses, editor, idToEdit) => ({
  type: ACTION_WALLET,
  currencies,
  expenses,
  editor,
  idToEdit,
});
