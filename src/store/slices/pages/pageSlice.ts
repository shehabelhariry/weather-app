import { createSlice } from "@reduxjs/toolkit";

export interface pageState {
  pageSize: number;
  page: number;
}

const initialState: pageState = {
  pageSize: 0,
  page: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    increment: (state) => {
      state.page++;
    },
    decrement: (state) => {
      state.page--;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const { increment, decrement, setPageSize } = pageSlice.actions;

export default pageSlice.reducer;
