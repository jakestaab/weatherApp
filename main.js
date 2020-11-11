import { WEATHER_API_KEY } from './apikey.js';

const getWeather = async () => {
    const weather = await fetch("")
    const weatherData = await weather.json();
    console.log(weather);
}

getWeather();