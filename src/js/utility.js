export function formatHourLabel(datetime) {
  const hour = parseInt(datetime.split(":")[0]);
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour >= 12 ? "PM" : "AM";
  return `${hour12} ${period}`;
}
