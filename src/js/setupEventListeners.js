import getDOMElements from "./dom.js";
import { fetchWeatherData, parseWeatherData } from "./weatherData/weatherData.js";
import { setWeatherData } from "./weatherData/weatherStorage.js";
import renderTodayCard from "./app/todayCard.js";
import renderHourlyForecastCard from "./app/hourlyForecastCard.js";
import renderDailyForecastCard from "./app/dailyForecastCard.js";

export default function setupEventListeners() {
  const { $form, $input } = getDOMElements();

  $form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = $input.value.trim();
    const weatherData = await fetchWeatherData(location);
    const parsedData = parseWeatherData(weatherData);
    setWeatherData(parsedData);
    renderTodayCard();
    renderHourlyForecastCard();
    renderDailyForecastCard();
  });
}
