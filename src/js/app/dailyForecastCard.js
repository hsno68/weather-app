import getDOMElements from "../dom.js";
import { getWeatherData } from "../weatherData/weatherStorage.js";
import getWeatherIcon from "../weatherData/weatherIconMap.js";

export default function renderDailyForecastCard() {
  const { $dailyForecast } = getDOMElements();
  const { days, weekHigh, weekLow } = getWeatherData();

  $dailyForecast.replaceChildren();

  const dailyForecasts = mapDailyForecasts(days);

  dailyForecasts.forEach((dailyForecast) => {
    const forecast = createDailyForecastCard(dailyForecast, weekHigh, weekLow);
    $dailyForecast.appendChild(forecast);
  });
}

function mapDailyForecasts(days) {
  const mappedDailyForecast = days.map((day, index) => {
    const dayLabel = index === 0 ? "Today" : getDayOfWeek(day.datetime);
    return {
      day: dayLabel,
      icon: getWeatherIcon(day.icon),
      iconAltText: day.icon,
      low: Math.round(day.tempmin),
      high: Math.round(day.tempmax),
    };
  });

  return mappedDailyForecast;
}

function createDailyForecastCard(forecast, weekMin, weekMax) {
  const forecastCard = document.createElement("div");
  forecastCard.classList.add("daily-card");

  const day = document.createElement("h2");
  day.textContent = forecast.day;

  const icon = document.createElement("img");
  icon.src = forecast.icon;
  icon.alt = forecast.iconAltText;

  const tempLow = document.createElement("h2");
  tempLow.textContent = `${forecast.low}°`;

  const tempHigh = document.createElement("h2");
  tempHigh.textContent = `${forecast.high}°`;

  const rangeContainer = createTempRange(forecast, weekMin, weekMax);

  forecastCard.append(day, icon, tempLow, rangeContainer, tempHigh);

  return forecastCard;
}

function createTempRange(forecast, weekMin, weekMax) {
  const rangeContainer = document.createElement("div");
  rangeContainer.classList.add("range-container");

  const rangeBar = document.createElement("div");
  rangeBar.classList.add("range-bar");

  const min = Number(weekMin);
  const max = Number(weekMax);
  const low = Number(forecast.low);
  const high = Number(forecast.high);

  const rangeStartPercent = ((low - min) / (max - min)) * 100;
  const rangeWidthPercent = ((high - low) / (max - min)) * 100;

  rangeBar.style.left = `${rangeStartPercent}%`;
  rangeBar.style.width = `${rangeWidthPercent}%`;

  rangeContainer.appendChild(rangeBar);

  return rangeContainer;
}

function getDayOfWeek(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}
