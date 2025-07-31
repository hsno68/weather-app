import getDOMElements from "./dom.js";
import updateApp from "./updateApp.js";

export default function setupEventListeners() {
  const { $form, $input } = getDOMElements();

  $form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = $input.value.trim();
    updateApp(location);
    $form.reset();
  });
}
