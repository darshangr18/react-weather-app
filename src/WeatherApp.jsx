import React, { useState } from 'react'

const API_KEY = '855a36f9b1f41b472ab164aa389cad9c' 

export default function WeatherApp() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const getWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      console.log('API Response:', data); 
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Something went wrong!');
    }
  };
  

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather?.main && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temp: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}
