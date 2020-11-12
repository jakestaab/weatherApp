import { WEATHER_API_KEY } from './apikey.js';

let defaultLocation = "Lawrence,Kansas";
let userLocation;

//sets userLocation to value entered into search when search button clicked
const locationButton = document.getElementById("locale");
locationButton.addEventListener("click", (event) => {
    userLocation = document.getElementById("userLocation").value;
    const getUserWeather = async () => {
        const data = await fetch(weatherURL(userLocation));
        const weatherData = await data.json();
        console.log(weatherData);
        let conditions = weatherData.weather[0].main;
        let temp = weatherData.main.temp;
        let wind = weatherData.wind.speed;
        let humidity = weatherData.main.humidity;
        let visibility = (weatherData.visibility / 1000);
        document.getElementById('conditions').innerHTML = conditions;
        document.getElementById('temp').innerHTML = temp;
        document.getElementById('wind').innerHTML = wind;
        document.getElementById('humidity').innerHTML = humidity;
        document.getElementById('visibility').innerHTML = visibility;
        document.getElementById('shownlocation').innerHTML = userLocation;
    }
    getUserWeather();
}, false);

const setLocationButton = document.getElementById("setlocation");
setLocationButton.addEventListener("click", (event) => {
    localStorage.setItem("userSetLocation", JSON.stringify(userLocation));
    locationSet = true;
})

//accepts parameter of a location
//returns the API URL with that location
const weatherURL = (location) => {
    //WEATHER_API_KEY is a function that returns my API key
    let key = WEATHER_API_KEY();
    return "http://api.openweathermap.org/data/2.5/weather?q=" +
                     location + "&units=imperial&appid=" + key;
}

//retrieves the weather API data as JSON object
//inputs object property values into HTML
const getWeather = async () => {
    const data = await fetch(weatherURL(defaultLocation));
    const weatherData = await data.json();
    console.log(weatherData);
    let conditions = weatherData.weather[0].main;
    let temp = weatherData.main.temp;
    let wind = weatherData.wind.speed;
    let humidity = weatherData.main.humidity;
    let visibility = (weatherData.visibility / 1000);
    document.getElementById('conditions').innerHTML = conditions;
    document.getElementById('temp').innerHTML = temp;
    document.getElementById('wind').innerHTML = wind;
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('visibility').innerHTML = visibility;
}
getWeather();
