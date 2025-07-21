import iconSnow from "../css/images/snow.svg";
import iconRain from "../css/images/rain.svg";
import iconFog from "../css/images/fog.svg";
import iconWind from "../css/images/wind.svg";
import iconCloudy from "../css/images/cloudy.svg";
import iconPartlyCloudyDay from "../css/images/partly-cloudy-day.svg";
import iconPartlyCloudyNight from "../css/images/partly-cloudy-night.svg";
import iconClearDay from "../css/images/clear-day.svg";
import iconClearNight from "../css/images/clear-night.svg";

const weatherIconMap = {
  "partly-cloudy-day": iconPartlyCloudyDay,
  "partly-cloudy-night": iconPartlyCloudyNight,
  "clear-day": iconClearDay,
  "clear-night": iconClearNight,

  cloudy: iconCloudy,
  fog: iconFog,
  rain: iconRain,
  snow: iconSnow,
  wind: iconWind,
};

export default function getWeatherIcon(weatherIcon) {
  return weatherIconMap[weatherIcon];
}
