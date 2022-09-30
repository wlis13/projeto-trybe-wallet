import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const reducer = combineReducers({
  userReducer: user,
  walletReducer: wallet,
});

export default reducer;
