export function formatHourLabel(datetime) {
  const hour = parseInt(datetime.split(":")[0]);
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour >= 12 ? "PM" : "AM";
  return `${hour12} ${period}`;
}

export function getDayOfWeek(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function createLabelElement({ tag, text, className }) {
  const element = document.createElement(tag);

  if (text) {
    element.textContent = text;
  }

  if (className) {
    element.classList.add(className);
  }

  return element;
}

export function createImageElement({ src, alt }) {
  const element = document.createElement("img");
  element.src = src;
  element.alt = alt;
  return element;
}
