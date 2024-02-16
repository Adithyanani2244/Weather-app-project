
import {Search, MapPin, Wind} from 'react-feather';

import "./App.css"
import dateFormat from 'dateformat';
import { useState } from 'react';
// import BackgroundVideo from './video/video';

const apiKey =  `94dd868dc50b0c1e16876806b84f3894`;

function App() {

  const [city,setCity] = useState("");
  const [weather,setWeather] = useState({});

  const getWeatherbyCity = async () => {  //async

    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    const finalResult=await weatherData.json()
    console.log(finalResult,"weatherData")

    //  await Getweather(city);    //await getweather(city)
    setWeather(finalResult);
    setCity(""); 
  }

  const Handlefunction = () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }
    getWeatherbyCity();
  }
  

  const renderDate = () => {
   let now = new Date();
   return dateFormat(now , "dddd,mmmm dS, h:MM TT")
  }

  return (
    
    <div className="app">
      {/* <BackgroundVideo></BackgroundVideo> */}
      
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} 
        placeholder='Enter City Name' />
        {/* <button onClick={()=>getWeatherbyCity()}> */}
        
        <button onClick={Handlefunction}>
          
          <Search></Search>
        </button>
      </div>

      {
        weather && Object.keys(weather).length>0 ?
        <>
        <div className="content">
        
        <div className="location d-flex">
          <MapPin></MapPin>
          <h2>{weather.name} <span>({weather.sys.country})</span></h2>
        </div>
       
        <p className="datetext">{renderDate()}</p>
        <div className="weatherdesc d-flex flex-c">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />

          <h3>{weather.weather[0].description}</h3>
        </div>

        

        <div className="windstats d-flex">
          <Wind></Wind>
          <h3>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
        </div>

        <div className="tempstats d-flex flex-c">
          <h1>{weather.main.temp} <span>&deg;C</span></h1>
          <h3>Feels Like {weather.main.feels_like} <span>&deg;C</span></h3>
        </div>
       </div>

        </>:
        
        <center><h3 > No data !☹️ </h3></center>
      }

      

    </div>
  );
}

export default App;

