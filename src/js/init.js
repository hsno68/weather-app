import updateApp from "./updateApp.js";
import setupEventListeners from "./setupEventListeners.js";

export default async function init() {
  updateApp();
  setupEventListeners();
}
