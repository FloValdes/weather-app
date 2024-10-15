const API_KEY = '482944e26d320a80bd5e4f23b3de7d1f';

const GEO_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid=${API_KEY}`;
const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${API_KEY}&units=metric`;

// Function to get latitude and longitude of the city
const getCoordinates = async (city) => {
  const response = await fetch(GEO_API_URL.replace('{city}', city));
  const data = await response.json();
  if (data.length === 0) throw new Error('City not found');
  const { lat, lon } = data[0];
  return { lat, lon };
};

// Function to fetch weather data using latitude and longitude
export const fetchWeather = async (city) => {
  const { lat, lon } = await getCoordinates(city);
  const response = await fetch(FORECAST_API_URL.replace('{lat}', lat).replace('{lon}', lon));
  if (!response.ok) throw new Error('Failed to fetch weather data');
  return response.json();
};

