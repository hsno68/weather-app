import { fetchWeatherData, parseWeatherData } from "./weatherData/weatherData.js";
import renderTodayCard from "./app/todayCard.js";
import renderHourlyForecastCard from "./app/hourlyForecastCard.js";
import renderDailyForecastCard from "./app/dailyForecastCard.js";
import setupEventListeners from "./setupEventListeners";
import { setWeatherData } from "./weatherData/weatherStorage.js";

export default async function init() {
  const weatherData = await fetchWeatherData();
  const parsedData = parseWeatherData(weatherData);
  setWeatherData(parsedData);
  renderTodayCard();
  renderHourlyForecastCard();
  renderDailyForecastCard();
  setupEventListeners();
}
