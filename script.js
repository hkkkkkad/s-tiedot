// Weather Overlay v3.0 - WeatherAPI

const API_KEY = "b391b385224b472083e205426261407";
const CITY = "Todd Mission, Texas, US";
const CLOCK24 = false;

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const iconEl = document.getElementById("weather-icon");
const clockEl = document.getElementById("clock");

let timezone = "America/Chicago";

async function updateWeather() {

    try {

        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(CITY)}&aqi=no`
        );

        if (!response.ok) {
            throw new Error("WeatherAPI error");
        }

        const data = await response.json();

        const tempC = Math.round(data.current.temp_c);
        const tempF = Math.round(data.current.temp_f);

        timezone = data.location.tz_id;

        cityEl.textContent = data.location.name;
        tempEl.textContent = `${tempF}°F (${tempC}°C)`;
        humidityEl.textContent = `💧 ${data.current.humidity}%`;

        iconEl.src = "https:" + data.current.condition.icon;
        iconEl.alt = data.current.condition.text;

        updateClock();

    } catch (err) {

        console.error(err);

        cityEl.textContent = "Weather Error";
        tempEl.textContent = "--";
        humidityEl.textContent = "--";

    }

}


function updateClock() {

    const now = new Date();

    clockEl.textContent = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: !CLOCK24
    });

}


updateWeather();

setInterval(updateWeather, 600000);
setInterval(updateClock, 1000);
    clockEl.textContent = time;

}


updateWeather();

setInterval(updateWeather, 600000); // 10 min välein
setInterval(updateClock, 1000);     // kello joka sekunti
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
