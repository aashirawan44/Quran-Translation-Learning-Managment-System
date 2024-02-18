// src/redux/reducers/loginReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST } from '../actions/loginAction';

const initialState = {
  user: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
        return {
          ...state,
          error: null,
        };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
