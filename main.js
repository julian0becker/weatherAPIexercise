let key = "480216db1042a479cc20fbf624a3e622";
let button = document.getElementById("button");

button.addEventListener("click", getWeather);

function getWeather() {
  let cityInput = document.getElementById("input").value;
  let city = cityInput.toLowerCase();
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let output = document.getElementById("output");
      let celsius = convertKelvin(data.main.temp);
      let weatherIcon = data.weather["0"].icon;
      let cityName = data.name;

      renderOutput(output, celsius, weatherIcon, cityName);
    })
    .catch(function() {
      console.log("error");
    });
}

function convertKelvin(kelvin) {
  let temp = kelvin - 273.15;
  return Math.floor(temp);
}

function renderOutput(container, celsius, weatherIcon, city) {
  container.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather in ${city}"> The temperature in ${city} is currently ${celsius}°C.`;
}

let citySearch = document.getElementById("city");
citySearch.addEventListener("click", searchImage);

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
      console.log(url());
      renderImage(url());
    });
}

function renderImage(url) {
  let container = document.getElementById("imageContainer");
  let image = document.createElement("div");
  container.appendChild(image);
  image.innerHTML = `<img class="card-img-top" src="${url}" alt="Card image cap" />`;
}
