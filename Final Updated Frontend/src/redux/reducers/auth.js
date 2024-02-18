import {
  REGISTER_SUCCESS,
  //REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  INSTRUCTOR_LOADED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  VERIFY_RESET_LINK_REQUEST,
  VERIFY_RESET_LINK_SUCCESS,
  VERIFY_RESET_LINK_FAILURE,
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_RESET_ERROR,
  ADMIN_LOADED,
} from '../const';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  loading: true,
  message: '',
  user: null,
  isVerified: false,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  

  switch (type) {

    case CHANGE_PASSWORD_RESET_ERROR:
      console.log('Resetting error state');

  return { ...state, error: null };
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true, error: action.payload };
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, success: false, error: action.payload };

    case FORGOT_PASSWORD_REQUEST:
      case VERIFY_RESET_LINK_REQUEST:
      case SET_NEW_PASSWORD_REQUEST:
        return { ...state, loading: true, error: null, message: '' };
  
      case FORGOT_PASSWORD_SUCCESS:
      case VERIFY_RESET_LINK_SUCCESS:
      case SET_NEW_PASSWORD_SUCCESS:
        return { ...state, loading: false, error: null, message: action.payload.message,
          isVerified: action.payload.success};
  
      case FORGOT_PASSWORD_FAILURE:
      case VERIFY_RESET_LINK_FAILURE:
      case SET_NEW_PASSWORD_FAILURE:
        return { ...state, loading: false, error: action.payload.message, message: '',isVerified: action.payload.success, };
  
    case USER_LOADED:
      console.log("auth reducer",action);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
      case ADMIN_LOADED:
        console.log("auth reducer",action);
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case INSTRUCTOR_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        message: payload.message,
      };
    case LOGIN_SUCCESS:
      const { token, userId } = action.payload.data;
      return {
        ...state,
        token,
        userId,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case ACCOUNT_DELETED:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
  localStorage.removeItem('userRole');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        instructor: null,
        userRole:null
      };
    default:
      return state;
  }
}

export default authReducer;
