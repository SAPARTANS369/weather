import React from 'react';

const CurrentWeather = ({ data }) => {
  return (
    <div className="text-white text-center p-6">
      <p className="text-xl">MY LOCATION</p>
      <h1 className="text-6xl font-bold">{data.location.name}</h1>
      <p className="text-8xl font-thin">{Math.round(data.current.temp_f)}°</p>
      <p className="text-2xl">{data.current.condition.text}</p>
      <p className="text-xl">H:{Math.round(data.forecast.forecastday[0].day.maxtemp_f)}° L:{Math.round(data.forecast.forecastday[0].day.mintemp_f)}°</p>
    </div>
  );
};

export default CurrentWeather;
