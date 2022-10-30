var searchByCity = document.getElementById("searchByCityContainer");
var searchByCityBtn = document.getElementById("sendCityQuery");
var displayContainer = document.getElementById("displayDataContainer");
var searchHistList = document.getElementById("search-history-container");

let temp = document.getElementById("id-temp");
let wind = document.getElementById("id-wind");
let humidity = document.getElementById("id-humidity");
let uvIndexDisplay = document.getElementById("id-uv-index");
let cityHeading = document.getElementById("cityTitle");

//global variables

let cityLatitude = 0;
let cityLongitude = 0;
let now = moment();

//API Keys
const apiKey1 = "830ba8e95b985da59eb3847cf4773328";
const apiKey2 = "47f166773e351368285402b79068ea73";

//array to store city list
let cityNameList = [];

//store city name input from the user
//URL for current weather
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
function searchForCityTextbox(event) {
  //clear();

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
        //get the Latitude and Longitude of the city from api
        let cityLatitude = data[0].lat;
        let cityLongitude = data[0].lon;
        //call the weather function, to display current weather details
        getCurrentWeather(cityLatitude, cityLongitude, cityName);

        storeCityList(cityName);
      } else {
        console.log("wrong city");
        window.alert("City not found. Try again");
      }
    });
}
function getCurrentWeather(cityLatitude, cityLongitude, cityName) {
  displayContainer.setAttribute("class", "card");
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
        //weather icon
        let weatherIconURL =
          "https://openweathermap.org/img/wn/" +
          data.current.weather[0].icon +
          "@2x.png";
        let weatherIcon = "<img src=" + weatherIconURL + ">";

        //print current weather elements to webpage
        cityHeading.setAttribute("class", "five-day-header");

        cityHeading.innerHTML =
          cityName + " " + "(" + now.format("DD/MM/YYYY") + ")" + weatherIcon;

        temp.innerHTML =
          "Temperature: " + data.current.temp + " degrees celsius";

        wind.innerHTML =
          "Wind: " + data.current.wind_speed + " meters per second";

        humidity.innerHTML = "Humidity: " + data.current.humidity + "%";

        //print uvIndex and display colour coding Green, Yellow and Red based on the value
        let uvIndex = parseInt(data.current.uvi);
        if (uvIndex <= 2) {
          uvIndexDisplay.innerHTML =
            "UV Index: " +
            "<span class='uv-index-low'>" +
            uvIndex +
            "</span>" +
            "  " +
            "<span class='uv-index-low'>Low</span>" +
            "<span class='uv-index-moderate'>Moderate</span>" +
            "<span class='uv-index-high'>High</span>" +
            "</p>";
        } else if (uvIndex <= 5) {
          uvIndexDisplay.innerHTML =
            "UV Index: " +
            "<span class='uv-index-moderate'>" +
            uvIndex +
            "</span>" +
            "  " +
            "<span class='uv-index-low'>Low</span>" +
            "<span class='uv-index-moderate'>Moderate</span>" +
            "<span class='uv-index-high'>High</span>" +
            "</p>";
        } else if (uvIndex <= 10) {
          uvIndexDisplay.innerHTML =
            "UV Index: " +
            "<span class='uv-index-high'>" +
            uvIndex +
            "</span>" +
            "   " +
            "<span class='uv-index-low'>Low</span>" +
            "<span class='uv-index-moderate'>Moderate</span>" +
            "<span class='uv-index-high'>High</span>" +
            "</p>";
        }

        //call the five day weather function, for the same city
        displayFiveDayWeather(data);
      } else {
        console.log("Cannot display display. Please try again");
      }
    });
}

