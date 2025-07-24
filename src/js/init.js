import renderTodayCard from "./app/todayCard.js";
import renderHourlyForecastCard from "./app/hourlyForecastCard.js";
import renderDailyForecastCard from "./app/dailyForecastCard.js";
import setupEventListeners from "./setupEventListeners";

export default function init() {
  renderTodayCard();
  renderHourlyForecastCard();
  renderDailyForecastCard();
  setupEventListeners();
}
