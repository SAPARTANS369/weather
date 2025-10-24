import React, { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherDetails from './components/WeatherDetails';
import SunPath from './components/SunPath';
import SearchBar from './components/SearchBar';

const API_KEY = '772941c6fc5945ec80754914251610';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherByLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherData(`${latitude},${longitude}`);
          },
          (err) => {
            console.error(err);
            // Fallback to a default location if user denies location access
            fetchWeatherData('New York');
          }
        );
      } else {
        // Fallback for browsers that don't support geolocation
        fetchWeatherData('New York');
      }
    };

    fetchWeatherByLocation();
  }, []);

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=10&aqi=yes&alerts=yes`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherData) {
      updateBackground(weatherData.current.condition.text);
    }
  }, [weatherData]);

  const updateBackground = (condition) => {
    const body = document.body;
    body.className = ''; // Reset classes
    if (condition.toLowerCase().includes('sun') || condition.toLowerCase().includes('clear')) {
        body.classList.add('sunny');
    } else if (condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('overcast')) {
        body.classList.add('cloudy');
    } else if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle')) {
        body.classList.add('rainy');
    } else if (condition.toLowerCase().includes('snow') || condition.toLowerCase().includes('sleet') || condition.toLowerCase().includes('blizzard')) {
        body.classList.add('snowy');
    }
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto p-4">
        <SearchBar onSearch={fetchWeatherData} />
        {loading && <p className="text-center text-2xl">Loading...</p>}
        {error && <p className="text-center text-2xl text-red-500">{error}</p>}
        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <CurrentWeather data={weatherData} />
            </div>
            <div className="md:col-span-2">
              <HourlyForecast data={weatherData} />
              <DailyForecast data={weatherData} />
              <WeatherDetails data={weatherData} />
              <SunPath data={weatherData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
