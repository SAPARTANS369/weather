import React from 'react';

const DailyForecast = ({ data }) => {
  const daily = data.forecast.forecastday;

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mt-4">
      <h2 className="text-lg mb-2">10-DAY FORECAST</h2>
      {daily.map((day, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <p className="w-1/4">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
          <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} className="w-8 h-8" />
          <p>{Math.round(day.day.mintemp_f)}°</p>
          <div className="w-1/3 h-2 bg-gray-600 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full"
              style={{ width: `${((day.day.maxtemp_f - day.day.mintemp_f) / 20) * 100}%` }}
            ></div>
          </div>
          <p>{Math.round(day.day.maxtemp_f)}°</p>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
