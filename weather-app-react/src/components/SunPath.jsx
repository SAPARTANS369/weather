import React from 'react';

const SunPath = ({ data }) => {
  const { sunrise, sunset } = data.forecast.forecastday[0].astro;

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mt-4">
      <h2 className="text-lg mb-2">SUNRISE & SUNSET</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400">Sunrise</p>
          <p className="text-2xl">{sunrise}</p>
        </div>
        <div>
          <p className="text-gray-400">Sunset</p>
          <p className="text-2xl">{sunset}</p>
        </div>
      </div>
      {/* Add a visual representation of the sun path here */}
    </div>
  );
};

export default SunPath;
