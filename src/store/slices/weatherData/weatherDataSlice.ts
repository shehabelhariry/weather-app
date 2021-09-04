import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWeatherData } from "../../../api";
import { WeatherListItem } from "../../../types";

export interface WeatherDataSliceType {
  data: (WeatherListItem & { hours: WeatherListItem })[];
  loading: boolean;
  selectedDayData: null | WeatherListItem[];
  error: string | null;
}

const initialState: WeatherDataSliceType = {
  data: [],
  loading: false,
  selectedDayData: null,
  error: null,
};

export const fetchWeatherInfo = createAsyncThunk(
  "weather/fetchAll",
  async () => {
    try {
      const response = await getWeatherData();
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
);

export const weatherDataSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    setWeatherData: (state, action) => {
      state.data = action.payload;
    },
    selectDay: (state, action) => {
      state.selectedDayData = action.payload;
    },
    setError: (state, action) => {
      console.log(state, action);
      state.error = action.payload;
    },
  },
});

export const { startLoading, endLoading, setWeatherData, selectDay, setError } =
  weatherDataSlice.actions;

export default weatherDataSlice.reducer;
