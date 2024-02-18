import { FETCH_SURAH_REQUEST,FETCH_SURAH_SUCCESS,FETCH_SURAH_FAILURE } from "../const"

// Reducer
const initialState = {
    surah: {
        surahs: [], // The surahs data array
        loading: false,
        error: null,
      },
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
    
      case FETCH_SURAH_SUCCESS:
        // console.log(action.payload.data)
        return {
          ...state,
          loading: false,
          surahs: action.payload.data,
        };
      case FETCH_SURAH_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  