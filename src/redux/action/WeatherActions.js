export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';


const getWeatherList = (inputData) => (dispatch) => {

  dispatch({type: FETCH_WEATHER_REQUEST});

  setTimeout(() => {
    dispatch({
      type: FETCH_WEATHER_SUCCESS,
      info: {
        weather: {data:1}
      }
    })
  }, 2000);

}
