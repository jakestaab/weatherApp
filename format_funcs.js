//capitalizes first letter of all words in a string
export function capitalizeLocation(location) {
    const words = location.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
}

//converts wind direction to cardinal direction for the geometrically challenged
export function windConversion(degrees) {
    let direction;
    if(degrees >= 338 && degrees < 361) {
        direction = "N";
    } else if (degrees >= 0 && degrees < 23) {
        direction = "N";
    } else if (degrees >= 23 && degrees < 67) {
        direction = "NNE";
    } else if (degrees >= 67 && degrees < 112) {
        direction = "E";
    } else if (degrees >= 112 && degrees < 157) {
        direction = "SSE";
    } else if (degrees >= 157 && degrees < 202) {
        direction = "S";
    } else if (degrees >= 202 && degrees < 247) {
        direction = "SSW";
    } else if (degrees >= 247 && degrees < 292) {
        direction = "W";
    } else if (degrees >= 292 && degrees < 338) {
        direction = "NNW";
    }
    return direction;
}
