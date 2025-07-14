import getDOMElements from "./dom.js";

export default function setupEventListeners() {
  const { form } = getDOMElements();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submitted");
  });
}
