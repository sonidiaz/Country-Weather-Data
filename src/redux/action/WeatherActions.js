import cityWeatherService from "../../service/cityService";
import moment from "moment";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_REQUEST = "FETCH_WEATHER_REQUEST";
export const FETCH_WEATHER_TODAY_SUCCESS = "FETCH_WEATHER_TODAY_SUCCESS";

const getWeatherListRedux = () => (dispatch) => {
  dispatch({ type: FETCH_WEATHER_REQUEST });
  const getWeatherList = () => {
    const getValueForMetrics = async () => {
      const resp = await listCityWeather();
      return resp;
    };
  
    getValueForMetrics().then((cities, i) => {
      const nameCity = Object.keys(cities);
      const infoCity = nameCity.map((city) => {
        return {
          ...cities[city][0].info
        }
      });
      
      dispatch({
        type: FETCH_WEATHER_SUCCESS,
        payload: {
          weather: cities,
          weatherInMutable: cities,
          cities: nameCity,
          weatherInfo: infoCity
        },
      });
    });
  };
  getWeatherList();
};
const getWeatherAll = (weatherList, country, flag) => (dispatch) => {
  if (flag === "local") {
    dispatch({
      type: FETCH_WEATHER_TODAY_SUCCESS,
      payload: {
        weather: {
          ...weatherList.weather,
          [country]: weatherList.weatherInMutable[country],
        },
        cities: weatherList.cities,
      },
    });
  } else {
    dispatch({
      type: FETCH_WEATHER_TODAY_SUCCESS,
      payload: {
        weather: weatherList.weatherInMutable,
        cities: weatherList.cities,
      },
    });
  }
};

const getWeatherADay = (weatherList, country, flag) => (dispatch) => {
  const weatherFilterAll = {};
  if (flag === undefined) {
    let endDataAll = moment().add(1, "day").format();

    const value = weatherList.cities.map((e, i) => {
      const currentWeatherAll = weatherList.weatherInMutable[e];
      const nameCity = weatherList["cities"][i];
      const dataAdayAll = currentWeatherAll.filter((day, idx) => {
        const aDate = moment.unix(day.dt).format();
        if (aDate < endDataAll) {
          return {
            day,
          };
        }
        return false;
      });
      return {
        [nameCity]: dataAdayAll,
      };
    });
    value.forEach((e, i) => {
      const nameCity = weatherList["cities"][i];
      weatherFilterAll[nameCity] = e[nameCity];
    });
    dispatch({
      type: FETCH_WEATHER_TODAY_SUCCESS,
      payload: {
        weather: {
          ...weatherList.weather,
          ...weatherFilterAll,
        },
      },
    });
  } else {
    let endData = moment().add(1, "day").format();
    const currentCity = weatherList.weatherInMutable[country];
    const dataAday = currentCity.filter((day) => {
      const aDate = moment.unix(day.dt).format();
      if (aDate < endData) {
        return day;
      }
      return false;
    });

    dispatch({
      type: FETCH_WEATHER_TODAY_SUCCESS,
      payload: {
        weather: {
          ...weatherList.weather,
          [country]: dataAday,
        },
      },
    });
  }
};
const getWeatherToDay = (weatherList, country, flag) => (dispatch) => {
  const weatherFilterAll = {};
  if (flag === undefined) {
    const value = weatherList.cities.map((e, i) => {
      const currentWeatherAll = weatherList.weatherInMutable[e];
      const nameCity = weatherList["cities"][i];
      const dataAdayAll = currentWeatherAll.filter((day, idx) => {
        const aDate = moment.unix(day.dt).format();
        const endData = moment().endOf("day").format();
        if (aDate < endData) return day;
        else return false;
      });
      return {
        [nameCity]: dataAdayAll,
      };
    });
    value.forEach((e, i) => {
      const nameCity = weatherList["cities"][i];
      weatherFilterAll[nameCity] = e[nameCity];
    });
    dispatch({
      type: FETCH_WEATHER_TODAY_SUCCESS,
      payload: {
        weather: {
          ...weatherList.weather,
          ...weatherFilterAll,
        },
      },
    });
  } else {
    const currentCity = weatherList.weatherInMutable[country];
    const dataAday = currentCity.filter((day) => {
      const aDate = moment.unix(day.dt).format();
      const endData = moment().endOf("day").format();
      if (aDate < endData) {
        return day;
      }
      return false;
    });

    dispatch({
      type: FETCH_WEATHER_TODAY_SUCCESS,
      payload: {
        weather: {
          ...weatherList.weather,
          [country]: dataAday,
        },
      },
    });
  }
};

export { getWeatherListRedux, getWeatherToDay, getWeatherADay, getWeatherAll };

async function listCityWeather() {
  let AllCountrysData = {};
  const allCitys = await Promise.all([
    await cityWeatherService.get("Madrid"),
    await cityWeatherService.get("Santiago"),
    await cityWeatherService.get("Londres"),
    await cityWeatherService.get("Moscu"),
    await cityWeatherService.get("Dubai"),
    await cityWeatherService.get("Tokio"),
  ]);

  for (let index = 0; index < allCitys.length; index++) {
    // Get data for display
    const allMetrics = allCitys[index].data.list.map((el) => {
      return {
        info:{
          ...allCitys[index].data.city
        },
        ...el,
        dt: el.dt,
        name: el.dt_txt,
        sensacion: el.main.feels_like,
        temperatura: el.main.temp,
        temp_max: el.main.temp_max,
        temp_min: el.main.temp_min,
        weather: [...el.weather]
      };
    });
    
    AllCountrysData[allCitys[index].data.city.name] = allMetrics;
  }
  return AllCountrysData;
}
