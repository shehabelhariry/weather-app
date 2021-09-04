import { useCallback, useEffect } from "react";
import { TemperatureUnit } from "../../types";
import { groupByDay } from "../../utils";
import RefreshButton from "../RefreshButton/RefreshButton";
import TemperatureUnitsControl from "../TemperatureUnitsControl/TemperatureUnitsControl";
import WeatherCardsContainer from "../WeatherCardsContainer/WeatherCardsContainer";

import { useWindowSize } from "@react-hook/window-size";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  decrement,
  increment,
  setPageSize,
} from "../../store/slices/pages/pageSlice";

import {
  setUnitToCelsius,
  setUnitToFahernhite,
} from "../../store/slices/temperatureUnit/temperatureUnitSlice";
import {
  fetchWeatherInfo,
  startLoading,
  setWeatherData,
  endLoading,
  setError,
} from "../../store/slices/weatherData/weatherDataSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "../Loading/Loading";
import MyChart from "../Chart/MyChart";

const WeatherInfo = () => {
  const [width] = useWindowSize();
  const { page, pageSize } = useSelector((state: RootState) => state.page);
  const { unit } = useSelector((state: RootState) => state.temperatureUnit);
  const {
    data: weatherData = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.weatherData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (width > 700) {
      dispatch(setPageSize(3));
    } else {
      dispatch(setPageSize(1));
    }
  }, [width, dispatch]);

  const fetchWeatherData = async () => {
    try {
      dispatch(startLoading());
      const data = await dispatch(fetchWeatherInfo());
      //@ts-ignore
      const unwrapedData = await unwrapResult(data);

      const groupedData = groupByDay(unwrapedData?.list ?? []);

      dispatch(setWeatherData(groupedData));

      dispatch(endLoading());
    } catch (e) {
      dispatch(endLoading());
      dispatch(setError(e.message));
    }
  };

  const memoizedFetchData = useCallback(fetchWeatherData, [dispatch]);

  useEffect(() => {
    const fd = async () => {
      await memoizedFetchData();
    };
    fd();
  }, [dispatch, memoizedFetchData]);

  return (
    <div className="flex flex-col justify-center items-center p-2">
      <h3>Weather App</h3>
      {loading && !error ? <Loading /> : null}
      {!loading && !error ? (
        <div className="flex flex-col items-center">
          <TemperatureUnitsControl
            temperatureUnit={unit}
            updateTemperatureUnit={(e) => {
              const temp = e.target.value as TemperatureUnit;
              if (temp === "celsius") {
                dispatch(setUnitToCelsius());
              } else {
                dispatch(setUnitToFahernhite());
              }
            }}
          />
          <WeatherCardsContainer
            temperatureUnit={unit}
            weatherData={weatherData}
            page={page}
            pageSize={pageSize}
            nextPage={() => dispatch(increment())}
            prevPage={() => dispatch(decrement())}
          />
          <MyChart />
        </div>
      ) : null}
      {!loading ? (
        <RefreshButton
          refreshWeatherData={() => {
            dispatch(setError(null));
            fetchWeatherData();
          }}
        />
      ) : null}
      {error ? (
        <p className="text-red-500 text-lg  text-center">{error}</p>
      ) : null}
    </div>
  );
};

export default WeatherInfo;
