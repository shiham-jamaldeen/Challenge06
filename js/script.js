//global html elements
var searchByCity = document.getElementById("searchByCityContainer");
var searchByCityBtn = document.getElementById("sendCityQuery");
var displayContainer = document.getElementById("displayDataContainer");
var searchHistList = document.getElementById("search-history-container");
//var searchHistButtonContainer = document.getElementById("search-hist-button-container");

let temp = document.getElementById("id-temp");
let wind = document.getElementById("id-wind");
let humidity = document.getElementById("id-humidity");
let uvIndexDisplay = document.getElementById("id-uv-index");
let cityHeading = document.getElementById("cityTitle");

//global variables

let cityLatitude = 0;
let cityLongitude = 0;
//current date and time using moment library
let now = moment();

//array to store city list
let cityNameList = [];

//API Keys
const apiKey1 = "830ba8e95b985da59eb3847cf4773328";
const apiKey2 = "47f166773e351368285402b79068ea73";

function searchForCityTextbox(event) {
  //store city name input from the user, via the text box
  let cityName = document.getElementById("cityName").value;

  const apiGeoURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
        //get the Latitude and Longitude of the city from api
        let cityLatitude = data[0].lat;
        let cityLongitude = data[0].lon;
        //call the weather function, to display current weather details
        getCurrentWeather(cityLatitude, cityLongitude, cityName);
        //call function to store city name in local strorage
        storeCityList(cityName);
      } else {
        //print error message if city not found
        window.alert("City not found. Try again");
      }
    });
}
function getCurrentWeather(cityLatitude, cityLongitude, cityName) {
  //assign css class to current weather container
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
        //current weather icon
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
        //display error message if data cannot be retrievd from the weather api

        window.alert("Unable to fetch data from server. Please try again");
      }
    });
}

function displayFiveDayWeather(data) {
  //assign main five-day HTML container
  let cardDeckContainer = document.getElementById("id-card-deck");

  //clear the contents of the five-day forecast if previously printed with values
  cardDeckContainer.innerHTML = "";

  let fiveDayForecastHeading = document.getElementById(
    "displayFiveDayForecastContainer"
  );

  fiveDayForecastHeading.innerHTML =
    "<h3 class='five-day-header'>" + "5-day forecast " + "</h3>";

  //print 5-day forecast data items on the html page
  for (i = 1; i <= 5; i++) {
    //create div element
    let displayCard = document.createElement("div");
    displayCard.setAttribute("id", i);
    displayCard.setAttribute("class", "card");
    cardDeckContainer.appendChild(displayCard);

    //create five-day weather img element
    let fiveDayIconURL =
      "https://openweathermap.org/img/wn/" +
      data.daily[i].weather[0].icon +
      "@2x.png";
    let weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", fiveDayIconURL);
    displayCard.appendChild(weatherIcon);
    //create data elements
    let forecastDate = document.createElement("p");
    //get the five-day "date" and convert it to moment.js format
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
  //check if city is in search history list
  let existingCityInList = cityNameList.includes(cityName);

  if (existingCityInList === true) {
    window.alert("City exist in the search history. Please try again");
  } else {
    //push cityname to array
    cityNameList.push(cityName);

    //also store the city name array in local storage
    localStorage.setItem("city", JSON.stringify(cityNameList));

    //call function to create a button, for the city name. Add this to the history list
    buildHistoryButtons(cityName);
  }
}
function buildHistoryButtons(cityName) {
  //create button element
  let searchHistCity = document.createElement("button");
  searchHistCity.innerHTML = cityName;
  searchHistCity.setAttribute("class", "btn btn-info history-button");
  //assign unique name to button, which is needed if user clicks again
  searchHistCity.setAttribute("id", cityName);
  searchHistList.appendChild(searchHistCity);

  //get value of key pressed and repeat the api call to fetch latitude, longitude for city, when the button is pressed
  searchHistCity.addEventListener("click", (event) => {
    const apiGeoHistURL =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
          //If the "stored" city is incorrect, display error message
          window.alert("City not found. Try again");
        }
      });
  });
}

function initialise() {
  //check if local storage has any values stored
  if (JSON.parse(localStorage.getItem("city")) === null) {
    //if no then call the main function to lookup city latitude and longitude
    searchByCityBtn.addEventListener("click", searchForCityTextbox);
  } else {
    //if not read items from local storage and create buttons
    let storedCityList = [];
    storedCityList = JSON.parse(localStorage.getItem("city"));

    for (let i = 0; i < storedCityList.length; i++) {
      buildHistoryButtons(storedCityList[i]);
    }
    //call function the main function to lookup city latitude and longitude
    searchByCityBtn.addEventListener("click", searchForCityTextbox);
  }
}

//main
initialise();
