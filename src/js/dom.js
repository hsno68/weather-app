export default function getDOMElements() {
  const elements = {};

  for (const [key, selector] of Object.entries(selectors)) {
    elements[key] = document.querySelector(selector);
  }

  return elements;
}

const selectors = {
  $form: "#form",
  $location: ".location",
  $tempNow: ".temperature-now",
  $conditionsNow: ".conditions-now",
  $todayHigh: ".today-high",
  $todayLow: ".today-low",
  $hourlyForecast: ".hourly-forecast-card",
  $dailyForecast: ".daily-forecast-card",
};
