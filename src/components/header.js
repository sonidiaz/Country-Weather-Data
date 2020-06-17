import React, {useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  getWeatherAll,
  getWeatherADay,
  getWeatherToDay,
} from "../redux/action/WeatherActions";
import logoApp from '../images/LogoMakr_5SrmXL.png'

const HeaderApp = ({
  weatherList,
  getWeatherADay,
  getWeatherToDay,
  getWeatherAll,
}) => {
  const [isDashBoard, setDashBoard] = useState(true)
  const { id } = useParams();
  useEffect(() => {
    if(id !== undefined){
      setDashBoard(false)
    }else{
      setDashBoard(true)
    }
  }, [id])
  return (
    <>
      <div className="pure-g my-3">
        <div className="offset-md-1-3 pure-u-1 pure-u-md-1-5">
          <img className="pure-img-responsive align-center" src={logoApp} alt=""/>
        </div>
        <div className="pure-u-1 pure-u-md-1-3 pure-u-xl-1-4">
          <div className="pure-menu pure-menu-horizontal">
            {
              isDashBoard ? (
                <div className="my-2">
                  <ul className="pure-menu-list">
                    <li className="pure-menu-item">
                      <button
                        onClick={() => {
                          getWeatherAll(weatherList);
                        }}
                        className="pure-button pure-button-primary button-small"
                      >
                        Por semana
                      </button>
                    </li>
                    <li className="pure-menu-item">
                      <button
                        onClick={() => {
                          getWeatherADay(weatherList);
                        }}
                        className="pure-button pure-button-primary button-small"
                      >
                        Próximas 24 horas
                      </button>
                    </li>
                    <li className="pure-menu-item">
                      <button
                        onClick={() => {
                          getWeatherToDay(weatherList);
                        }}
                        className="pure-button pure-button-primary button-small"
                      >
                        Hoy
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/">
                  <button className="pure-button pure-button-primary button-large my-2">
                    Volver al Dashboard
                  </button>
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    weatherList: state.weatherList,
  };
};
const mapDispachToProps = (dispatch) => {
  return {
    getWeatherAll: (weather) => {
      dispatch(getWeatherAll(weather));
    },
    getWeatherToDay: (weather) => {
      dispatch(getWeatherToDay(weather));
    },
    getWeatherADay: (weather) => {
      dispatch(getWeatherADay(weather));
    },
  };
};
export default connect(mapStateToProps, mapDispachToProps)(HeaderApp);
