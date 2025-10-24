import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        className="p-2 rounded-l-lg w-full max-w-md text-black"
      />
      <button type="submit" className="bg-blue-500 p-2 rounded-r-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
