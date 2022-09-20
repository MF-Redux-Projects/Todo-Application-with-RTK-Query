import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "all",
  colors: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterStatus: (state, action) => {
      state.status = action.payload;
    },
    filterByColor: (state, action) => {
      if (state.colors.includes(action.payload)) {
        state.colors = state.colors.filter((color) => color !== action.payload);
      } else {
        state.colors.push(action.payload);
      }
    },
  },
});

export const { filterStatus, filterByColor } = filterSlice.actions;
