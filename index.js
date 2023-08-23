const apiKey = 'YOUR_API_KEY';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.getElementById('current-weather-container');
const forecastContainer = document.getElementById('forecast-container');
const searchHistory = document.getElementById('search-history');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const cityName = cityInput.value.trim();
  if (cityName) {
    fetchWeatherData(cityName);
  }
});

function fetchWeatherData(cityName) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  // Fetch current weather data
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
    })
    .catch(error => {
      console.error('Error fetching current weather:', error);
    });

  // Fetch forecast data
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.error('Error fetching forecast:', error);
    });
}

function displayCurrentWeather(data) {
  // Clear previous content
  currentWeatherContainer.innerHTML = '';

  // Create elements to display current weather
  const cityName = data.name;
  const date = new Date(data.dt * 1000).toLocaleDateString();
  const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const weatherDiv = document.createElement('div');
  weatherDiv.classList.add('weather');
  weatherDiv.innerHTML = `
    <h3>${cityName} - ${date}</h3>
    <img src="${iconUrl}" alt="Weather icon">
    <p>Temperature: ${temperature} °C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;

  currentWeatherContainer.appendChild(weatherDiv);
}

function displayForecast(data) {
  // Clear previous content
  forecastContainer.innerHTML = '';

  // Extract forecast data for the next 5 days
  const forecasts = data.list.filter(item => item.dt_txt.includes('12:00'));

  forecasts.forEach(forecast => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    const iconUrl = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    const temperature = forecast.main.temp;
    const windSpeed = forecast.wind.speed;
    const humidity = forecast.main.humidity;

    const forecastDiv = document.createElement('div');
    forecastDiv.classList.add('forecast-item');
    forecastDiv.innerHTML = `
      <p>Date: ${date}</p>
      <img src="${iconUrl}" alt="Weather icon">
      <p>Temperature: ${temperature} °C</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
      <p>Humidity: ${humidity}%</p>
    `;

    forecastContainer.appendChild(forecastDiv);
  });
}
