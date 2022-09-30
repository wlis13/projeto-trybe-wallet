import { ACTION_USER } from '../actions';

const userEmail = {
  email: '',
};

const user = (state = userEmail, action) => {
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

export default user;
