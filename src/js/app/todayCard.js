import getDOMElements from "../dom.js";
import weatherData from "../weatherData/weatherData.js";

export default function renderTodayCard() {
  const { $location, $tempNow, $conditionsNow, $todayHigh, $todayLow } = getDOMElements();
  const { location, tempNow, conditionsNow, todayHigh, todayLow } = weatherData;

  $location.textContent = location;
  $tempNow.textContent = `${Math.round(tempNow)}`;
  $conditionsNow.textContent = conditionsNow;
  $todayHigh.textContent += `H: ${Math.round(todayHigh)}°`;
  $todayLow.textContent += `L: ${Math.round(todayLow)}°`;
}
