import React from 'react';

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });
};

const WeatherInfo = ({ city, data, isFetching, error }) => {
  if (isFetching) {
    return <p className="text-lg font-semibold">Loading...</p>;
  }

  if (error) {
    return <p className="text-lg font-semibold text-red-600">Error: {error.message}</p>;
  }

  const dailyData = {};
  // Organizing hourly data into daily summaries
  data.list.forEach((entry) => {
    const date = new Date(entry.dt * 1000).toDateString(); // Get the date as a string
    if (!dailyData[date]) {
      dailyData[date] = {
        temp: {
          max: entry.main.temp,
          min: entry.main.temp,
        },
        weather: entry.weather[0],
        times: [entry],
      };
    } else {
      // If the date exists, update the temp and add the entry to times
      dailyData[date].times.push(entry);
      dailyData[date].temp.max = Math.max(dailyData[date].temp.max, entry.main.temp);
      dailyData[date].temp.min = Math.min(dailyData[date].temp.min, entry.main.temp);
    }
  });

  const dailyForecasts = Object.keys(dailyData).map((date) => ({
    date,
    ...dailyData[date],
  }));

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">{city}</h2>

      {/* Hourly Forecast */}
      <h3 className="text-xl font-semibold mb-4">Next Few Hours</h3>
      <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 md:gap-6 gap-0.5">
        {data.list.slice(0, 4).map((hour, index) => (
          <div key={index} className="p-2 md:p-4 bg-white rounded-lg shadow-md transition duration-300 hover:shadow-lg">
            <p className="md:text-lg font-semibold">{formatTime(hour.dt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
              className="mx-auto"
            />
            <p className="text-lg md:text-xl font-bold">{hour.main.temp}°C</p>
            <p className="text-gray-600">{hour.weather[0].description}</p>
          </div>
        ))}
      </div>

      {/* Daily Forecast */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Next 5 Days</h3>
      <div>
        {dailyForecasts.slice(0, 5).map((day, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4">
            <img
              src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
              alt={day.weather.description}
              className="w-12 h-12"
            />
            <div className="flex-1 text-center">
              <p className="text-lg font-semibold">{formatDate(new Date(day.date))}</p>
              <p className="text-gray-600">{day.weather.description}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">{Math.round(day.temp.max)}°C</p>
              <p className="text-xl font-bold">{Math.round(day.temp.min)}°C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherInfo;
