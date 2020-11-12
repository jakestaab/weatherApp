import { WEATHER_API_KEY } from './apikey.js';

//accepts parameter of a location
//returns the API URL with that location
const weatherURL = (location) => {
    //WEATHER_API_KEY is a function that returns my API key
    let key = WEATHER_API_KEY();
    return "http://api.openweathermap.org/data/2.5/weather?q=" +
                     location + "&appid=" + key;
}

const weatherList = {
    list: []
}

const getWeather = async () => {
    const data = await fetch(weatherURL("Lawrence,Kansas"));
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
