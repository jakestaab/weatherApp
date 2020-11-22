import { windConversion, capitalizeLocation } from './format_funcs.js';

let defaultLocation;
let key = "e6829fea390bfd66e1381953b9327c55"; //openweathermap.org API key
let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; // <--see what I did there?
let d = new Date();
let today = d.getDay();
let latitude;
let longitude;
let autoLocation;

function showLocation(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

navigator.geolocation.getCurrentPosition((position) => {
    getURL(position.coords.latitude, position.coords.longitude);
  });

const getURL = async (lat, lon) => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    }
    
    //uses geolocation for lat/lon, then calls API to get city name for those coords
    let APILocationURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat +
    "&lon=" + lon + "&appid=" + key;
    const APIData = await fetch(APILocationURL);
    const APIDataParsed = await APIData.json();
    autoLocation = APIDataParsed.name;
    localStorage.setItem("geoLocale", JSON.stringify(APIDataParsed.name));

    //accepts parameter of a location; returns the API URL with that location
    const weatherURL = (location) => {
        return "https://api.openweathermap.org/data/2.5/weather?q=" +
                        location + "&units=imperial&appid=" + key;
    }

    //accepts parameter of API icon code; returns API URL for that icon code
    const iconURL = (code) => {
        return "https://openweathermap.org/img/wn/" + String(code) + "@2x.png";
    }

    //accepts lat and long coords, returns API URL for daily weather at that location
    const dailyURL = (lat, lon) => {
        return "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                lat + "&lon=" + lon + "&exclude=currently,minutely,alerts" +
                "&units=imperial&appid=" + key;
    }

    //assigns to defaultLocation the city data to be displayed on page.
    //first checks localStorage for user-assigned default location;
    //then checks localStorage for geo-located location;
    //else uses "Lawrence, Kansas" as default.
    //otherwise uses what has just been searched for
    const assignLocation = () => {
        if(localStorage.getItem("userSetLocation")) {
            defaultLocation = JSON.parse(localStorage.getItem("userSetLocation"));
        } else if(autoLocation) {
            defaultLocation = autoLocation;
        } else {
            defaultLocation = "Lawrence, Kansas";
        }
        const locationButton = document.getElementById("search");
        locationButton.addEventListener("click", (event) => {
        defaultLocation = document.getElementById("searchedLocation").value;
        getWeather(); //if search button clicked, getWeather needs to be called here
    }, false);
    }
    assignLocation();

    //sets default location in local storage when user clicks setlocation button
    const setLocationButton = document.getElementById("setlocation");
    setLocationButton.addEventListener("click", (event) => {
        localStorage.setItem("userSetLocation", JSON.stringify(defaultLocation));
    })


    //fetches weather API data and inputs object property values into HTML
    const getWeather = async () => {
        //today
        const data = await fetch(weatherURL(defaultLocation));
        const weatherData = await data.json();

        //five-day
        const daily = await fetch(dailyURL(weatherData.coord.lat, weatherData.coord.lon));
        const dailyData = await daily.json();
        console.log(daily);

        //today
        let icon = iconURL(weatherData.weather[0].icon);
        let feelslike = (weatherData.main.feels_like);
        let conditions = weatherData.weather[0].main;
        let temp = weatherData.main.temp;
        let todayhigh = weatherData.main.temp_max;
        let todaylow = weatherData.main.temp_min;
        let wind = weatherData.wind.speed;
        let direction = weatherData.wind.deg;
        let humidity = weatherData.main.humidity;
        let pressure = (weatherData.main.pressure / 33.86);
        document.getElementById('icon').src = icon;
        document.getElementById('feelslike').innerHTML = Math.round(feelslike) + "°";
        document.getElementById('conditions').innerHTML = conditions;
        document.getElementById('temp').innerHTML = Math.round(temp) + "°";
        document.getElementById('todayhigh').innerHTML = Math.round(todayhigh) + "°";
        document.getElementById('todaylow').innerHTML = Math.round(todaylow) + "°";
        document.getElementById('wind').innerHTML = Math.round(wind);
        document.getElementById('direction').innerHTML = windConversion(direction);
        document.getElementById('humidity').innerHTML = humidity + "%";
        document.getElementById('pressure').innerHTML = pressure.toFixed(2);
        document.getElementById('shownlocation').innerHTML = capitalizeLocation(defaultLocation);

        //five-day
        let icon1 = iconURL(dailyData.daily[1].weather[0].icon);
        let icon2 = iconURL(dailyData.daily[2].weather[0].icon);
        let icon3 = iconURL(dailyData.daily[3].weather[0].icon);
        let icon4 = iconURL(dailyData.daily[4].weather[0].icon);
        let icon5 = iconURL(dailyData.daily[5].weather[0].icon);
        let sky1 = dailyData.daily[1].weather[0].main;
        let sky2 = dailyData.daily[2].weather[0].main;
        let sky3 = dailyData.daily[3].weather[0].main;
        let sky4 = dailyData.daily[4].weather[0].main;
        let sky5 = dailyData.daily[5].weather[0].main;
        let high1 = dailyData.daily[1].temp.max;
        let low1 = dailyData.daily[1].temp.min;
        let high2 = dailyData.daily[2].temp.max;
        let low2 = dailyData.daily[2].temp.min;
        let high3 = dailyData.daily[3].temp.max;
        let low3 = dailyData.daily[3].temp.min;
        let high4 = dailyData.daily[4].temp.max;
        let low4 = dailyData.daily[4].temp.min;
        let high5 = dailyData.daily[5].temp.max;
        let low5 = dailyData.daily[5].temp.min;
        document.getElementById('day1').innerHTML = week[today];
        document.getElementById('day2').innerHTML = week[today+1];
        document.getElementById('day3').innerHTML = week[today+2];
        document.getElementById('day4').innerHTML = week[today+3];
        document.getElementById('day5').innerHTML = week[today+4];
        document.getElementById('icon1').src = icon1;
        document.getElementById('icon2').src = icon2;
        document.getElementById('icon3').src = icon3;
        document.getElementById('icon4').src = icon4;
        document.getElementById('icon5').src = icon5;
        document.getElementById('sky1').innerHTML = sky1;
        document.getElementById('sky2').innerHTML = sky2;
        document.getElementById('sky3').innerHTML = sky3;
        document.getElementById('sky4').innerHTML = sky4;
        document.getElementById('sky5').innerHTML = sky5;
        document.getElementById('high1').innerHTML = Math.round(high1) + "°";
        document.getElementById('low1').innerHTML = Math.round(low1) + "°";
        document.getElementById('high2').innerHTML = Math.round(high2) + "°";
        document.getElementById('low2').innerHTML = Math.round(low2) + "°";
        document.getElementById('high3').innerHTML = Math.round(high3) + "°";
        document.getElementById('low3').innerHTML = Math.round(low3) + "°";
        document.getElementById('high4').innerHTML = Math.round(high4) + "°";
        document.getElementById('low4').innerHTML = Math.round(low4) + "°";
        document.getElementById('high5').innerHTML = Math.round(high5) + "°";
        document.getElementById('low5').innerHTML = Math.round(low5) + "°";
    }
    getWeather();
}

