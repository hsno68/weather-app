import renderTodayCard from "./app/todayCard.js";
import renderHourlyForecastCard from "./app/hourlyForecastCard.js";
import renderWeeklyForecastCard from "./app/weeklyForecastCard.js";
import setupEventListeners from "./setupEventListeners";

export default function init() {
  renderTodayCard();
  renderHourlyForecastCard();
  renderWeeklyForecastCard();
  setupEventListeners();
}
