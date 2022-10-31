# Weather Dashboard

## Purpose

This is "Challenge 06" of the University of Adelaide Coding Bootcamp. The task is to create a weather dashboard that can read data from a third-party API.

## Features of the Weather Dashboard

- Search weather forecast by city name
- Search history of city names stored in a list. The list is available when you close and re-open your browser
- Current weather forecast, with weather icon
- UV index for current day is colour coded for easy identification. Low (green), Moderate (yellow) and High (red)
- 5-day weather forecast, with weather icon.

## Technologies used

- HTML 5 and CSS
- Bootstrap together with jQuery
- JavaScript DOM
- Moment.js
- OpenWeather API (free subscription)

## Deployed application URL

https://shiham-jamaldeen.github.io/Challenge06/

## Instructions

**To start using the weather dashboard:**

1. Enter a city name in the Search for a city field.
2. Select Search.
3. Current weather and 5-day weather is displayed in the adjacent section.
4. Your city entered in step 1 is automatically added to the **Search history** section. You can click on the city at any time to view the weather forecast again.<br/>
   **Note**: The **Search History** section is loaded with previous search history, after you have closed the browser window.

## Preview of the application and screenshots

#### Image I: Default application when loading
<img width="1373" alt="Screen Shot 2022-11-01 at 08 21 55" src="https://user-images.githubusercontent.com/112249220/199117842-04a4ac3b-01ea-451c-998d-916471fa4f2e.png">

#### Image II: Error message when city not found
<img width="1146" alt="Screen Shot 2022-11-01 at 08 43 41" src="https://user-images.githubusercontent.com/112249220/199120263-011f8cca-db90-47c3-be53-51ce45159900.png">

#### Image III: Loading of current weather (with UV index) and 5-day forecast
<img width="1133" alt="Screen Shot 2022-11-01 at 08 41 10" src="https://user-images.githubusercontent.com/112249220/199119956-e03ec539-f037-4816-9059-695fc237d0a2.png">

#### Image IV: Adding of several cities to list of cities / history
<img width="1147" alt="Screen Shot 2022-11-01 at 08 45 38" src="https://user-images.githubusercontent.com/112249220/199120585-8819a5bc-6cd7-40f6-a49c-72315a3c3002.png">

#### Image V: Error message when trying to add same city to the search hist list during a current session
<img width="1144" alt="Screen Shot 2022-11-01 at 08 47 09" src="https://user-images.githubusercontent.com/112249220/199120723-4e2e1164-a8cc-4ba0-acd8-871998e92396.png">

#### Image VI: Default application when loading from local storage (history saved from the previous session)

<img width="1138" alt="Screen Shot 2022-11-01 at 08 47 53" src="https://user-images.githubusercontent.com/112249220/199120810-d6be631f-aeb0-4c46-b809-0c3fa1ccfc68.png">

## Furtherwork and improvements

- Enhance search by city name. Currently the application fetches the call (from the API) when the correct city name has been entered.
- Enhance checking of items in the saved history list, when the browser is closed and re-opened.
- Enhance the UI of the search history list. Currently the heading remains static if no search items are present (from a previous session) when the browser has been closed and re-opened.
- Ability to delete search history items
