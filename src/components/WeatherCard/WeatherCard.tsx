import moment from "moment";
import { useDispatch } from "react-redux";
import { TemperatureUnit, WeatherListItem } from "../../types/index";
import { displayUnit } from "../../utils";

import { selectDay } from "../../store/slices/weatherData/weatherDataSlice";

const WeatherCard = (props: {
  temperatureUnit: TemperatureUnit;
  temperature: string;
  date: string;
  hours: WeatherListItem[];
}) => {
  const { temperature, temperatureUnit, date, hours } = props;
  const dispatch = useDispatch();

  return (
    <div className="rounded-md p-5 flex flex-col items-center shadow-md  text-white bg-gradient-to-r	from-blue-900 to-blue-800 m-2">
      <p className="text-sm mb-3">{moment(date).format("LL")}</p>
      <div className="flex items-start">
        <span className="text-4xl">{temperature}</span>
        <span className="text-sm">{displayUnit(temperatureUnit)}</span>
      </div>
      {hours.length > 0 ? (
        <span
          className="underline"
          onClick={() => {
            dispatch(selectDay(hours));
          }}
        >
          Hours breakdown
        </span>
      ) : null}
    </div>
  );
};

export default WeatherCard;
