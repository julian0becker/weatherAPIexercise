let key = "480216db1042a479cc20fbf624a3e622";

function getWeather() {
  let cityInput = document.getElementById("input").value;
  let city = cityInput.toLowerCase();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let celsius = convertKelvin(data.main.temp);
      let celsiusMax = convertKelvin(data.main.temp_max);
      let celsiusMin = convertKelvin(data.main.temp_min);
      let weatherIcon = data.weather["0"].icon;
      let cityName = data.name;
      let country = data.sys.country;
      let long = data.coord.lon;
      let lat = data.coord.lat;

      getTime(long, lat);

      renderOutput(
        celsius,
        weatherIcon,
        cityName,
        celsiusMax,
        celsiusMin,
        country
      );
    })
    .catch(function() {
      console.log("error getWeather");
    });
}

function renderOutput(celsius, weatherIcon, city, max, min, country) {
  let title = document.getElementById("cardTitle");
  let cardText = document.getElementById("cardText");
  title.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather in ${city}"> ${city}, ${country}`;
  cardText.innerHTML = `
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Current</th>
      <th scope="col">Max.</th>
      <th scope="col">Min.</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${celsius}°C</td>
      <td>${max}°C</td>
      <td>${min}°C</td>
    </tr>`;
}

function searchImage() {
  fetch("https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let city = document.getElementById("input").value;
      let cityInput = capitalizeFirst(city);

      let url = function() {
        for (i = 0; i < data["_embedded"]["ua:item"].length; i++) {
          if (data["_embedded"]["ua:item"][i]["name"] == cityInput) {
            return data["_embedded"]["ua:item"][i]["_embedded"]["ua:images"][
              "photos"
            ]["0"]["image"]["mobile"];
          }
        }
      };
      renderImage(url());
    })
    .catch(function() {
      console.log("error searchImage");
    });
}

function getTime(long, lat) {
  let timeKey = "O3S4EO9NZ20B";
  fetch(
    `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeKey}&format=json&by=position&lat=${lat}&lng=${long}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      renderTime(data.formatted);
    });
}

function renderImage(url) {
  let image = document.getElementById("weatherImage");
  image.src = url;
}

function renderTime(timeString) {
  let timeBox = document.getElementById("time");
  timeBox.classList.remove("hidden");
  timeBox.innerText = timeString;
}

function capitalizeFirst(string) {
  var splitStr = string.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

function convertKelvin(kelvin) {
  let temp = kelvin - 273.15;
  return Math.floor(temp);
}
