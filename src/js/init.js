import renderTodayCard from "./todayCard.js";
import renderHourlyForecastCard from "./hourlyForecastCard.js";
import setupEventListeners from "./setupEventListeners";

export default function init() {
  renderTodayCard();
  renderHourlyForecastCard();
  setupEventListeners();
}
