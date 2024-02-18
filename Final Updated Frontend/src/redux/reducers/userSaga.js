import { call, put, takeEvery } from 'redux-saga/effects';
import {
  SIGNUP_REQUEST,
  signupSuccess,
  signupFailure,
} from '../actions/userAction';

// Helper function to make the API call
const signupApi = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// Worker saga responsible for making the API call
function* signupUser(action) {
  try {
    yield call(signupApi, action.payload);
    yield put(signupSuccess());
    console.log("signupsaga workded",action.message)
  } catch (error) {
    yield put(signupFailure(error.message));
    console.log("error",error.message);
  }
}

// Watcher saga to trigger the worker saga on signup request
function* watchSignupRequest() {
  yield takeEvery(SIGNUP_REQUEST, signupUser);
}

export default watchSignupRequest;
