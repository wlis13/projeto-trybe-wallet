const wallet = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = wallet, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default walletReducer;
