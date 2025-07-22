import { API_KEY } from "../apiKey.js";

async function fetchWeatherData(location = "Singapore") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next9days?key=${API_KEY}&iconSet=icons2`,
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

function parseWeatherData(data) {
  const today = data.days[0];
  const tomorrow = data.days[1];
  const current = data.currentConditions;
  return {
    days: data.days,
    hourNow: current.datetime,
    location: data.resolvedAddress,
    tempNow: current.temp,
    conditionsNow: current.conditions,
    iconNow: current.icon,
    todayHigh: today.tempmax,
    todayLow: today.tempmin,
    todayHours: today.hours,
    tomorrowHours: tomorrow.hours,
  };
}

const data = await fetchWeatherData();
const weatherData = parseWeatherData(data);

export default weatherData;
