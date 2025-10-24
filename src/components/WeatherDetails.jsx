import React from 'react';

const WeatherDetails = ({ data }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400">Air Quality</p>
          <p className="text-2xl">{data.current.air_quality.pm2_5.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-gray-400">Humidity</p>
          <p className="text-2xl">{data.current.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-400">Wind</p>
          <p className="text-2xl">{data.current.wind_mph} mph</p>
        </div>
        <div>
          <p className="text-gray-400">Visibility</p>
          <p className="text-2xl">{data.current.vis_miles} mi</p>
        </div>
        <div>
          <p className="text-gray-400">Pressure</p>
          <p className="text-2xl">{data.current.pressure_in} in</p>
        </div>
        <div>
          <p className="text-gray-400">Dew Point</p>
          <p className="text-2xl">{data.current.dewpoint_f}°</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
