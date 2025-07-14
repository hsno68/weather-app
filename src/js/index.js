import "../css/styles.css";
import { API_KEY } from "./apiKey.js";

async function fetchWeather(location = "Los Angeles") {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("Error in fetchWeather():", error);
    throw error;
  }
}
