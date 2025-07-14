export default function getDOMElements() {
  const elements = {};

  for (const [key, selector] of Object.entries(selectors)) {
    elements[key] = document.querySelector(selector);
  }

  return elements;
}

const selectors = {
  form: "#form",
  location: ".location",
  temperature: ".temperature",
  conditions: ".conditions",
  todayHigh: ".high",
  todayLow: ".low",
};
