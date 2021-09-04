import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./slices/pages/pageSlice";
import temperatureUnitReducer from "./slices/temperatureUnit/temperatureUnitSlice";
import weatherDataReducer from "./slices/weatherData/weatherDataSlice";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    temperatureUnit: temperatureUnitReducer,
    weatherData: weatherDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
