import { API_KEY } from "../apiKey.js";

export async function fetchWeatherData(location = "Los Angeles") {
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

export function parseWeatherData(data) {
  const today = data.days[0];
  const tomorrow = data.days[1];
  const current = data.currentConditions;
  const weekMin = Math.min(...data.days.map((day) => day.tempmin));
  const weekMax = Math.max(...data.days.map((day) => day.tempmax));
  return {
    days: data.days,
    hourNow: current.datetime,
    location: data.resolvedAddress,
    tempNow: current.temp,
    conditionsNow: current.conditions,
    iconNow: current.icon,
    todayHigh: today.tempmax,
    todayLow: today.tempmin,
    weekHigh: weekMin,
    weekLow: weekMax,
    todayHours: today.hours,
    tomorrowHours: tomorrow.hours,
  };
}
