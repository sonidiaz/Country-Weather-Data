import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getWeatherListRedux, getWeatherADay, getWeatherToDay, getWeatherAll } from '../redux/action/WeatherActions';
import { useLocation } from "react-router-dom";
import Charts from '../components/Charts';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Dashboard = ({ weatherList, getWhaterList }) => {
  const ref = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (weatherList.cities.length === 0) {
      getWhaterList()
    }
  }, []);

  return (
    <div className="container">
      <div className="pure-g dot-gis" ref={ref}>
        {
          weatherList.isFetching ? (
            <article className="center-loader">
              <Loader
                type="Audio"
                color="#282c34"
                height={80}
                width={80}
              />
            </article>
          ) : (
              <Charts />
            )
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    weatherList: state.weatherList
  }
}
const mapDispatchToPrps = (dispatch) => {
  return {
    getWhaterList: () => { dispatch(getWeatherListRedux()) },
    getWeatherADay: (value, state) => { dispatch(getWeatherADay(value, state)) },
    getWeatherToDay: (value, state) => { dispatch(getWeatherToDay(value, state)) },
    getWeatherAll: (value, state) => { dispatch(getWeatherAll(value, state)) },
  }
}

export default connect(mapStateToProps, mapDispatchToPrps)(Dashboard);