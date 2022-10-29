var searchByCity = document.getElementById("searchByCityContainer");
var searchByCityBtn = document.getElementById("sendCityQuery");
var displayContainer = document.getElementById("displayDataContainer");
//var cityHeading = document.getElementById("currentCity");
//let city = document.getElementById("cityName").value;

let temp = document.getElementById("id-temp");
let wind = document.getElementById("id-wind");
let humidity = document.getElementById("id-humidity");
let uvIndexDisplay = document.getElementById("id-uv-index");
let cityHeading = document.getElementById("cityTitle");
let cityLatitude = 0;
let cityLongitude = 0;
//global variables
var now = moment();

const apiKey1 = "830ba8e95b985da59eb3847cf4773328";
const apiKey2 = "47f166773e351368285402b79068ea73";

//store city name input from the user
//URL for current weather
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

searchByCityBtn.addEventListener("click", function () {
  let cityName = document.getElementById("cityName").value;

  const apiGeoURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1" +
    "&appid=" +
    apiKey1;

  fetch(apiGeoURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      if (data.length !== 0) {
        console.log(data);
        console.log(data[0].lat);
        console.log(data[0].lon);
        let cityLatitude = data[0].lat;
        let cityLongitude = data[0].lon;
        //call the weather function
        getCurrentWeather(cityLatitude, cityLongitude, cityName);
      } else {
        console.log("wrong city");
        window.alert("City not found. Try again");
      }
    });
});
function getCurrentWeather(cityLatitude, cityLongitude, cityName) {
  const apiCurrentWeatherURL =
    "https://api.openweathermap.org/data/2.5/onecall?" +
    "lat=" +
    cityLatitude +
    "&lon=" +
    cityLongitude +
    "&units=metric" +
    "&appid=" +
    apiKey2;

  fetch(apiCurrentWeatherURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })

    .then((data) => {
      if (data.length !== 0) {
        console.log(data);
        //displayCurrentDateAndTime();
        //let cityHeading = document.createElement("h2");
        //weather icon
        let weatherIconURL =
          "https://openweathermap.org/img/w/" +
          data.current.weather[0].icon +
          ".png";

        let weatherIcon =
          "<img src=" +
          weatherIconURL +
          " " +
          "alt=" +
          data.current.weather[0].description +
          ">";
        console.log(weatherIconURL + " " + weatherIcon);
        cityHeading.innerHTML =
          cityName + " " + "(" + now.format("DD/MM/YYYY") + ")" + weatherIcon;

        temp.innerHTML =
          "Temperature: " + data.current.temp + " degrees celsius";
        wind.innerHTML =
          "Wind: " + data.current.wind_speed + " meters per second";
        humidity.innerHTML = "Humidity: " + data.current.humidity + "%";
        let uvIndex = parseInt(data.current.uvi);
        if (uvIndex <= 2) {
          uvIndexDisplay.innerHTML =
            "UV Index: " + "<span class='uv-index-low'>" + uvIndex + "</span>";
        } else if (uvIndex <= 5) {
          uvIndexDisplay.innerHTML =
            "UV Index: " +
            "<span class='uv-index-moderate'>" +
            uvIndex +
            "</span>";
        } else if (uvIndex <= 10) {
          uvIndexDisplay.innerHTML =
            "UV Index: " + "<span class='uv-index-high'>" + uvIndex + "</span>";
        }
      } else {
        console.log("Cannot display display. Please try again");
      }
    });
}

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//https://www.geeksforgeeks.org/weather-app-using-vanilla-javascript/
//${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// fetch(searchRcpUrl, recipeApiOptions).then(function (response) {
//   if (response.ok) {
//     response
//       .json()
//       .then(function (data) {
//         if (data.results.length !== 0) {
//           searchResultEl.innerHTML = "";
//
//           }
//         } else {
//           $(document).ready(function () {
//             $("#no-result").modal();
//             $("#no-result").modal("open");
//           });
//         }
//       })
//       .catch(function (err) {
//         console.error(err);
//       });
//   }
// });
// }

//https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&units=imperial&appid
