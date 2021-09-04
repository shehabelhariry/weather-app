import { ChangeEventHandler } from "react";
import { TemperatureUnit } from "../../types";

type TemperatureUnitsControlProps = {
  temperatureUnit: TemperatureUnit;
  updateTemperatureUnit: ChangeEventHandler<HTMLInputElement>;
};
const TemperatureUnitsControl = ({
  temperatureUnit,
  updateTemperatureUnit,
}: TemperatureUnitsControlProps) => {
  const isCelsius = temperatureUnit === "celsius";
  const isFehernhite = temperatureUnit === "fehrenhite";
  return (
    <div className="flex justify-center items-center my-5">
      <div>
        <input
          type="radio"
          value="celsius"
          id="celsius"
          className="appearance-none"
          checked={temperatureUnit === "celsius"}
          onChange={updateTemperatureUnit}
        />
        <label
          className={`rounded-l-md py-2 px-4 text-white  ${
            isCelsius ? "bg-blue-500" : "bg-gray-400"
          }`}
          htmlFor="celsius"
        >
          Celsius
        </label>
      </div>
      <div>
        <input
          type="radio"
          value="fehrenhite"
          id="fehrenhite"
          className="appearance-none"
          checked={temperatureUnit === "fehrenhite"}
          onChange={updateTemperatureUnit}
        />
        <label
          className={`rounded-r-md py-2 px-4 text-white  ${
            isFehernhite ? "bg-blue-500" : "bg-gray-400"
          }`}
          htmlFor="fehrenhite"
        >
          Fahrenheit
        </label>
      </div>
    </div>
  );
};

export default TemperatureUnitsControl;
