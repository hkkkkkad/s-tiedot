// Weather Overlay v1.0
// Default location: Todd Mission, Texas

const params = new URLSearchParams(window.location.search);

const API_KEY = params.get("apikey") || "";
const CITY = params.get("city") || "Todd Mission,US";
const UNITS = (params.get("units") || "imperial").toLowerCase();
const CLOCK24 = params.get("clock") === "24";

const cityEl = document.getElementById("city");
const descEl = document.getElementById("description");
const tempFEl = document.getElementById("temp-f");
const tempCEl = document.getElementById("temp-c");
const feelsEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");
const visibilityEl = document.getElementById("visibility");
const iconEl = document.getElementById("weather-icon");
const clockEl = document.getElementById("clock");

if (!API_KEY) {
    cityEl.textContent = "Missing API Key";
    descEl.textContent = "Use ?apikey=YOUR_KEY";
}

function toC(f) {
    return Math.round((f - 32) * 5 / 9);
}

function toF(c) {
    return Math.round((c * 9 / 5) + 32);
}

function capitalize(text) {
    return text.replace(/\b\w/g, c => c.toUpperCase());
}

async function updateWeather() {

    if (!API_KEY) return;

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=${UNITS}`
        );

        const data = await response.json();

        let tempF;
        let tempC;
        let feelsF;
        let feelsC;

        if (UNITS === "metric") {

            tempC = Math.round(data.main.temp);
            tempF = toF(tempC);

            feelsC = Math.round(data.main.feels_like);
            feelsF = toF(feelsC);

        } else {

            tempF = Math.round(data.main.temp);
            tempC = toC(tempF);

            feelsF = Math.round(data.main.feels_like);
            feelsC = toC(feelsF);

        }

        cityEl.textContent = `${data.name}, ${data.sys.country}`;
        descEl.textContent = capitalize(data.weather[0].description);

        tempFEl.textContent = `${tempF}°F`;
        tempCEl.textContent = `${tempC}°C`;

        feelsEl.textContent =
            `🥵 Feels: ${feelsF}°F (${feelsC}°C)`;

        humidityEl.textContent =
            `💧 Humidity: ${data.main.humidity}%`;

        if (UNITS === "metric") {

            windEl.textContent =
                `💨 Wind: ${Math.round(data.wind.speed)} km/h`;

        } else {

            windEl.textContent =
                `💨 Wind: ${Math.round(data.wind.speed)} mph`;

        }

        pressureEl.textContent =
            `🌡 Pressure: ${data.main.pressure} hPa`;

        visibilityEl.textContent =
            `👁 Visibility: ${(data.visibility / 1000).toFixed(1)} km`;

        iconEl.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    } catch (err) {

        console.error(err);

        cityEl.textContent = "Weather Error";
        descEl.textContent = "Unable to fetch weather.";

    }

}

function updateClock() {

    const now = new Date();

    clockEl.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !CLOCK24
    });

}

updateWeather();
updateClock();

setInterval(updateWeather, 60000);
setInterval(updateClock, 1000);