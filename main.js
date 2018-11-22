let key = "480216db1042a479cc20fbf624a3e622";

function getWeather() {
  let cityInput = document.getElementById("input").value;
  let city = cityInput.toLowerCase();
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`)
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

function convertKelvin(kelvin) {
  let temp = kelvin - 273.15;
  return Math.floor(temp);
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
      let cityInput = document.getElementById("input").value;

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

function renderImage(url) {
  let image = document.getElementById("weatherImage");
  image.src = url;
}
