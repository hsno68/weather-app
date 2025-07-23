import getDOMElements from "../dom.js";
import weatherData from "../weatherData/weatherData.js";
import getWeatherIcon from "../weatherData/weatherIconMap.js";
import { formatHourLabel } from "../utility.js";

export default function renderHourlyForecastCard() {
  const { $hourlyForecast } = getDOMElements();
  const { tempNow, iconNow } = weatherData;

  const currentForecastCard = createForecastCard({
    time: "Now",
    icon: getWeatherIcon(iconNow),
    iconAltText: iconNow,
    temp: `${Math.round(tempNow)}°`,
  });
  $hourlyForecast.appendChild(currentForecastCard);

  const fullForecastHours = mapForecastHours(getForecastHours());
  // First card in the forecast is the "now" card, replacing the current hour forecast
  const remainingForecastHours = fullForecastHours.slice(1);
  for (const hour of remainingForecastHours) {
    const hourlyForecastCard = createHourlyForecastCard(hour);
    $hourlyForecast.appendChild(hourlyForecastCard);
  }
}

function getForecastHours() {
  const { hourNow, todayHours, tomorrowHours } = weatherData;

  const FORECAST_HOURS = 24; // Hours expected in forecast

  const currentHourLocal = parseInt(hourNow.split(":")[0], 10);

  const todayRemainingHours = todayHours.slice(currentHourLocal);
  // Remaining forecast hours out of FORECAST_HOURS by subtracting today's remaining hours
  const remainingForecastHours = FORECAST_HOURS - todayRemainingHours.length;
  // Hours needed from tomorrow to fill out forecast, +1 to include 24th hour from current hour
  const tomorrowAdditionalHours = tomorrowHours.slice(0, remainingForecastHours + 1);

  const fullForecastHours = todayRemainingHours.concat(tomorrowAdditionalHours);

  return fullForecastHours;
}

function mapForecastHours(forecastHours) {
  const mappedForecastHours = forecastHours.map((hour) => {
    return {
      time: formatHourLabel(hour.datetime),
      icon: getWeatherIcon(hour.icon),
      iconAltText: hour.icon,
      temp: `${Math.round(hour.temp)}°`,
    };
  });

  return mappedForecastHours;
}

function createHourlyForecastCard(hour) {
  const forecastCard = document.createElement("div");

  const time = document.createElement("h2");
  time.textContent = hour.time;

  const icon = document.createElement("img");
  icon.src = hour.icon;
  icon.alt = hour.iconAltText;

  const temp = document.createElement("h2");
  temp.textContent = hour.temp;

  forecastCard.append(time, icon, temp);

  return forecastCard;
}
