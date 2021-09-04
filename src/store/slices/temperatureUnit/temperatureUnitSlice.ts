import { createSlice } from "@reduxjs/toolkit";
import { TemperatureUnit } from "../../../types/index";

export interface temperatureUnit {
  unit: TemperatureUnit;
}

const initialState: temperatureUnit = {
  unit: "celsius",
};

export const temperatureUnitSlice = createSlice({
  name: "temperature",
  initialState,
  reducers: {
    setUnitToCelsius: (state) => {
      state.unit = "celsius";
    },
    setUnitToFahernhite: (state) => {
      state.unit = "fehrenhite";
    },
  },
});

export const { setUnitToCelsius, setUnitToFahernhite } =
  temperatureUnitSlice.actions;

export default temperatureUnitSlice.reducer;
