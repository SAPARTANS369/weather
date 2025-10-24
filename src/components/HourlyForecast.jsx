import React from 'react';

const HourlyForecast = ({ data }) => {
  const hourly = data.forecast.forecastday[0].hour;

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mt-4">
      <p className="text-lg mb-2">Sunny conditions will continue all day. Wind gusts are up to 5 mph.</p>
      <div className="flex overflow-x-auto">
        {hourly.map((hour, index) => (
          <div key={index} className="text-center min-w-[60px] mr-4">
            <p>{new Date(hour.time).getHours()}:00</p>
            <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} className="w-10 h-10 mx-auto" />
            <p>{Math.round(hour.temp_f)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
