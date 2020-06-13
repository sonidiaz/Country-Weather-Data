import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area,Bar, BarChart
} from 'recharts';

const Charts = ({dataCharts, nameCity, handleFilter, handleFilterAllData}) => {
  const renderCharts = (data, country, i) => {
    if(i === 0 || i === 3){
      return (
        <div className="pure-u-12-24" key={i}>
        <h3>{nameCity[i]}</h3>
            <LineChart
              width={(window.innerWidth/2) - 2}
              height={300}
              data={data}
              margin={{
                top: 5, right: 30, left: 0, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperatura" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="sensacion" stroke="#82ca9d" />
              <Line type="monotone" dataKey="temp_max" stroke="#823454" />
            </LineChart>
            <div className="pure-g mt-10">
              <div className="pure-u-1-1">
                <button className="pure-button" onClick={() => handleFilterAllDataLocal()}>All Data</button>
                <button className="pure-button" onClick={() => handleFilterADay(i, country[i])}>Filter A day</button>
                <button className="pure-button" onClick={() => handleFilterADay(i, country[i], 'today')}>Filter To day</button>
                <button className="pure-button" onClick={handleFilterAWeek}>Filter a Week</button>
              </div>
            </div>
        </div>
      )
    }
    if(i === 1 || i === 4){
      return (
       <div className="pure-u-12-24" key={i}>
        <h3>{nameCity[i]}</h3>
            <AreaChart
                width={(window.innerWidth/2) - 2}
                height={300}
                data={data}
                margin={{
                  top: 5, right: 30, left: 0, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="temperatura" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
              <div className="pure-g mt-10">
                <div className="pure-u-1-1">
                  <button className="pure-button" onClick={() => handleFilterAllDataLocal()}>All Data</button>
                  <button className="pure-button" onClick={() => handleFilterADay(i, country[i])}>Filter A day</button>
                <button className="pure-button" onClick={() => handleFilterADay(i, country[i], 'today')}>Filter To day</button>
                  <button className="pure-button" onClick={handleFilterAWeek}>Filter a Week</button>
                </div>
              </div>
        </div>
      )
    };
    if(i === 2 || i === 5){
      return (
        <div className="pure-u-12-24" key={i}>
        <h3>{nameCity[i]}</h3>
          <BarChart
              width={(window.innerWidth/2) - 2}
              height={300}
              data={data}
              margin={{
                top: 5, right: 30, left: 0, bottom: 5,
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
            <div className="pure-g mt-10">
              <div className="pure-u-1-1">
                <button className="pure-button" onClick={handleFilterAllDataLocal}>All Data</button>
                <button className="pure-button" onClick={() => handleFilterADay(i, country[i])}>Filter A day</button>
                <button className="pure-button" onClick={() => handleFilterADay(i, country[i], 'today')}>Filter To day</button>
                <button className="pure-button" onClick={handleFilterAWeek}>Filter a Week</button>
              </div>
            </div>
        </div>
      )
    };
  }
  const handleFilterAllDataLocal = () => {
    handleFilterAllData()
  }
  const handleFilterADay = (id, country, day) => {
    handleFilter(id, country, day)
  }
  const handleFilterAWeek = () => {}
  return ( 
    <>
      {
        Object.keys(dataCharts.weather).map((data, i) => (
          renderCharts(dataCharts.weather[data], Object.keys(dataCharts.weather) ,i)
        ))
      }
    </>
    );
}
 
export default Charts;