import getDOMElements from "../dom.js";
import weatherData from "../weatherData/weatherData.js";
import getWeatherIcon from "../weatherData/weatherIconMap.js";

export default function renderDailyForecastCard() {
  const { $dailyForecast } = getDOMElements();
  const { days } = weatherData;

  const dailyForecasts = mapDailyForecasts(days);

  dailyForecasts.forEach((dailyForecast) => {
    const forecast = createDailyForecastCard(dailyForecast);
    $dailyForecast.appendChild(forecast);
  });
}

function mapDailyForecasts(days) {
  const mappedDailyForecast = days.map((day, index) => {
    const dayLabel = index === 0 ? "Today" : getDayOfWeek(day.datetime);
    return {
      day: dayLabel,
      icon: getWeatherIcon(day.icon),
      iconAltTex: day.icon,
      low: `${Math.round(day.tempmin)}°`,
      high: `${Math.round(day.tempmax)}°`,
    };
  });

  return mappedDailyForecast;
}

function createDailyForecastCard(forecast) {
  const forecastCard = document.createElement("div");

  const day = document.createElement("h2");
  day.textContent = forecast.day;

  const icon = document.createElement("img");
  icon.src = forecast.icon;
  icon.alt = forecast.iconAltText;

  const tempLow = document.createElement("h2");
  tempLow.textContent = forecast.low;

  const rangeInput = document.createElement("input");
  rangeInput.classList.add("range-bar");
  rangeInput.type = "range";
  rangeInput.min = forecast.low;
  rangeInput.max = forecast.high;
  rangeInput.disabled = true;

  const tempHigh = document.createElement("h2");
  tempHigh.textContent = forecast.high;

  forecastCard.append(day, icon, tempLow, rangeInput, tempHigh);

  return forecastCard;
}

function getDayOfWeek(date) {
  return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
}
