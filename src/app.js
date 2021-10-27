function formatDate(date) {
  let currentDate = new Date();

  let days = [
    "Sun",
    "Mon",
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

  let formattedDate = `${day}, ${dateDay} ${month}, 
  ${hours}:${minutes}`;
  return formattedDate;
}

function displayTemperature(response) {
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

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

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
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

let form = document.querySelector("#city-seach-form");
form.addEventListener("submit", handleSubmit);
