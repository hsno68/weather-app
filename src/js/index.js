import "../css/styles.css";
import { API_KEY } from "./apiKey.js";
import getDOMElements from "./dom.js";
import setupEventListeners from "./setupEventListeners.js";

setupEventListeners();

async function fetchWeatherData(location = "Tokyo") {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next9days?key=${API_KEY}`, { mode: "cors" });

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

function parseWeatherData(data) {
  const today = data.days[0];
  const tomorrow = data.day[1];
  const currentConditions = data.currentConditions;
  console.log(today.hours);
  return {
    address: data.resolvedAddress,
    temp: currentConditions.temp,
    conditions: currentConditions.conditions,
    tempmax: today.tempmax,
    tempmin: today.tempmin,
    todayHours: today.hours,
    tomorrowHours: tomorrow.hours,
  };
}

const weatherData = await fetchWeatherData();
const data = parseWeatherData(weatherData);

function renderTodayCard() {
  const { location, temperature, conditions, todayHigh, todayLow } = getDOMElements();

  const temperatureNow = Math.round(data.temp);
  const todayTempHigh = Math.round(data.tempmax);
  const todayTempLow = Math.round(data.tempmin);

  location.textContent = data.address;
  temperature.textContent = `${temperatureNow}°`;
  conditions.textContent = data.conditions;
  todayHigh.textContent += ` ${todayTempHigh}°`;
  todayLow.textContent += ` ${todayTempLow}°`;
}

renderTodayCard();
