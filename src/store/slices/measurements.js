import { createSlice } from "@reduxjs/toolkit";
import { measurementsApi } from "../../services/measurements";

const initialState = {
  measurements: {},
};

const measurementsSlice = createSlice({
  name: "measurements",
  initialState,
  reducers: {
    updateDeviceMeasurements: (state, action) => {
      const data = action?.payload;
      const main = {};
      data.forEach((item) => {
        const key = Object.keys(item).find((k) => k !== "command");
        main[key] = item[key];
      });
      state.measurements = main;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      measurementsApi.endpoints.getMeasurements.matchFulfilled,
      (state, { payload }) => {
        const items = payload?.data?.data;
        const main = {};
        items.forEach((item) => {
          const key = Object.keys(item).find((k) => k !== "command");
          main[key] = item[key];
        });
        console.log(main);
        state.measurements = main;
      }
    );
  },
});

export const { updateDeviceMeasurements } = measurementsSlice.actions;
export default measurementsSlice.reducer;
