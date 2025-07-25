import getDOMElements from "../dom.js";
import { getWeatherData } from "../weatherData/weatherStorage.js";
import { createLabelElement } from "../utility.js";

export default function renderTodayCard() {
  const { $todayForecast } = getDOMElements();
  const data = getWeatherData();

  $todayForecast.replaceChildren();

  const todayCard = createTodayCard(data);
  $todayForecast.appendChild(todayCard);
}

function createTodayCard({ location, tempNow, conditionsNow, todayHigh, todayLow }) {
  const todayCard = document.createElement("div");
  todayCard.classList.add("today-card");

  const locationLabel = createLabelElement({
    tag: "h1",
    text: location,
  });

  const temperatureLabel = createLabelElement({
    tag: "p",
    text: Math.round(tempNow),
  });

  const conditionsLabel = createLabelElement({
    tag: "p",
    text: conditionsNow,
  });

  const highLowContainer = createLabelElement({
    tag: "div",
    className: "high-low-container",
  });

  const todayLowLabel = createLabelElement({
    tag: "p",
    text: `L: ${Math.round(todayLow)}°`,
  });

  const todayHighLabel = createLabelElement({
    tag: "p",
    text: `H: ${Math.round(todayHigh)}°`,
  });

  highLowContainer.append(todayLowLabel, todayHighLabel);

  todayCard.append(locationLabel, temperatureLabel, conditionsLabel, highLowContainer);

  return todayCard;
}
