// reducer.js
import {
  SEARCH_QURAN_REQUEST,
  SEARCH_QURAN_SUCCESS,
  SEARCH_QURAN_FAILURE,
  GENERATE_QUIZ_REQUEST,
  GENERATE_QUIZ_SUCCESS,
  GENERATE_QUIZ_FAILURE
} from '../const';

const initialState = {
  loading: false,
  results: [],
  error: null,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_QURAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_QURAN_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        error: null,
      };
    case SEARCH_QURAN_FAILURE:
      return {
        ...state,
        loading: false,
        results: [],
        error: action.payload,
      };
    case GENERATE_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GENERATE_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        error: null,
      };
    case GENERATE_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        results: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default search;
