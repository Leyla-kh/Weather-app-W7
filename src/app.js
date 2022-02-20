function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) hour = `0${hour}`;
  let minute = date.getMinutes();
  if (minute < 10) minute = `0${minute}`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
  apiUrl = `api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
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
