export default function getDOMElements() {
  const elements = {};

  for (const [key, selector] of Object.entries(selectors)) {
    elements[key] = document.querySelector(selector);
  }

  return elements;
}

const selectors = {
  $form: "#form",
  $input: "input#search",
  $todayForecast: ".today-forecast-section",
  $hourlyForecast: ".hourly-forecast-section",
  $dailyForecast: ".daily-forecast-section",
};
