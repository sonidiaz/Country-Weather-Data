import {FETCH_WEATHER_SUCCESS, FETCH_WEATHER_REQUEST} from '../action/WeatherActions.js';
const initialState = {
  weather:{},
  isFetching: false,
  result: null,
  error: null
}

const getWeather = (state=initialState, action) => {

  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        isFetching: true,
      }  
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weather: {
          ...action.dataCharts.weather,
          [action.country]: action.dataAday,
        },
        isFetching: false
      }
  
    default:
      return state;
  }
}

export default getWeather;