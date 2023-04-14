let now = new Date();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

console.log(now);

let displayTime = document.querySelector(".current-time");

displayTime.innerHTML = `${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#specialbtn");
  let city = document.querySelector("#display-searched-city");
  city.innerHTML = `${searchInput.value}`;

  let units = "imperial";

  let apiKey = "648e00576d78c0166b77419a9c26b6ea";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

  axios
    .get(`${apiUrl}q=${searchInput.value}&appid=${apiKey}&units=${units}`)
    .then(displayTemp);
}

let form = document.querySelector("#city-input");
form.addEventListener("submit", search);

function displayTemp(response) {
  console.log(response.data);

  let tempDisplay = document.querySelector("#nowtemp");
  tempDisplay.innerHTML = Math.round(response.data.main.temp);

  let windDisplay = document.querySelector("#nowwind");
  windDisplay.innerHTML = Math.round(response.data.wind.speed);

  let humidityDisplay = document.querySelector("#nowhumidity");
  humidityDisplay.innerHTML = Math.round(response.data.main.humidity);

  let geoDisplay = document.querySelector("#display-searched-city");
  geoDisplay.innerHTML = response.data.name;
}

function showPosition(position) {
  console.log(position);
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "imperial";

  let apiKey = "648e00576d78c0166b77419a9c26b6ea";

  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?`;

  axios
    .get(`${apiGeoUrl}lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`)
    .then(displayTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#location");
button.addEventListener("click", getCurrentPosition);
