import { WEATHER_API_KEY } from './apikey.js';
import { windConversion, capitalizeLocation } from './format_funcs.js';
//import { capitalizeLocation } from './format_funcs.js';

let defaultLocation;

//accepts parameter of a location; returns the API URL with that location
const weatherURL = (location) => {
    //WEATHER_API_KEY is a function that returns my API key
    let key = WEATHER_API_KEY();
    return "http://api.openweathermap.org/data/2.5/weather?q=" +
                     location + "&units=imperial&appid=" + key;
}

//assigns to defaultLocation the city data to be displayed on page
//first checks localStorage, then defaults to Lawrence, Kansas
//or alternatively uses what has just been searched for
const locationCheck = () => {
    if(localStorage.getItem("userSetLocation")) {
        defaultLocation = JSON.parse(localStorage.getItem("userSetLocation"));
    } else {
        defaultLocation = "Lawrence, Kansas";
    }
    const locationButton = document.getElementById("search");
    locationButton.addEventListener("click", (event) => {
    defaultLocation = document.getElementById("searchedLocation").value;
    getWeather(); //if search button clicked, getWeather needs to be called here
}, false);
}
locationCheck();

//sets default location in local storage when user clicks setlocation button
const setLocationButton = document.getElementById("setlocation");
setLocationButton.addEventListener("click", (event) => {
    localStorage.setItem("userSetLocation", JSON.stringify(defaultLocation));
})

//retrieves weather API data and inputs object property values into HTML
const getWeather = async () => {
    const data = await fetch(weatherURL(defaultLocation));
    const weatherData = await data.json();
    let conditions = weatherData.weather[0].main;
    let temp = weatherData.main.temp;
    let wind = weatherData.wind.speed;
    let humidity = weatherData.main.humidity;
    let visibility = (weatherData.visibility / 1000);
    let pressure = (weatherData.main.pressure / 33.86);
    let direction = weatherData.wind.deg;
    document.getElementById('conditions').innerHTML = conditions;
    document.getElementById('temp').innerHTML = temp;
    document.getElementById('wind').innerHTML = Math.round(wind);
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('visibility').innerHTML = visibility;
    document.getElementById('pressure').innerHTML = pressure.toFixed(2);
    document.getElementById('direction').innerHTML = windConversion(direction);
    document.getElementById('shownlocation').innerHTML = capitalizeLocation(defaultLocation);
}
getWeather();