// Weather Overlay v2.0

const API_KEY = "b396157fb7ec3fc7b8b710264ea30d09";
const CITY = "Todd Mission,US";
const UNITS = "imperial";
const CLOCK24 = false;

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const iconEl = document.getElementById("weather-icon");
const clockEl = document.getElementById("clock");

function toC(f) {
    return Math.round((f - 32) * 5 / 9);
}

function toF(c) {
    return Math.round((c * 9 / 5) + 32);
}

let timezoneOffset = 0;

async function updateWeather() {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=${UNITS}`
        );

        if (!response.ok) {
            throw new Error("OpenWeather error");
        }

        const data = await response.json();

        let tempF;
        let tempC;

        if (UNITS === "metric") {
            tempC = Math.round(data.main.temp);
            tempF = toF(tempC);
        } else {
            tempF = Math.round(data.main.temp);
            tempC = toC(tempF);
        }

        timezoneOffset = data.timezone;

        cityEl.textContent = data.name;
        tempEl.textContent = `${tempF}°F (${tempC}°C)`;
        humidityEl.textContent = `💧 ${data.main.humidity}%`;

        iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        iconEl.alt = data.weather[0].description;

        updateClock();

    } catch (err) {

        console.error(err);

        cityEl.textContent = "Weather Error";
        tempEl.textContent = "--";
        humidityEl.textContent = "--";

    }

}

function updateClock() {

    const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
    const cityTime = new Date(utc + timezoneOffset * 1000);

    clockEl.textContent = cityTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !CLOCK24
    });

}

updateWeather();

setInterval(updateWeather, 60000);
setInterval(updateClock, 1000);
