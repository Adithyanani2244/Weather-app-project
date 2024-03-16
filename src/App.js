

import { MapPin, Wind } from 'react-feather';
import "./App.css"
import dateFormat from 'dateformat';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const apiKey = `94dd868dc50b0c1e16876806b84f3894`;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeatherbyCity = async () => {
    try {
      const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      if (weatherData.ok) {
        const finalResult = await weatherData.json()
        setWeather(finalResult);
      } else {
        alert("City not found. Please enter a valid city name.");
      }
    } catch (error) {
      alert("Error fetching data. Please try again later.");
    }
  }

  const Handlefunction = () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }
    getWeatherbyCity()
  }

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT")
  }

  const convertKelvin = (kelvin) => {
    return (kelvin - 273.15).toFixed(1)
  }

  return (
    <>
    
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City Name' />
        <button onClick={Handlefunction}>
          Search
        </button>
      </div>
      {
        weather && Object.keys(weather).length > 0 ?
          <div className="content">
            <div className="location d-flex">
              <MapPin />
              <h2>{weather.name} {weather.sys && <span>({weather.sys.country})</span>}</h2>
            </div>
            <p className="datetext">{renderDate()}</p>
            <div className="weatherdesc d-flex flex-c">
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="" />
              <h3>{weather.weather[0].description}</h3>
            </div>
            <div className="windstats d-flex">
              <Wind />
              <h3>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
            </div>
            <div className="tempstats d-flex flex-c">
              <h1>{convertKelvin(weather.main.temp)} <span>&deg;C</span></h1>
              <h3>Feels Like {convertKelvin(weather.main.feels_like)} <span>&deg;C</span></h3>
            </div>
          </div>
          :
          <center><h3 >No data found! ☹️</h3></center>
      }
    </div>
    </>
  );
}

export default App;
