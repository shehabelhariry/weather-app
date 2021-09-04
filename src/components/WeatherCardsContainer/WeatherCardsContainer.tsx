import moment from "moment";
import { MouseEventHandler } from "react";
import { TemperatureUnit, WeatherListItem } from "../../types";
import { getAverageTemperature } from "../../utils";
import Button from "../Button/Button";
import WeatherCard from "../WeatherCard/WeatherCard";

type WeatherCardsContainerProps = {
  weatherData: any;
  temperatureUnit: TemperatureUnit;
  page: number;
  nextPage: MouseEventHandler<HTMLButtonElement>;
  prevPage: MouseEventHandler<HTMLButtonElement>;
  pageSize: number;
};
const WeatherCardsContainer = ({
  weatherData,
  temperatureUnit,
  page,
  nextPage,
  prevPage,
  pageSize,
}: WeatherCardsContainerProps) => {
  const weatherDataSlice =
    weatherData.slice((page - 1) * pageSize, pageSize * page) || [];
  return (
    <div>
      <div className="flex justify-center	w-full my-5">
        {weatherDataSlice.map(
          (listItem: WeatherListItem & { hours: WeatherListItem[] }) => {
            const averageTemperature = getAverageTemperature(
              listItem,
              temperatureUnit
            );
            return (
              <WeatherCard
                key={listItem.dt}
                temperature={averageTemperature}
                temperatureUnit={temperatureUnit}
                hours={listItem.hours}
                date={moment(listItem.dt_txt).format("L")}
              />
            );
          }
        )}
      </div>
      {weatherData.length > 0 ? (
        <div className="flex justify-center items-center">
          <Button onClick={prevPage} disabled={page === 1}>
            Prev
          </Button>
          <span className="mx-3">
            {page} / {Math.floor(weatherData.length / pageSize)}
          </span>
          <Button
            disabled={page === Math.floor(weatherData.length / pageSize)}
            onClick={nextPage}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherCardsContainer;
