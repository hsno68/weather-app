import getDOMElements from "../dom.js";
import { getWeatherData } from "../weatherData/weatherStorage.js";

export default function renderTodayCard() {
  const { $location, $tempNow, $conditionsNow, $todayHigh, $todayLow } = getDOMElements();
  const { location, tempNow, conditionsNow, todayHigh, todayLow } = getWeatherData();

  $location.textContent = location;
  $tempNow.textContent = `${Math.round(tempNow)}`;
  $conditionsNow.textContent = conditionsNow;
  $todayHigh.textContent = `H: ${Math.round(todayHigh)}°`;
  $todayLow.textContent = `L: ${Math.round(todayLow)}°`;
}
