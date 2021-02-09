// consts
const WEATHER_API_KEY = 'f1b472faa4c7942772720b4baa02849e';
const STORAGE_COUNTRY = 'country';

// DOM elements
const userCountry = document.querySelector('#country'),
      temperatureOutput = document.querySelector('#temperature'),
      windOutput = document.querySelector('#wind'),
      humidityOutput = document.querySelector('#humidity'),
      temperatureIconOutput = document.querySelector('#temperature-icon');

// init weather
if (localStorage.getItem(STORAGE_COUNTRY)) {
  getWeatherByCountryName(localStorage.getItem(STORAGE_COUNTRY));
} else {
  navigator.geolocation.getCurrentPosition(success, error);
}

function success(position) {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeatherByCoord(latitude, longitude);
}

function error() {
  getWeatherByCountryName('New York City',true);
}

async function getWeatherByCoord(lat, lon) {
  let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      showUserCountry(data.name);
      localStorage.setItem(STORAGE_COUNTRY, data.name);
      showTemperatureIcon(data.weather[0].main);
      showTemperature(data.main.temp, data.wind.speed, data.main.humidity);
    });
}

function showUserCountry(country) {
  return userCountry.innerText = country;
}

function showError() {
  localStorage.removeItem(STORAGE_COUNTRY);
  userCountryInput.innerText = "Something went wrong!";
}

function showTemperature(temp, wind, hum) {
  temperatureOutput.innerText = `${temp}°`;
  windOutput.innerText = wind;
  humidityOutput.innerText = hum;
}

function showTemperatureIcon(type) {
  switch (type) {
    case 'Clear':
      temperatureIconOutput.setAttribute('src', './assets/weather-icons/sun.svg');
      break;
    case 'Rain':
      temperatureIconOutput.setAttribute('src', './assets/weather-icons/rain.svg');
      break;
    case 'Fog':
      temperatureIconOutput.setAttribute('src', './assets/weather-icons/fog.svg');
      break;
    default:
      temperatureIconOutput.setAttribute('src', './assets/weather-icons/cloud.svg');
      break;
  }
}

async function getWeatherByCountryName(name, init = false) {
  let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${WEATHER_API_KEY}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      showUserCountry(init ? `[${data.name}]` : `${data.name}`);
      showTemperature(Math.floor(data.main.temp), data.wind.speed.toFixed(1), Math.floor(data.main.humidity));
      showTemperatureIcon(data.weather[0].main);
    })
    .catch(function functionName(err) {
      showError();
    });
}
