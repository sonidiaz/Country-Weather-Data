import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  Bar,
  BarChart,
} from "recharts";
import { connect } from "react-redux";
import {
  getWeatherADay,
  getWeatherToDay,
  getWeatherAll,
} from "../redux/action/WeatherActions";
import {isMobile} from '../helpers/mobileDetect.js'

const Charts = ({
  weatherList,
  getWeatherADay,
  getWeatherToDay,
  getWeatherAll,
}) => {

  const renderCharts = (data, country, i) => {
    const setWidthGraph = () => {
      return (isMobile.any() === null) ? (window.innerWidth / 3 - 2) : window.innerWidth
    }
    if (i === 0 || i === 1) {
      return (
        <div className="pure-u-1  pure-u-md-8-24" key={i}>
          <h2>{weatherList.cities[i]}</h2>
          <div className="pure-g mt-10">
            <div className="pure-u-1-1 my-2">
              <button
                className="pure-button button-small"
                onClick={() => getWeatherAll(weatherList, country[i], "local")}
              >
                Por semana
              </button>
              <button
                className="pure-button button-small"
                onClick={() => getWeatherADay(weatherList, country[i], "local")}
              >
                Próximas 24 horas
              </button>
              <button
                className="pure-button button-small"
                onClick={() =>
                  getWeatherToDay(weatherList, country[i], "local")
                }
              >
                Hoy
              </button>
            </div>
          </div>
          <LineChart
            width={setWidthGraph() }
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperatura"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="sensacion" stroke="#82ca9d" />
            <Line type="monotone" dataKey="temp_max" stroke="#823454" />
          </LineChart>
          <Link to={`/${country[i]}`}>
            <button className="pure-button pure-button-primary button-large my-2">
              Ver detalle
            </button>
          </Link>
        </div>
      );
    }
    if (i === 2 || i === 3) {
      return (
        <div className="pure-u-1  pure-u-md-8-24" key={i}>
          <h2>{weatherList.cities[i]}</h2>
          <div className="pure-g mt-10">
            <div className="pure-u-1-1 my-2">
              <button
                className="pure-button button-small"
                onClick={() => getWeatherAll(weatherList, country[i], "local")}
              >
                Por semana
              </button>
              <button
                className="pure-button button-small"
                onClick={() => getWeatherADay(weatherList, country[i], "local")}
              >
                Próximas 24 horas
              </button>
              <button
                className="pure-button button-small"
                onClick={() =>
                  getWeatherToDay(weatherList, country[i], "local")
                }
              >
                Hoy
              </button>
            </div>
          </div>
          <AreaChart
            width={ setWidthGraph() }
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperatura"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="sensacion" stroke="#82ca9d" />
            <Line type="monotone" dataKey="temp_max" stroke="#823454" />
            <Area
              type="monotone"
              dataKey="temperatura"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
          <Link to={`/${country[i]}`}>
            <button className="pure-button pure-button-primary button-large my-2">
              Ver detalle
            </button>
          </Link>
        </div>
      );
    }
    if (i === 4 || i === 5) {
      return (
        <div className="pure-u-1  pure-u-md-8-24" key={i}>
          <h2>{weatherList.cities[i]}</h2>
          <div className="pure-g mt-10">
            <div className="pure-u-1-1 my-2">
              <button
                className="pure-button button-small"
                onClick={() => getWeatherAll(weatherList, country[i], "local")}
              >
                Por semana
              </button>
              <button
                className="pure-button button-small"
                onClick={() => getWeatherADay(weatherList, country[i], "local")}
              >
                Próximas 24 horas
              </button>
              <button
                className="pure-button button-small"
                onClick={() =>
                  getWeatherToDay(weatherList, country[i], "local")
                }
              >
                Hoy
              </button>
            </div>
          </div>
          <BarChart
            width={ setWidthGraph() }
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="temperatura" stackId="a" fill="#8884d8" />
            <Bar dataKey="sensacion" stackId="a" fill="#82ca9d" />
            <Bar dataKey="temp_max" fill="#ffc658" />
          </BarChart>
          <Link to={`/${country[i]}`}>
            <button className="pure-button pure-button-primary button-large my-2">
              Ver detalle
            </button>
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      {Object.keys(weatherList.weather).map((data, i) =>
        renderCharts(
          weatherList.weather[data],
          Object.keys(weatherList.weather),
          i
        )
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    weatherList: state.weatherList,
  };
};
const mapDispatchToPrps = (dispatch) => {
  return {
    getWeatherADay: (state, value, flag) => {
      dispatch(getWeatherADay(state, value, flag));
    },
    getWeatherToDay: (state, value, flag) => {
      dispatch(getWeatherToDay(state, value, flag));
    },
    getWeatherAll: (state, country, flag) => {
      dispatch(getWeatherAll(state, country, flag));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPrps)(Charts);
