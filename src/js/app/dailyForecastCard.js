import getDOMElements from "../dom.js";
import { getWeatherData } from "../weatherData/weatherStorage.js";
import getWeatherIcon from "../weatherData/weatherIconMap.js";
import { createLabelElement, createImageElement, formatDateLabel } from "../utility.js";

export default function renderDailyForecastCard() {
  const { $dailyForecast } = getDOMElements();
  const { days, weekHigh, weekLow } = getWeatherData();

  $dailyForecast.replaceChildren();

  const fullDailyForecasts = mapDailyForecasts(days);

  for (const dailyForecast of fullDailyForecasts) {
    const dailyForecastCard = createDailyForecastCard(dailyForecast, weekHigh, weekLow);
    $dailyForecast.appendChild(dailyForecastCard);
  }
}

function mapDailyForecasts(days) {
  return days.map(({ datetime, icon, tempmin, tempmax }, index) => {
    const dayLabel = index === 0 ? "Today" : formatDateLabel(datetime, { mode: "day" });
    return {
      day: dayLabel,
      date: formatDateLabel(datetime, { mode: "date" }),
      icon: getWeatherIcon(icon),
      iconAltText: icon,
      dayLow: Math.round(tempmin),
      dayHigh: Math.round(tempmax),
    };
  });
}

function createDailyForecastCard({ day, date, icon, iconAltText, dayLow, dayHigh }, weekMin, weekMax) {
  const forecastCard = createLabelElement({
    tag: "div",
    className: "daily-card",
  });

  const dayLabel = createLabelElement({
    tag: "h2",
    text: day,
    className: "day",
  });

  const dateLabel = createLabelElement({
    tag: "h2",
    text: date,
    className: "date",
  });

  const iconImg = createImageElement({
    src: icon,
    alt: iconAltText,
  });

  const tempLowLabel = createLabelElement({
    tag: "h2",
    text: `${dayLow}°`,
  });

  const tempHighLabel = createLabelElement({
    tag: "h2",
    text: `${dayHigh}°`,
  });

  const rangeContainer = createTempRange(dayLow, dayHigh, weekMin, weekMax);

  forecastCard.append(dayLabel, dateLabel, iconImg, tempLowLabel, rangeContainer, tempHighLabel);

  return forecastCard;
}

function createTempRange(dayLow, dayHigh, weekMin, weekMax) {
  const rangeContainer = createLabelElement({
    tag: "div",
    className: "range-container",
  });

  const rangeBar = createLabelElement({
    tag: "div",
    className: "range-bar",
  });

  const min = Number(weekMin);
  const max = Number(weekMax);
  const low = Number(dayLow);
  const high = Number(dayHigh);

  const rangeStartPercent = ((low - min) / (max - min)) * 100;
  const rangeWidthPercent = ((high - low) / (max - min)) * 100;

  rangeBar.style.left = `${rangeStartPercent}%`;
  rangeBar.style.width = `${rangeWidthPercent}%`;

  rangeContainer.appendChild(rangeBar);

  return rangeContainer;
}
