import React, { useRef, useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { useLocation } from "react-router-dom";
import {isMobile} from '../helpers/mobileDetect.js'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import momentTz from "moment-timezone";
import moment from "moment"; 
import { Link, useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Sunset from "../images/wc-sns.png";
import Sunrise from "../images/wc-snr.png";
import HourLocal from "../images/wc-tmz.png";

import 'moment/locale/es';

const Details = ({ google, weatherList }) => {
  let history = useHistory();
  const mapRef = useRef(null);
  const [sunDate, setSun] = useState({});
  const [city, setCity] = useState({});
  const [time, setTime] = useState("");
  const [coord, setCoord] = useState({});
  const [graph, setGraph] = useState([]);
  const { id } = useParams();
  const localLocale = moment();
  const { pathname } = useLocation();
  localLocale.locale('es');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (weatherList.cities.length > 0) {
      const zona = moment.tz.zonesForCountry(
        weatherList.weather[id][0].info.country,
        true
      );
      const sunrise = momentTz.tz(
        moment.unix(weatherList.weather[id][0].info.sunrise),
        zona[0].name
      );
      const sunset = momentTz.tz(
        moment.unix(weatherList.weather[id][0].info.sunset),
        zona[0].name
      );

      setCity(weatherList.weather[id][0].info);
      setSun({
        sunrise: sunrise.format("kk:mm"),
        sunset: sunset.format("kk:mm"),
        toDay: moment.tz(new Date(), zona[0].name).format('dddd, MMMM Do YYYY')
      });
      setCoord({
        lat: weatherList.weather[id][0].info.coord.lat,
        lng: weatherList.weather[id][0].info.coord.lon,
      });
      setGraph(weatherList.weatherInMutable[id]);

      const timerHour = setInterval(() => {
        const istime = new Date();
        const thisMomento = moment.tz(istime, zona[0].name).format("kk:mm:ss");
        setTime(thisMomento);
      }, 1000);
      return () => {
        clearInterval(timerHour);
      }
    } else {
      history.push("/");
    }
  }, [id]);

  return (
    <>
      <div className="l-box-lrg pure-g">
        <div className="l-box-lrg is-center pure-u-24-24 offset-md-1-4 pure-u-md-6-24">
          <Map
            ref={mapRef}
            google={google}
            containerStyle={{
              height: "400px",
              width: "100%",
              position: "relative",
            }}
            center={coord}
            zoom={8}
          />
        </div>
        <div className="offset-md-1-7 pure-u-1 offset-md-6-24 pure-u-md-6-24">
          <h2 className="content-head is-left">{city.name}</h2>
          <div className="pure-g">
            <div className="pure-u-1-2 pure-u-md-1 text-left-block">
              <div className="pure-u-1-2 pure-u-md-1-4">
                <img src={HourLocal} alt="" className="img-responsive" />
              </div>
              <div className="pure-u-2-3">
                <h1 className="">{time}</h1>
                <h4>{sunDate.toDay}</h4>
              </div>
            </div>
            <div className="pure-u-1-2 pure-u-md-1 my-4">
              <div className="pure-g">
                <div className="pure-u-1-2 pure-u-md-1-3 ">
                    <img src={Sunrise} alt="" />
                  <span className="sub-title-detail">Sunrise</span>
                  <h2>{sunDate.sunrise}</h2>
                </div>
                <div className="pure-u-1-2 pure-u-md-1-3 ">    
                  <img src={Sunset} alt="" />
                  <span className="sub-title-detail">Sunset</span>
                  <h2>{sunDate.sunset}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <h2 className="content-head is-center">
          Pronóstico para los proximos 5 días
        </h2>

        <div className="pure-g">
          <div className="l-box-lrg offset-md-1-6 pure-u-md-2-3">
            <LineChart
              width={(isMobile.any() === null) ? (((window.innerWidth * 66) / 100)-60) : (((window.innerWidth * 86) / 100))}
              height={400}
              data={graph}
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

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: "AIzaSyC3xstYOYoWMcM50NBHwVm-cXFRkDCdlZ8", // google maps key
    libraries: ["places"],
  })(Details)
);
