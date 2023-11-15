
let defaultCity = "Tehran";
let defaultCityForecast = "Tehran";
let apiKey = "7d60c6ca1bbdda3284dd78e6babf3688";
let api = "";
let temperatureInCelsius = null;
let temperatureInFahrenheit = null;
let feelsLikeInCelsius = null;
let feelsLikeInFahrenheit = null;

let maxTemperatureInCelsius = [];
let minTemperatureInCelsius = [];

let maxTemperatureInFahrenheit = [];
let minTemperatureInFahrenheit = [];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];



function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Juni",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  let month = months[date.getMonth()];
  let dayInt = date.getDate();
  let year = date.getFullYear();
  // let hours = date.getUTCHours();
  // let minutes = date.getMinutes();
  return `${day}, ${month} ${dayInt} ${year} | ${hours}:${minutes}`;
}

function formatWeekday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = days[date.getDay()];
  return `${day}`;
}

function displayDefaultForecast(response) {
  for (var i = 0; i < 6; i++) {
    let dayElement = document.querySelector(`#forecast-day-${i}`);
    let iconElement = document.querySelector(`#forecast-icon-${i}`);
    let maxTemperatureElement = document.querySelector(`#forecast-max-temperature-${i}`);
    let minTemperatureElement = document.querySelector(`#forecast-min-temperature-${i}`);
    dayElement.innerHTML = formatWeekday(response.data.daily[i + 1].dt);
    iconElement.setAttribute("src", `./src/icons/${response.data.daily[i + 1].weather[0].icon}.png`);
    maxTemperatureElement.innerHTML = Math.round(response.data.daily[i + 1].temp.max);
    maxTemperatureInCelsius[i] = response.data.daily[i + 1].temp.max;
    minTemperatureElement.innerHTML = Math.round(response.data.daily[i + 1].temp.min);
    minTemperatureInCelsius[i] = response.data.daily[i + 1].temp.min;
  }
}

function getDefaultCityCoord(response) {
  let cityLat = response.data.city.coord.lat;
  let cityLon = response.data.city.coord.lon;
  api = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,current&units=metric&appid=${apiKey}`;
  axios.get(api).then(displayDefaultForecast);
}

function displayDefaultCondition(response) {
  let defaultDate = document.querySelector("#date");
  let defaultCity = document.querySelector("#city");
  let defaultTemperature = document.querySelector("#temperature");
  let defaultDescription = document.querySelector("#description");
  let defaultFeelsLike = document.querySelector("#feels-like-temperature");
  let defaultHumidity = document.querySelector("#humidity");
  let defaultWind = document.querySelector("#wind");
  let defaultIcon = document.querySelector("#icon");
  let defaultAltAttribut = document.querySelector("#icon");
  temperatureInCelsius = response.data.main.temp;
  feelsLikeInCelsius = response.data.main.feels_like;
  defaultDate.innerHTML = formatDate(response.data.dt);
  defaultCity.innerHTML = response.data.name;
  defaultTemperature.innerHTML = Math.round(response.data.main.temp);
  defaultDescription.innerHTML = response.data.weather[0].description;
  defaultFeelsLike.innerHTML = Math.round(response.data.main.feels_like);
  defaultHumidity.innerHTML = Math.round(response.data.main.humidity);
  defaultWind.innerHTML = Math.round(response.data.wind.speed);
  defaultIcon.setAttribute("src", `./src/icons/${response.data.weather[0].icon}.png`);
  defaultAltAttribut.setAttribute("alt", `${response.data.weather[0].description}`);
  api = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCityForecast}&units=metric&appid=${apiKey}`;
  axios.get(api).then(getDefaultCityCoord);
}

api = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${apiKey}`;
axios.get(api).then(displayDefaultCondition);
api = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&units=metric&appid=${apiKey}`;
axios.get(api).then(getDefaultCityCoord);


