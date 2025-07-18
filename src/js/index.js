import "../css/styles.css";
import { API_KEY } from "./apiKey.js";
import getDOMElements from "./dom.js";
import setupEventListeners from "./setupEventListeners.js";
import iconClearDay from "../css/images/clear-day.svg";
import iconPartlyCloudyDay from "../css/images/partly-cloudy-day.svg";
import iconClearNight from "../css/images/clear-night.svg";
import iconPartlyCloudyNight from "../css/images/partly-cloudy-night.svg";

setupEventListeners();

async function fetchWeatherData(location = "Los Angeles") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next9days?key=${API_KEY}`,
      { mode: "cors" }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchWeather():", error);
    throw error;
  }
}

const weatherData = await fetchWeatherData();
const parsedWeatherData = parseWeatherData(weatherData);

function parseWeatherData(weatherData) {
  const today = weatherData.days[0];
  const tomorrow = weatherData.days[1];
  const current = weatherData.currentConditions;
  return {
    location: weatherData.resolvedAddress,
    tempNow: current.temp,
    conditionsNow: current.conditions,
    iconNow: current.icon,
    todayHigh: today.tempmax,
    todayLow: today.tempmin,
    todayHours: today.hours,
    tomorrowHours: tomorrow.hours,
  };
}

function renderTodayCard() {
  const { $location, $tempNow, $conditionsNow, $todayHigh, $todayLow } = getDOMElements();
  const { location, tempNow, conditionsNow, todayHigh, todayLow } = parsedWeatherData;

  $location.textContent = location;
  $tempNow.textContent = `${Math.round(tempNow)}`;
  $conditionsNow.textContent = conditionsNow;
  $todayHigh.textContent += `H: ${Math.round(todayHigh)}°`;
  $todayLow.textContent += `L: ${Math.round(todayLow)}°`;
}

function getForecastHours() {
  const { todayHours, tomorrowHours } = parsedWeatherData;

  const FORECAST_HOURS = 24; // Hours expected in forecast

  const currentHour = new Date().getHours();

  const todayRemainingHours = todayHours.slice(currentHour);
  // Remaining forecast hours out of FORECAST_HOURS by subtracting today's hours
  const remainingForecastHours = FORECAST_HOURS - todayRemainingHours.length;
  // Hours needed from tomorrow to fill out forecast, +1 to include 24th hour from current hour
  const tomorrowAdditionalHours = tomorrowHours.slice(0, remainingForecastHours + 1);

  const fullForecastHours = todayRemainingHours.concat(tomorrowAdditionalHours);

  const mappedFullForecastHours = fullForecastHours.map((hour) => {
    return {
      time: formatHourLabel(hour.datetime),
      icon: getWeatherIcon(hour.icon),
      iconAltText: hour.icon,
      temp: `${Math.round(hour.temp)}°`,
    };
  });

  return mappedFullForecastHours;
}

function renderHourlyForecastCard() {
  const { $hourlyForecast } = getDOMElements();
  const { tempNow, iconNow } = parsedWeatherData;

  const currentForecastCard = createForecastCard({
    time: "Now",
    icon: getWeatherIcon(iconNow),
    iconAltText: iconNow,
    temp: `${Math.round(tempNow)}°`,
  });
  $hourlyForecast.appendChild(currentForecastCard);

  const fullForecastHours = getForecastHours();
  // First card in forecast is "now" card, so we don't need current hour forecast
  const remainingForecastHours = fullForecastHours.slice(1);
  for (const hour of remainingForecastHours) {
    const hourlyForecastCard = createForecastCard(hour);
    $hourlyForecast.appendChild(hourlyForecastCard);
  }
}

function createForecastCard(hour) {
  const forecastCard = document.createElement("div");
  forecastCard.classList.add("forecast-card");

  const time = document.createElement("h2");
  time.textContent = hour.time;

  const icon = document.createElement("img");
  icon.src = hour.icon;
  icon.alt = hour.iconAltText;

  const temp = document.createElement("h2");
  temp.textContent = hour.temp;

  forecastCard.append(time, icon, temp);

  return forecastCard;
}

function formatHourLabel(datetime) {
  const hour = parseInt(datetime.split(":")[0]);
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour >= 12 ? "PM" : "AM";
  return `${hour12} ${period}`;
}

const weatherIconMap = {
  "clear-day": iconClearDay,
  "partly-cloudy-day": iconPartlyCloudyDay,
  "clear-night": iconClearNight,
  "partly-cloudy-night": iconPartlyCloudyNight,
};

function getWeatherIcon(condition) {
  return weatherIconMap[condition];
}

renderTodayCard();
renderHourlyForecastCard();
