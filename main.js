import { WEATHER_API_KEY } from './apikey.js';

//accepts parameter of a location
//returns the API URL with that location
function weatherURL(location) {
    //WEATHER_API_KEY is a function that returns my API key
    let key = WEATHER_API_KEY();
    return "http://api.openweathermap.org/data/2.5/weather?q=" +
                     location + "&appid=" + key;
}


const getWeather = async () => {
    const weather = await fetch(weatherURL("Lawrence,Kansas"));
    const weatherData = await weather.json();
    console.log(weatherData);
}

getWeather();

window.onload = function() {
    let conditions = "Haze";
    let temp = "85";
    let wind = "12MPH";
    let humidity = "80%";
    let visibility = "10 Miles";
    document.getElementById('conditions').innerHTML = conditions;
    document.getElementById('temp').innerHTML = temp;
    document.getElementById('wind').innerHTML = wind;
    document.getElementById('humidity').innerHTML = humidity;
    document.getElementById('visibility').innerHTML = visibility;
};