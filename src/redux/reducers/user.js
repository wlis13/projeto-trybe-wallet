import { ACTION_USER } from '../actions';

const user = {
  email: '',
};

const userReducer = (state = user, action) => {
  switch (action.type) {
  case ACTION_USER: {
    return {
      ...state,
      email: action.email,
    };
  }

  default:
    return state;
  }
};

export default userReducer;
