import moment from "moment";
import { TemperatureUnit, WeatherListItem } from "../types";

export const formatTemperature = (
  fehernhiteTemp: number,
  unit: TemperatureUnit
) => {
  const celsius = fehernhiteTemp - 273.15;
  if (unit === "celsius") {
    return celsius;
  }
  return celsius * (9 / 5) + 32;
};

export const displayUnit = (unit: TemperatureUnit) => {
  if (unit === "celsius") {
    return "°C";
  } else {
    return "°F";
  }
};

export const groupByDay = (list: WeatherListItem[] = []) => {
  let groups: any = {};
  list.forEach((listItem) => {
    const day = moment(listItem.dt_txt).format("L");
    if (!groups[day]) {
      groups[day] = { ...listItem, hours: [] };
    } else {
      groups[day] = { ...listItem, hours: [...groups[day].hours, listItem] };
    }
  });

  return Object.values(groups);
};

type ListItemWithHours = WeatherListItem & { hours: WeatherListItem[] };

export const getAverageTemperature = (
  day: ListItemWithHours,
  unit: TemperatureUnit
): string => {
  const hours = day.hours;
  if (hours.length === 0)
    return formatTemperature(day.main.temp, unit).toFixed(2);

  const sum = hours.reduce((acc: number, hour) => {
    acc = acc + hour.main.temp;
    return acc;
  }, 0);
  const averageTemperature = sum / hours.length;
  return formatTemperature(averageTemperature, unit).toFixed(2);
};
