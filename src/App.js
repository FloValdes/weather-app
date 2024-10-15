import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from './api/weatherApi';
import WeatherInfo from './components/WeatherInfo';

const defaultCities = ['Rio de Janeiro', 'Beijing', 'Los Angeles'];

const App = () => {
  const [cities, setCities] = useState(defaultCities);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [newCity, setNewCity] = useState('');

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['weather', selectedCity],
    queryFn: () => fetchWeather(selectedCity),
    refetchOnWindowFocus: false,
  });

  const handleAddCity = () => {
    if (newCity && !cities.includes(newCity)) {
      setCities((prevCities) => [...prevCities, newCity]);
      setSelectedCity(newCity);
      setNewCity('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="block md:flex justify-between items-center w-3/4">
        <h1 className="text-4xl font-semibold mb-8 text-gray-800 text-center">Weather App</h1>
        {/* Input to add new cities */}
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city name"
          />
          <button
            onClick={handleAddCity}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add City
          </button>
        </div>
        {/* Refresh Data Button */}
        <button
          onClick={refetch}
          className="flex items-center px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-200 transition duration-300 mb-4"
        >
          Refresh Data
        </button>
      </div>

      {/* City Tabs */}
      <div className="flex space-x-4 mb-6">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out ${
              selectedCity === city
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Weather Information */}
      <WeatherInfo city={selectedCity} data={data} isFetching={isFetching} error={error} />
    </div>
  );
};

export default App;