// Search engine
function displayForecast(response) {
  for (var i = 0; i < 6; i++) {
    let dayElement = document.querySelector(`#forecast-day-${i}`);
    let iconElement = document.querySelector(`#forecast-icon-${i}`);
    let maxTemperatureElement = document.querySelector(`#forecast-max-temperature-${i}`);
    let minTemperatureElement = document.querySelector(`#forecast-min-temperature-${i}`);
    dayElement.innerHTML = formatWeekday(response.data.daily[i + 1].dt);
    iconElement.setAttribute("src", `./src/icons/${response.data.daily[i + 1].weather[0].icon}.png`);
    maxTemperatureElement.innerHTML = Math.round(response.data.daily[i + 1].temp.max);
    maxTemperatureInCelsius[i] = response.data.daily[i + 1].temp.max;
    minTemperatureElement.innerHTML = Math.round(response.data.daily[i + 1].temp.min);
    minTemperatureInCelsius[i] = response.data.daily[i + 1].temp.min;
  }
}

function getCityCoord(response) {
  let cityLat = response.data.city.coord.lat;
  let cityLon = response.data.city.coord.lon;
  api = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,current&units=metric&appid=${apiKey}`;
  axios.get(api).then(displayForecast);

}

function displayCondition(response) {
  let dateElement = document.querySelector("#date");
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like-temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let altAttributElement = document.querySelector("#icon");

  dateElement.innerHTML = formatDate(response.data.dt);
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `./src/icons/${response.data.weather[0].icon}.png`);
  altAttributElement.setAttribute("alt", `${response.data.weather[0].description}`);
}

function searchCity(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(api).then(displayCondition);
  api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(api).then(getCityCoord);
}

function handleCitytoSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  document.querySelector("#city").innerHTML = city.value;
  searchCity(city.value);

}
let cityToSearch = document.querySelector("#search-form");
cityToSearch.addEventListener("submit", handleCitytoSearch);

// Search current place 
function showWeather(response) {
  let dateCurrentElement = document.querySelector("#date");
  let cityCurrentElement = document.querySelector("#city");
  let temperatureCurrentElement = document.querySelector("#temperature");
  let descriptionCurrentElement = document.querySelector("#description");
  let feelsLikeCurrentElement = document.querySelector("#feels-like-temperature");
  let humidityCurrentElement = document.querySelector("#humidity");
  let windCurrentElement = document.querySelector("#wind");
  let iconCurrentElement = document.querySelector("#icon");
  let altAttributCurrentElement = document.querySelector("#icon");

  dateCurrentElement.innerHTML = formatDate(response.data.dt);
  cityCurrentElement.innerHTML = response.data.name;
  temperatureCurrentElement.innerHTML = Math.round(response.data.main.temp);
  descriptionCurrentElement.innerHTML = response.data.weather[0].description;
  feelsLikeCurrentElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityCurrentElement.innerHTML = Math.round(response.data.main.humidity);
  windCurrentElement.innerHTML = Math.round(response.data.wind.speed);
  iconCurrentElement.setAttribute("src", `./src/icons/${response.data.weather[0].icon}.png`);
  altAttributCurrentElement.setAttribute("alt", `${response.data.weather[0].description}`);
}

function displayCurrentPlaceForecast(response) {
  for (var i = 0; i < 6; i++) {
    let dayCurrentElement = document.querySelector(`#forecast-day-${i}`);
    let iconCurrentElement = document.querySelector(`#forecast-icon-${i}`);
    let maxTemperatureElement = document.querySelector(`#forecast-max-temperature-${i}`);
    let minTemperatureElement = document.querySelector(`#forecast-min-temperature-${i}`);
    dayCurrentElement.innerHTML = formatWeekday(response.data.daily[i + 1].dt);
    iconCurrentElement.setAttribute("src", `./src/icons/${response.data.daily[i + 1].weather[0].icon}.png`);
    maxTemperatureElement.innerHTML = Math.round(response.data.daily[i + 1].temp.max);
    maxTemperatureInCelsius[i] = response.data.daily[i + 1].temp.max;
    minTemperatureElement.innerHTML = Math.round(response.data.daily[i + 1].temp.min);
    minTemperatureInCelsius[i] = response.data.daily[i + 1].temp.min;
  }
}
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
  api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&units=metric&appid=${apiKey}`;
  axios.get(api).then(displayCurrentPlaceForecast);
}
function handleCurrentPlace(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);

}
let currentPlace = document.querySelector("#submit-input-currentPlace");
currentPlace.addEventListener("click", handleCurrentPlace);


// Change unit form celsius to fahrenheit and other way as well
function changeForecastUnitToFahrenheit() {
  let maxTemperatureElement = "";
  let minTemperatureElement = "";
  let maxUnitElement = "";
  let minUnitElement = "";
  for (var i = 0; i < 6; i++) {

    maxTemperature = Math.round((maxTemperatureInCelsius[i] * 9) / 5 + 32);
    maxTemperatureElement = document.querySelector(`#forecast-max-temperature-${i}`);

    maxTemperatureInFahrenheit[i] = maxTemperature;
    minTemperature = Math.round((minTemperatureInCelsius[i] * 9) / 5 + 32);
    minTemperatureElement = document.querySelector(`#forecast-min-temperature-${i}`);


    minTemperatureInFahrenheit[i] = minTemperature;
    maxUnitElement = document.querySelector(`#max-unit-${i}`);
    minUnitElement = document.querySelector(`#min-unit-${i}`);

    maxTemperatureElement.innerHTML = maxTemperature;
    minTemperatureElement.innerHTML = minTemperature;
    maxUnitElement.innerHTML = "°F";
    minUnitElement.innerHTML = "°F";
  }
}

