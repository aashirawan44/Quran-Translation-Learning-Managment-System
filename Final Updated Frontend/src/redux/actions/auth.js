import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  INSTRUCTOR_LOADED,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
   FORGOT_PASSWORD_REQUEST ,
 FORGOT_PASSWORD_SUCCESS ,
FORGOT_PASSWORD_FAILURE ,

 VERIFY_RESET_LINK_REQUEST ,
 VERIFY_RESET_LINK_SUCCESS ,
VERIFY_RESET_LINK_FAILURE ,

SET_NEW_PASSWORD_REQUEST ,
 SET_NEW_PASSWORD_SUCCESS, 
 SET_NEW_PASSWORD_FAILURE,
 CHANGE_PASSWORD_REQUEST,
 CHANGE_PASSWORD_SUCCESS,
 CHANGE_PASSWORD_FAILURE
} from '../const';

export const instructorChangePassword = (currentPassword, newPassword) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST });

  try {
    const response = await api.post('instructorspass/change-password', { currentPassword, newPassword });
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data });
    dispatch(setAlert('Password changed successfully', 'success'));
  } catch (error) {
    dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: error.response.data });
    dispatch(setAlert(JSON.stringify(error.response.data.errors), 'danger'))
  }
};



// Action Creators
export const changePassword = (currentPassword, newPassword) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST });

  try {
    const response = await api.post('userspass/change-password', { currentPassword, newPassword });
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data });
    dispatch(setAlert('Password changed successfully', 'success'));
    
  } catch (error) {
    dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: error.response.data });
    dispatch(setAlert(JSON.stringify(error.response.data.errors), 'danger'))
    
  }
};

// Action Creators
export const instructorForgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });

  try {
    const response = await api.post('/instructorsPass', { email });
    dispatch({  type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    dispatch(setAlert('Email Send', 'success'))
    
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.response.data });
    dispatch(setAlert('Email NOT Send', 'danger'))
  }
};

export const instructorVerifyResetLink = (id, token) => async (dispatch) => {
  dispatch({ type: VERIFY_RESET_LINK_REQUEST });

  try {
    const response = await api.get(`instructorspass/${id}/${token}/`);
    dispatch({ type: VERIFY_RESET_LINK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: VERIFY_RESET_LINK_FAILURE, payload: error.response.data });
  }
};

export const instructorSetNewPassword = (id, token, password) => async (dispatch) => {
  dispatch({ type: SET_NEW_PASSWORD_REQUEST });

  try {
    const response = await api.post(`instructorspass/${id}/${token}/`, { password });

    if (response.data.success) {
      // Password changed successfully
      dispatch({ type: SET_NEW_PASSWORD_SUCCESS, payload: response.data });
      dispatch(setAlert('Password Changed', 'success'));
    } else {
      // Password change failed
      dispatch({ type: SET_NEW_PASSWORD_FAILURE, payload: response.data });

      // Check for a specific condition (e.g., password complexity)
      if (response.data.message.includes('Password Does not Contain @ or Capital Letter')) {
        dispatch(setAlert('Password Does not Contain @ or Capital Letter or Number', 'danger'));
      } else {
        
        dispatch(setAlert('Password Does not Contain @ or Capital Letter or Number', 'danger'));
      }
    }
  } catch (error) {
    // Handle network or unexpected errors
    dispatch({ type: SET_NEW_PASSWORD_FAILURE, payload: error.response.data });
    dispatch(setAlert('Password Does not Contain @ or Capital Letter or Number', 'danger'));
  }
};///
// Action Creators
export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });

  try {
    const response = await api.post('/usersPass', { email });
    dispatch({  type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    dispatch(setAlert('Email Send', 'success'))
    
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.response.data });
    dispatch(setAlert('Email NOT Send', 'danger'))
  }
};

export const verifyResetLink = (id, token) => async (dispatch) => {
  dispatch({ type: VERIFY_RESET_LINK_REQUEST });

  try {
    const response = await api.get(`userspass/${id}/${token}/`);
    dispatch({ type: VERIFY_RESET_LINK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: VERIFY_RESET_LINK_FAILURE, payload: error.response.data });
  }
};

export const setNewPassword = (id, token, password) => async (dispatch) => {
  dispatch({ type: SET_NEW_PASSWORD_REQUEST });

  try {
    const response = await api.post(`userspass/${id}/${token}`, { password });

    if (response.data.success) {
      // Password changed successfully
      dispatch({ type: SET_NEW_PASSWORD_SUCCESS, payload: response.data });
      dispatch(setAlert('Password Changed', 'success'));
    } else {
      // Password change failed
      dispatch({ type: SET_NEW_PASSWORD_FAILURE, payload: response.data });

      // Check for a specific condition (e.g., password complexity)
      if (response.data.message.includes('Password Does not Contain @ or Capital Letter')) {
        dispatch(setAlert('Password Does not Contain @ or Capital Letter or Number', 'danger'));
      } else {
        
        dispatch(setAlert('Password Does not Contain @ or Capital Letter or Number', 'danger'));
      }
    }
  } catch (error) {
    // Handle network or unexpected errors
    dispatch({ type: SET_NEW_PASSWORD_FAILURE, payload: error.response.data });
    dispatch(setAlert('Password Does not Contain @ or Capital Letter or Number', 'danger'));
  }
};
// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    console.log("auth action",res);

    dispatch({
      type: USER_LOADED,
      payload: res.data

    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const loadInstructor = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/instAuth');

    dispatch({
      type: INSTRUCTOR_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const loadAdmin = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/adminLogin');

    dispatch({
      type: ADMIN_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert(res.data.message, 'success'))
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
     // If there is a response message, dispatch an alert with that message
     if (err.response && err.response.data.message) {
      dispatch(setAlert(err.response.data.message, 'danger'));
    }


    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const registerInstructor = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/instructors', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadInstructor());

    // Optionally, you can dispatch an alert for success as well
    dispatch(setAlert(res.data.message, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    // If there is a response message, dispatch an alert with that message
    if (err.response && err.response.data.message) {
      dispatch(setAlert(err.response.data.message, 'danger'));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Logged In Success', 'success'))
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const loginInstructor = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth/instLogin', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Logged In Success', 'success'))
    dispatch(loadInstructor());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const loginAdmin = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth/adminLogin', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Logged In Success', 'success'))
    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
