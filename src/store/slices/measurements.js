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
      state.measurements = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      measurementsApi.endpoints.getMeasurements.matchFulfilled,
      (state, { payload }) => {
        state.measurements = payload;
      }
    );
  },
});

export const { updateDeviceMeasurements } = measurementsSlice.actions;
export default measurementsSlice.reducer;