function changeForecastUnitToCelsuis() {
  let maxTemperatureElement = "";
  let minTemperatureElement = "";
  let maxUnitElement = "";
  let minUnitElement = "";
  for (var i = 0; i < 6; i++) {
    maxTemperature = Math.round((maxTemperatureInFahrenheit[i] - 32) * 5 / 9);
    maxTemperatureElement = document.querySelector(`#forecast-max-temperature-${i}`);
    maxTemperatureInCelsius[i] = maxTemperature;
    minTemperature = Math.round((minTemperatureInFahrenheit[i] - 32) * 5 / 9);
    minTemperatureElement = document.querySelector(`#forecast-min-temperature-${i}`);
    minTemperatureInCelsius[i] = minTemperature;
    maxUnitElement = document.querySelector(`#max-unit-${i}`);
    minUnitElement = document.querySelector(`#min-unit-${i}`);
    maxTemperatureElement.innerHTML = maxTemperature;
    minTemperatureElement.innerHTML = minTemperature;
    maxUnitElement.innerHTML = "°C";
    minUnitElement.innerHTML = "°C";
  }
}

function changeUnit(event) {
  event.preventDefault();
  let currentUnit = document.querySelector("#unit");
  if (currentUnit.innerHTML === "°C") {
    let fahrenheitTemperature = Math.round((temperatureInCelsius * 9) / 5 + 32);
    let fahrenheitTemperatureElement = document.querySelector("#temperature");
    let feelsLikeTemperature = Math.round((feelsLikeInCelsius * 9) / 5 + 32);
    let feelsLikeTemperatueElement = document.querySelector("#feels-like-temperature");
    let unitElement = document.querySelector("#unit");
    let unitButtonElement = document.querySelector("#unit-link");
    let feelsLikeUnitElement = document.querySelector("#feels-like-unit");
    temperatureInFahrenheit = fahrenheitTemperature;
    feelsLikeInFahrenheit = feelsLikeTemperature;
    fahrenheitTemperatureElement.innerHTML = fahrenheitTemperature;
    feelsLikeTemperatueElement.innerHTML = feelsLikeTemperature;

    unitElement.innerHTML = "°F";
    unitButtonElement.innerHTML = "°C";
    feelsLikeUnitElement.innerHTML = "°F";

    changeForecastUnitToFahrenheit();

  } else {

    let celsiusTemperature = Math.round((temperatureInFahrenheit - 32) * 5 / 9);
    let celsiusTemperatureElement = document.querySelector("#temperature");
    let feelsLikeTemperature = Math.round((feelsLikeInFahrenheit - 32) * 5 / 9);
    let feelsLikeTemperatureElement = document.querySelector("#feels-like-temperature");
    let unitElement = document.querySelector("#unit");
    let unitButtonElement = document.querySelector("#unit-link");
    let feelsLikeUnitElement = document.querySelector("#feels-like-unit");

    celsiusTemperatureElement.innerHTML = celsiusTemperature;
    feelsLikeTemperatureElement.innerHTML = feelsLikeTemperature;

    unitElement.innerHTML = "°C";
    unitButtonElement.innerHTML = "°F";
    feelsLikeUnitElement.innerHTML = "°C";

    changeForecastUnitToCelsuis();

  }
}

let unitElement = document.querySelector("#unit-button");
unitElement.addEventListener("click", changeUnit);