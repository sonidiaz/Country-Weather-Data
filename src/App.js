import React, {useState, useEffect, useRef} from "react";
import cityWeatherService from './service/cityService';
import moment from 'moment';
import Charts from './components/Charts';
import Loader from 'react-loader-spinner'
import {Provider} from 'react-redux';
import store from './redux/store';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./App.css";
import "./style.scss";
import "purecss";

function App() {
  const ref = useRef(null);
  const [indexList, setIndexList] = useState(null)
  const [dataCharts, setDataCharts] = useState({weather:{}});
  const [nameCity, setNameCity] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    (indexList === null) && getWeatherList();
  }, [indexList]);

  const handleFilterForADay = (id, country, toDay='') => {
    let endData = '';
    const dataAday = dataCharts.weather[country].filter( day => {
      const aDate = moment.unix(day.dt).format();
      toDay === '' 
        ? endData = moment().add(1, 'day').format() 
        : endData = moment().endOf("day").format();
      if(aDate < endData){
        return day
      }
      return false
    })
    setDataCharts({
      weather: {
        ...dataCharts.weather,
        [country]: dataAday,
      },
    });
    setIndexList(id)
  }
 
  const getWeatherList = () => {
    const AllCountrysMetrics = {}
    const namesCity = [];
    const getValueForMetrics = async () => {
      const allCitys = await Promise.all([
          await cityWeatherService.get('Madrid'), 
          await cityWeatherService.get('Punta Arenas'),
          await cityWeatherService.get('Londres'),
          await cityWeatherService.get('Moscu'),
          await cityWeatherService.get('Dubai'),
          await cityWeatherService.get('Tokio')
        ])

      for (let index = 0; index < allCitys.length; index++) {
        namesCity.push(allCitys[index].data.city.name);

        // Get data for display
        const allMetrics = allCitys[index].data.list.map((el) => {
            return {
              dt: el.dt,
              name: el.dt_txt,
              sensacion: el.main.feels_like,
              temperatura: el.main.temp,
              temp_max: el.main.temp_max,
              temp_min:  el.main.temp_min
            }
        })
        AllCountrysMetrics[allCitys[index].data.city.name] = allMetrics
      }
      setNameCity(namesCity);
      setDataCharts({
        weather: AllCountrysMetrics
      });
      setLoading(true);
    }
    getValueForMetrics()
  }
  
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <div className="pure-menu pure-menu-horizontal">
            Country Weather Data
          </div>
        </header>
        <div className="container">
          <div className="pure-g dot-gis" ref={ref}>
            {
              !loading ? (
                <article className="center-loader">
                  <Loader
                      type="Audio"
                      color="#282c34"
                      height={80}
                      width={80}
                    />
                </article>
              ) : (
                <Charts
                  handleFilterAllData = {() => setIndexList(null)}
                  handleFilter={handleFilterForADay}
                  dataCharts={dataCharts}
                  nameCity={nameCity}
                />
              ) 
            }
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
