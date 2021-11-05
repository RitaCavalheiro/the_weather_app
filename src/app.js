function formatDate(date) {
  let currentDate = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];

  let dateDay = currentDate.getDate();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentDate.getMonth()];

  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${day},<p class="day">${dateDay} ${month},</p><p> 
  ${hours}:${minutes}</p>`;
  return formattedDate;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let dateDay = date.getDate();
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forcastDay = `${days[day]}, ${dateDay}`;
  return forcastDay;
  // return days[day];
}

function displayForecast(response) {
  let apiForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row text-center">`;
  let days = ["wed", "thu", "fri", "sat"];
  apiForecast.forEach(function (apiForcastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2 weather-forecast-temperature">
                  <h4 class="weather-forecast-date">
                    ${formatDay(apiForcastDay.dt)}
                    <span><img src="http://openweathermap.org/img/wn/${
                      apiForcastDay.weather[0].icon
                    }@2x.png" alt="" id="icon_forecast_temp" width="42"/> </span>
                  </h4>
                  <ul>
                    <li class="weather-forecast-temperature-max">${Math.round(
                      apiForcastDay.temp.max
                    )}º</li>
                    <li class="weather-forecast-temperature-min">${Math.round(
                      apiForcastDay.temp.min
                    )}º</li>
                  </ul>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "14a11ca12b8325f528737d829fa8d1b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celciusTemp = response.data.main.temp;

  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = Math.round(celciusTemp);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let date = document.querySelector("#date");
  date.innerHTML = formatDate();

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let currentMax = document.querySelector("#max");
  currentMax.innerHTML = Math.round(response.data.main.temp_max);

  let currentMin = document.querySelector("#min");
  currentMin.innerHTML = Math.round(response.data.main.temp_min);

  let humidityPercentage = document.querySelector("#humidity");
  humidityPercentage.innerHTML = Math.round(response.data.main.humidity);

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let icon = document.querySelector("#icon_main_temp");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "14a11ca12b8325f528737d829fa8d1b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  search(searchInput.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemperature = document.querySelector("#currentTemperature");
  let FahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(FahrenheitTemp);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = Math.round(celciusTemp);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "14a11ca12b8325f528737d829fa8d1b3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonLocation = document.querySelector("#currentCity");
buttonLocation.addEventListener("click", getCurrentLocation);

let celciusTemp = null;

let form = document.querySelector("#city-seach-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#degreesF");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciusLink = document.querySelector("#degreesC");
celciusLink.addEventListener("click", displayCelciusTemp);

search("Coimbra");
