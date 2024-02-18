// src/redux/sagas/loginSaga.js
import { put, call, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from '../actions/loginAction';
import axios from 'axios';


export const signin = async (email, password) => {
    try {
        const headers = {
            'Content-Type': 'application/json', 
          };  
      const response = await axios.post('http://localhost:5000/api/auth', email,password, { headers })

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  


function* handleLogin(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(signin, email, password); // Make the API call using the signin function
    const token  = response.data.token; // Extract the token from the API response

    // Store the token in local storage
    localStorage.setItem('token', token);

    yield put(loginSuccess(response)); // Dispatch success action with the received data
  } catch (error) {
    yield put(loginFailure(error.message)); // Dispatch failure action with the error message
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
