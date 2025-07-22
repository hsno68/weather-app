import iconSnow from "../../css/images/snow.svg";
import iconThunderRain from "../../css/images/thunder-rain.svg";
import iconRain from "../../css/images/rain.svg";
import iconShowersDay from "../../css/images/showers-day.svg";
import iconShowersNight from "../../css/images/showers-night.svg";
import iconFog from "../../css/images/fog.svg";
import iconWind from "../../css/images/wind.svg";
import iconCloudy from "../../css/images/cloudy.svg";
import iconPartlyCloudyDay from "../../css/images/partly-cloudy-day.svg";
import iconPartlyCloudyNight from "../../css/images/partly-cloudy-night.svg";
import iconClearDay from "../../css/images/clear-day.svg";
import iconClearNight from "../../css/images/clear-night.svg";

const weatherIconMap = {
  "snow-showers-day": iconSnow,
  "snow-showers-night": iconSnow,
  "thunder-rain": iconThunderRain,
  "thunder-showers-day": iconThunderRain,
  "thunder-showers-night": iconThunderRain,
  "showers-day": iconShowersDay,
  "showers-night": iconShowersNight,
  "partly-cloudy-day": iconPartlyCloudyDay,
  "partly-cloudy-night": iconPartlyCloudyNight,
  "clear-day": iconClearDay,
  "clear-night": iconClearNight,

  snow: iconSnow,
  rain: iconRain,
  fog: iconFog,
  wind: iconWind,
  cloudy: iconCloudy,
};

export default function getWeatherIcon(weatherIcon) {
  return weatherIconMap[weatherIcon];
}
