import { FETCH_SURAH_REQUEST, FETCH_SURAH_SUCCESS, FETCH_SURAH_FAILURE } from '../const'

import axios from "axios";

// Action creators
// export const fetchSurahRequest = () => ({
//     type: 'FETCH_SURAH_REQUEST',
//   });
  
//   export const fetchSurahSuccess = (surahs) => ({
//     type: 'FETCH_SURAH_SUCCESS',
//     payload: surahs,
//   });
  
//   export const fetchSurahFailure = (error) => ({
//     type: 'FETCH_SURAH_FAILURE',
//     payload: error,
//   });
  
  export const getSurahs = () => async (dispatch) => {
    try {
      const res = await axios.get('http://api.alquran.cloud/v1/surah');
  
      dispatch({
        type: FETCH_SURAH_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FETCH_SURAH_FAILURE,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

