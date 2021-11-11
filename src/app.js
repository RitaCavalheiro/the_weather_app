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

  let formattedDate = `<div class="row"> <div class="col-6">
          <p id="date">${day}, ${dateDay} ${month}</p>
          </div>
          <div class="col-6 hour"><p> 
          Last updated at: ${hours}:${minutes}</p></div>
      </div></div>`;
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
                  <h6 class="weather-forecast-date">
                    ${formatDay(apiForcastDay.dt)}
                  </h6>
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

  backgroundChange(response);
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

// Change backgroung colors function

function backgroundChange(response) {
  let icon = response.data.weather[0].icon;
  let mainContainer = document.querySelector(".main_container");
  let containor = document.querySelector(".container");
  let search = document.querySelector(".input_search");
  //clear sky
  if (icon === "01d") {
    document.body.style.background = `radial-gradient(rgb(194, 231, 253) 0%, rgb(241, 249, 255) 97%)`;
    containor.style.background = `#C2E7FD`;
    mainContainer.style.background = `#C2E7FD`;
    search.style.background = `#C2E7FD`;
  } else if (icon === "01n") {
    document.body.style.background = `linear-gradient(to top, #09203f 0%, #537895 100%)`;
    containor.style.background = `#537895`;
    mainContainer.style.background = `#537895`;
    search.style.background = `#537895`;
    //few clouds
  } else if (icon === "02d") {
    document.body.style.background = `linear-gradient(to top, #ACCBEE 0%, #E7F0FD 100%)`;
    ontainor.style.background = `#accbee`;
    mainContainer.style.background = `#accbee`;
    search.style.background = `#accbee`;
  } else if (icon === "02n") {
    document.body.style.background = `linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)`;
    containor.style.background = `#4A4D67`;
    mainContainer.style.background = `#4A4D67`;
    search.style.background = `#4A4D67`;
    //scattered clouds
  } else if (icon === "03d") {
    document.body.style.background = `linear-gradient(to top, #ACCBEE 0%, #E7F0FD 100%)`;
    containor.style.background = `#accbee`;
    mainContainer.style.background = `#accbee`;
    search.style.background = `#accbee`;
  } else if (icon === "03n") {
    document.body.style.background = `linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)`;
    containor.style.background = `#4A4D67`;
    mainContainer.style.background = `#4A4D67`;
    search.style.background = `#4A4D67`;
    //broken clouds
  } else if (icon === "04d") {
    document.body.style.background = `linear-gradient(to top, #CFD9DF 0%, #E2EBF0 100%)`;
    containor.style.background = `#cfd9df`;
    mainContainer.style.background = `#cfd9df`;
    search.style.background = `#cfd9df`;
  } else if (icon === "04n") {
    document.body.style.background = `linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)`;
    containor.style.background = `#4A4D67`;
    mainContainer.style.background = `#4A4D67`;
    search.style.background = `#4A4D67`;
    //shower rain
  } else if (icon === "09d") {
    document.body.style.background = `linear-gradient(to top, #CFD9DF 0%, #E2EBF0 100%)`;
    containor.style.background = `#cfd9df`;
    mainContainer.style.background = `#cfd9df`;
    search.style.background = `#cfd9df`;
  } else if (icon === "09n") {
    document.body.style.background = `linear-gradient(#00D4FF, #CFED00)`;
    containor.style.background = `#4A4D67`;
    mainContainer.style.background = `#4A4D67`;
    search.style.background = `#4A4D67`;
    //rain
  } else if (icon === "10d") {
    document.body.style.background = `linear-gradient(to top, #ACCBEE 0%, #E7F0FD 100%)`;
    containor.style.background = `#accbee`;
    mainContainer.style.background = `#accbee`;
    search.style.background = `#accbee`;
  } else if (icon === "10n") {
    document.body.style.background = `linear-gradient(#00D4FF, #CFED00)`;
    containor.style.background = `#4A4D67`;
    mainContainer.style.background = `#4A4D67`;
    search.style.background = `#4A4D67`;
    //thunderstorm
  } else if (icon === "11d") {
    document.body.style.background = `linear-gradient(305deg, rgb(135, 168, 254) 0%, rgb(254, 165, 197) 97%)`;
    containor.style.background = `#afa7eb`;
    mainContainer.style.background = `#afa7eb`;
    search.style.background = `#afa7eb`;
  } else if (icon === "11n") {
    document.body.style.background = `linear-gradient(330deg, rgb(41, 125, 182) 0%, rgb(103, 55, 115) 99%)`;
    containor.style.background = `#4f538d`;
    mainContainer.style.background = `#4f538d`;
    search.style.background = `#4f538d`;
    //snow
  } else if (icon === "13d") {
    document.body.style.background = `linear-gradient(109.6deg, rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%)`;
    containor.style.background = `#CCE4F7`;
    mainContainer.style.background = `#CCE4F7`;
    search.style.background = `#CCE4F7`;
  } else if (icon === "13n") {
    document.body.style.background = `radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)`;
    containor.style.background = `#006B8D`;
    mainContainer.style.background = `#006B8D`;
    search.style.background = `#006B8D`;
    //mist
  } else if (icon === "50d") {
    document.body.style.background = `linear-gradient(to top, #C4C5C7 0%, #DCDDDF 52%, #EBEBEB 100%)`;
    containor.style.background = `#c4c5c7`;
    mainContainer.style.background = `#c4c5c7`;
    search.style.background = `#c4c5c7`;
  } else if (icon === "50n") {
    document.body.style.background = `linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)`;
    containor.style.background = `#DDDDDD`;
    mainContainer.style.background = `#DDDDDD`;
    search.style.background = `#DDDDDD`;
  }
}

// Default city search
let form = document.querySelector("#city-seach-form");
form.addEventListener("submit", handleSubmit);
search("Coimbra");
