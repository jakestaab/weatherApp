import { WEATHER_API_KEY } from './apikey.js';

const getWeather = async () => {
    const weather = await fetch("")
    const weatherData = await weather.json();
    console.log(weather);
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