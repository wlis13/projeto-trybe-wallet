import { combineReducers } from 'redux';
import userReducer from './user';
import wallet from './wallet';

const reducer = combineReducers({
  user: userReducer,
  walletReducer: wallet,
});

export default reducer;
