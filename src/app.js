// Formating dates: main and forecasts
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

  let formattedDate = `${day}, ${dateDay} ${month}<p class="hour"> 
  Last updated at: ${hours}:${minutes}</p>`;
  return formattedDate;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let dateDay = date.getDate();
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let month = date.getMonth();

  let forcastDay = `${days[day]}, ${dateDay}/${months[month]}`;
  return forcastDay;
}

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let forcastHour = `${hours}:00`;
  return forcastHour;
}

function getForecast(coordinates) {
  let apiKey = "14a11ca12b8325f528737d829fa8d1b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  // 6 days Forecast
  let apiHourlyForecast = response.data.hourly;
  let hourlyForecast = document.querySelector("#hourly_forecast");

  let hourlyForecastHTML = `<div class="row text-center">`;
  apiHourlyForecast.forEach(function (apiHourlyForecastHr, index) {
    if (index > 0 && index < 7) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `
                <div class="col-2 hourly-forecast-temperature">
                  <p class="forecast-hour">
                    ${formatHour(apiHourlyForecastHr.dt)}
                  <p>
                  <ul>
                    <li><img src="icons/${
                      apiHourlyForecastHr.weather[0].icon
                    }.svg" alt="" id="icon_forecast_temp" width="42"/></li
                    <li class="hourly-forecast-temperature"id="hour_forecast">${Math.round(
                      apiHourlyForecastHr.temp
                    )}ºC</li>
                  </ul>
            </div>`;
    }
  });

  hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  hourlyForecast.innerHTML = hourlyForecastHTML;

  // 6 days Forecast

  let apiForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row text-center">`;
  let days = ["wed", "thu", "fri", "sat"];
  apiForecast.forEach(function (apiForcastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2 weather-forecast-temperature">
                  <h5 class="weather-forecast-date">
                    ${formatDay(apiForcastDay.dt)}
                  </h5>
                  <ul>
                    <li><img src="icons/${
                      apiForcastDay.weather[0].icon
                    }.svg" alt="" id="icon_forecast_temp" width="42"/></li
                    <li class="weather-forecast-temperature-max">${Math.round(
                      apiForcastDay.temp.max
                    )}ºC</li>
                    <li class="weather-forecast-temperature-min">${Math.round(
                      apiForcastDay.temp.min
                    )}ºC</li>
                  </ul>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "14a11ca12b8325f528737d829fa8d1b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// Current temperature display

function displayTemperature(response) {
  celciusTemp = response.data.main.temp;
  celciusMax = response.data.main.temp_max;
  celciusMin = response.data.main.temp_min;

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
  icon.setAttribute("src", `icons/main/${response.data.weather[0].icon}.svg`);
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// Search bar function

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

// Unit conversion for mainTemp

// function displayFahrenheitTemp(event) {
//   event.preventDefault();
//   celciusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let currentTemperature = document.querySelector("#currentTemperature");
//   let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
//   currentTemperature.innerHTML = Math.round(fahrenheitTemp);
//   let currentMax = document.querySelector("#max");
//   let fahrenheitMax = (celciusMax * 9) / 5 + 32;
//   currentMax.innerHTML = Math.round(fahrenheitMax);
//   let currentMin = document.querySelector("#min");
//   let fahrenheitMin = (celciusMin * 9) / 5 + 32;
//   currentMin.innerHTML = Math.round(fahrenheitMin);
// }

// function displayCelciusTemp(event) {
//   event.preventDefault();
//   celciusLink.classList.add("active");
//   fahrenheitLink.classList.remove("active");
//   let currentTemperature = document.querySelector("#currentTemperature");
//   currentTemperature.innerHTML = Math.round(celciusTemp);
// }

// Geolocation for current positon button

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

// function background(response) {
//   let weatherId = response.data.weather[0].icon;
//   let backgroundColor = document.querySelector("body");
//   let mainContainerColor = document.querySelector(".main_container");
//   let containor = document.querySelector(".container");
//   if (
//     // (weatherId = "01n") ||
//     // (weatherId = "02n") ||
//     (weatherId = "03n")
//     // (weatherId = "04n") ||
//     // (weatherId = "09n") ||
//     // (weatherId = "10n") ||
//     // (weatherId = "11n") ||
//     // (weatherId = "13n") ||
//     // (weatherId = "50n")
//   ) {
//     backgroundColor.style.background =
//       "linear-gradient(89.4deg, rgb(74, 77, 103) -4.3%, rgb(119, 125, 165) 102.1%)";
//     mainContainerColor.style.background = "#385170";
//   }
// }
// Unit Conversion
// let celciusTemp = null;

// let form = document.querySelector("#city-seach-form");
// form.addEventListener("submit", handleSubmit);

// let fahrenheitLink = document.querySelector("#degreesF");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

// let celciusLink = document.querySelector("#degreesC");
// celciusLink.addEventListener("click", displayCelciusTemp);

// Default city search
search("Coimbra");
