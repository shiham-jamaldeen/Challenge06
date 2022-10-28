var searchByCity = document.getElementById("searchByCityContainer");
var searchByCityBtn = document.getElementById("sendCityQuery");
let city = document.getElementById("cityName");
//global variables

//const city = "Adelaide";
const apiKey = "830ba8e95b985da59eb3847cf4773328";
const apiURL =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  city +
  "&limit=1" +
  "&appid=" +
  apiKey;
//store city name input from the user
//URL for current weather
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

https: searchByCityBtn.addEventListener("click", function () {
  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      if (data.length !== 0) {
        console.log(data);
      } else {
        console.log("wrong city");
      }
    });
});
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
