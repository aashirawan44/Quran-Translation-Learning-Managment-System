import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { fetchSurahSuccess, fetchSurahFailure } from './../actions/surahAction';
import watchSignupRequest from "./userSaga"
import loginSaga from "./loginSaga";

function* fetchSurahSaga() {
  try {
    const response = yield axios.get('http://api.alquran.cloud/v1/surah');
    console.log("saga data",response.data)
    yield put(fetchSurahSuccess(response.data.data));
  } catch (error) {
    yield put(fetchSurahFailure(error.message));
  }
}

function* rootSaga() {
  yield all([
    takeLatest('FETCH_SURAH_REQUEST', fetchSurahSaga),
    watchSignupRequest(),
    loginSaga(),
  ]);
}

export default rootSaga;
