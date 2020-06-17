import {FETCH_WEATHER_SUCCESS, FETCH_WEATHER_REQUEST, FETCH_WEATHER_TODAY_SUCCESS} from '../action/WeatherActions.js';
const initialState = {
  weather:{},
  weatherInfo:{},
  weatherInMutable:{},
  cities:[],
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
        cities: action.payload.cities,
        weather: {
          ...state.weather,
          ...action.payload.weather,
        },
        weatherInfo:{
          ...action.payload.weatherInfo,
        },
        weatherInMutable: action.payload.weather,
        isFetching: false
      }
    case FETCH_WEATHER_TODAY_SUCCESS:
      return {
        ...state,
        weather: {
          ...state.weather,
          ...action.payload.weather,
        },
        isFetching: false
      }
  
    default:
      return state;
  }
}

export default getWeather;