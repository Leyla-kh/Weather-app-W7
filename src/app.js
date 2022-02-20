function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) hour = `0${hour}`;
  let minute = date.getMinutes();
  if (minute < 10) minute = `0${minute}`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}  ${hour} : ${minute}`;
}
function displayCityInfo(response) {
  let cityTempElement = document.querySelector("#city-temperature");
  let cityNameElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  celsiusTemp = response.data.main.temp;
  let weatherIcon = document.querySelector("#weather-icon");

  cityTempElement.innerHTML = Math.round(celsiusTemp);
  cityNameElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity : ${response.data.main.humidity} %`;
  windSpeedElement.innerHTML = `Speed : ${Math.round(
    response.data.wind.speed
  )} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  forecastLink(response.data.coord);
}
function forecastLink(coord) {
  apiKey = "d61e33eb8b7d77b8e9f463b4ce970f4d";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function forecastFormatDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(timestamp * 1000).getDay()];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastFormat = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastFormat =
        forecastFormat +
        `
              <div class="col-2 forecast-col">
                <div class="forecast-day">${forecastFormatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  class="forecast-icon"
                />
                <div class="forecast-weather">
                  <span>${Math.round(
                    forecastDay.temp.max
                  )}° </span><span>${Math.round(forecastDay.temp.min)}°</span>
                </div>
              
            </div>`;
    }
  });

  forecastFormat = forecastFormat + `<div>`;
  console.log(forecastFormat);
  forecastElement.innerHTML = forecastFormat;
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let cityTempElement = document.querySelector("#city-temperature");
  cityTempElement.innerHTML = Math.round(fahrenheitTemp);
  FahrenheitLink.classList.add("active");
  CelsiusLink.classList.remove("active");
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let cityTempElement = document.querySelector("#city-temperature");
  cityTempElement.innerHTML = Math.round(celsiusTemp);
  FahrenheitLink.classList.remove("active");
  CelsiusLink.classList.add("active");
}
function search(cityName) {
  apiKey = "d61e33eb8b7d77b8e9f463b4ce970f4d";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityInfo);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-city");
  search(cityInputElement.value);
  FahrenheitLink.classList.remove("active");
  CelsiusLink.classList.add("active");
}
search("Sydney");

let FahrenheitLink = document.querySelector("#fahrenheit-link");
FahrenheitLink.addEventListener("click", displayFahrenheitTemp);
let CelsiusLink = document.querySelector("#celsius-link");
CelsiusLink.addEventListener("click", displayCelsiusTemp);

let celsiusTemp = null;
let cityName = "Sydney";

let form = document.querySelector("#input-form");
form.addEventListener("submit", handleSubmit);
