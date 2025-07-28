import getDOMElements from "../dom.js";
import { getWeatherData } from "../weatherData/weatherStorage.js";
import getWeatherIcon from "../weatherData/weatherIconMap.js";
import { formatHourLabel, createLabelElement, createImageElement } from "../utility.js";

export default function renderHourlyForecastCard() {
  const { $hourlyForecast } = getDOMElements();

  $hourlyForecast.replaceChildren();

  const fullForecastHours = mapForecastHours(getForecastHours());

  for (const hour of fullForecastHours) {
    const hourlyCard = createHourlyForecastCard(hour);
    $hourlyForecast.appendChild(hourlyCard);
  }
}

function getForecastHours() {
  const { epochNow, todayHours, tomorrowHours } = getWeatherData();

  const FORECAST_HOURS = 24; // Hours expected in forecast

  const epoch = epochNow * 1000; // Convert from seconds to milliseconds
  const currentHourLocal = new Date(epoch).getHours();

  const todayRemainingHours = todayHours.slice(currentHourLocal);

  // Get remaining forecast hours out of FORECAST_HOURS by subtracting today's remaining hours
  // Use todayRemainingHours.length because that contains all of today's remaining hours
  const remainingForecastHours = FORECAST_HOURS - todayRemainingHours.length;

  // Hours needed from tomorrow to fill out forecast, +1 to include 24th hour from current hour
  const tomorrowAdditionalHours = tomorrowHours.slice(0, remainingForecastHours + 1);

  return todayRemainingHours.concat(tomorrowAdditionalHours);
}

function mapForecastHours(forecastHours) {
  const { tempNow, iconNow } = getWeatherData();

  return forecastHours.map(({ datetime, icon, temp }, index) => {
    // First card in 24-hour forecast is not current hour
    // If using current hour, it would be the average/projected conditions of the hour instead of current
    // Create custom "Now" card to replace first hour because the first card utilizes real-time current conditions in API
    const isNow = index === 0;
    const timeLabel = isNow ? "Now" : formatHourLabel(datetime);
    const iconLabel = isNow ? iconNow : icon;
    const tempLabel = isNow ? tempNow : temp;
    return {
      time: timeLabel,
      icon: getWeatherIcon(iconLabel),
      iconAltText: iconLabel,
      temp: Math.round(tempLabel),
    };
  });
}

function createHourlyForecastCard({ time, icon, iconAltText, temp }) {
  const forecastCard = createLabelElement({
    tag: "div",
    className: "today-card",
  });

  const timeLabel = createLabelElement({
    tag: "h2",
    text: time,
  });

  const iconImg = createImageElement({
    src: icon,
    alt: iconAltText,
  });

  const temperatureLabel = createLabelElement({
    tag: "h2",
    text: `${temp}°`,
  });

  forecastCard.append(timeLabel, iconImg, temperatureLabel);

  return forecastCard;
}