function displayFiveDayWeather(data) {
  let cardDeckContainer = document.getElementById("id-card-deck");
  //clear the contents of the five-day forecast if previopusly printed
  cardDeckContainer.innerHTML = "";
  let fiveDayForecastHeading = document.getElementById(
    "displayFiveDayForecastContainer"
  );

  fiveDayForecastHeading.innerHTML =
    "<h3 class='five-day-header'>" + "5-day forecast " + "</h3>";
  //let cardDeckContainer = document.getElementById("id-card-deck");

  for (i = 1; i <= 5; i++) {
    //create div element
    let displayCard = document.createElement("div");
    displayCard.setAttribute("id", i);
    displayCard.setAttribute("class", "card");
    cardDeckContainer.appendChild(displayCard);
    //create img element
    let fiveDayIconURL =
      "https://openweathermap.org/img/wn/" +
      data.daily[i].weather[0].icon +
      "@2x.png";
    let weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", fiveDayIconURL);
    displayCard.appendChild(weatherIcon);
    //create data elements
    let forecastDate = document.createElement("p");
    //get the date and convert it to moment.js format
    let dateString = moment.unix(data.daily[i].dt).format("DD/MM/YYYY");
    //print date
    forecastDate.innerHTML = dateString;
    forecastDate.setAttribute("class", "card-deck-body");
    displayCard.appendChild(forecastDate);
    //print temp
    let fiveDayTemp = document.createElement("p");
    fiveDayTemp.setAttribute("class", "card-deck-body");
    fiveDayTemp.innerHTML = "Temp: " + data.daily[i].temp.day;
    displayCard.appendChild(fiveDayTemp);
    //print wind speed
    let fiveDayWind = document.createElement("p");
    fiveDayWind.setAttribute("class", "card-deck-body");
    fiveDayWind.innerHTML = "Wind: " + data.daily[i].wind_speed;
    displayCard.appendChild(fiveDayWind);
    //print humidity
    let fiveDayHumidity = document.createElement("p");
    fiveDayHumidity.setAttribute("class", "card-deck-body");
    fiveDayHumidity.innerHTML = "Humidity: " + data.daily[i].humidity;
    displayCard.appendChild(fiveDayHumidity);
  }
}
function storeCityList(cityName) {
  //heading for search hist

  //push cityname to array
  cityNameList.push(cityName);
  //also store city in local storage, when re-opening in browser

  localStorage.setItem("city", JSON.stringify(cityNameList));
  buildHistoryButtons(cityName);
}
function buildHistoryButtons(cityName) {
  let searchHistCity = document.createElement("button");
  searchHistCity.innerHTML = cityName;
  searchHistCity.setAttribute("class", "btn btn-info history-button");
  searchHistCity.setAttribute("id", cityName);
  searchHistList.appendChild(searchHistCity);
  //get value of key pressed and repeat the api call to fetch lat, long for city
  searchHistCity.addEventListener("click", (event) => {
    //console.log(event.target.innerHTML);
    const apiGeoHistURL =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      event.target.innerHTML +
      "&limit=1" +
      "&appid=" +
      apiKey1;

    fetch(apiGeoHistURL)
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
          //get the Latitude and Longitude of the city from api
          let cityLatitude = data[0].lat;
          let cityLongitude = data[0].lon;
          //call the weather function, to display current weather details
          getCurrentWeather(
            cityLatitude,
            cityLongitude,
            event.target.innerHTML
          );
        } else {
          console.log("wrong city");
          window.alert("City not found. Try again");
        }
      });
  });
}

function initialise() {
  if (JSON.parse(localStorage.getItem("city")) === null) {
    searchByCityBtn.addEventListener("click", searchForCityTextbox);
  } else {
    let storedCityList = [];
    storedCityList.push(JSON.parse(localStorage.getItem("city")));

    for (i = 0; i < storeCityList.length; i++) {
      console.log(storeCityList.length);
      console.log(storedCityList[i]);
      buildHistoryButtons(storedCityList[i]);
    }
  }
}

//main
initialise();
searchByCityBtn.addEventListener("click", searchForCityTextbox);

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//https://www.geeksforgeeks.org/weather-app-using-vanilla-javascript/
//${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
